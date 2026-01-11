const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const { Customer } = require('../models'); // Modelleri çekiyoruz

// Veri yolları
const csvFilePath = path.join(__dirname, '../../data/old_customers.csv');

const results = [];
const errors = [];
const seenEmails = new Set();

async function runETL() {
    console.log('🚀 ETL Süreci Başladı...');

    // Dosya var mı kontrolü
    if (!fs.existsSync(csvFilePath)) {
        console.error('❌ HATA: data/old_customers.csv dosyası bulunamadı!');
        return;
    }

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            // 1. Tespit: Bozuk/Eksik Veri
            if (!row.email || !row.firstName) {
                errors.push({ data: JSON.stringify(row), reason: 'Eksik Ad veya Email' });
                return;
            }

            // 2. Dönüştürme/Temizleme
            const cleanEmail = row.email.toLowerCase().trim();
            const cleanFirstName = row.firstName.trim();

            // 3. Duplicate (Mükerrer) Kontrolü
            if (seenEmails.has(cleanEmail)) {
                errors.push({ data: cleanEmail, reason: 'Duplicate (Mükerrer) Kayıt' });
                return;
            }

            seenEmails.add(cleanEmail);
            results.push({
                firstName: cleanFirstName,
                lastName: row.lastName ? row.lastName.trim() : '',
                email: cleanEmail
            });
        })
        .on('end', async () => {
            console.log(`✅ CSV Okuma Bitti. ${results.length} kayıt temizlendi.`);

            // 4. Veritabanına Yükleme (Load)
            for (const item of results) {
                try {
                    // Veritabanında da email kontrolü yaparak duplicate önleme
                    await Customer.findOrCreate({
                        where: { email: item.email },
                        defaults: item
                    });
                } catch (dbErr) {
                    errors.push({ data: item.email, reason: `DB Hatası: ${dbErr.message}` });
                }
            }

            // 5. Raporlama
            console.log('\n--- 📊 ETL SONUÇ RAPORU ---');
            console.log(`Başarılı Kayıt: ${results.length}`);
            console.log(`Hatalı/Atlanan: ${errors.length}`);
            
            if (errors.length > 0) {
                console.log('\n--- ❌ HATALI KAYIT DETAYLARI ---');
                console.table(errors);
            }
            
            console.log('\n✅ ETL İşlemi Tamamlandı.');
            process.exit(0);
        });
}

runETL();