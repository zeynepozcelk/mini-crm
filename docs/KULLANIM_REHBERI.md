# 📖 Mini CRM Kullanım ve İşletim Rehberi

Bu rehber, CRM sisteminin kurulumundan günlük operasyonel işlemlerine (Müşteri, Ürün, Sipariş yönetimi) kadar tüm süreçleri kapsayan kapsamlı bir kullanım kılavuzudur.

---

## 🛠️ 1. Sistemin Yayına Alınması

### Ön Hazırlık
Uygulamanın çalışması için bilgisayarınızda **Node.js** ve **PostgreSQL** servislerinin kurulu ve aktif olması gerekmektedir.

### Kurulum Adımları
1. **Bağımlılık Yönetimi:** Terminal üzerinden proje dizinine giderek gerekli paketleri yükleyin:
   ```powershell
   npm install

2. **Altyapı Servisleri:** Veritabanı servislerini Docker üzerinden hızlıca ayağa kaldırmak için:
docker-compose up -d

3. **Servis Başlatma: Uygulama sunucusunu aktif hale getirin:**
npm start

Sistem varsayılan olarak http://localhost:3000 portu üzerinden hizmet vermeye başlayacaktır.

👥 2. Müşteri İlişkileri Yönetimi
Sistemde müşteri kayıtları üzerinde tam denetim (CRUD) sağlayabilirsiniz.

Yeni Kayıt Oluşturma
Sisteme manuel bir müşteri girişi yapmak için aşağıdaki API çağrısını kullanabilirsiniz:

# Örnek Müşteri Kaydı
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/customers" `
  -ContentType "application/json" `
  -Body '{"firstName": "Zeynep", "lastName": "Özçelik", "email": "zeynep@example.com"}'

  Bilgi Güncelleme ve Sorgulama
Listeleme: Kayıtlı tüm portföyü görmek için GET /api/customers ucunu kullanın.

Detay Görünümü: Belirli bir müşteriye odaklanmak için ID bazlı sorgu yapın: /api/customers/{id}.

Düzenleme: Mevcut verileri (Örn: Telefon güncelleme) PUT metodu ile güncelleyebilirsiniz.

📦 3. Envanter ve Katalog Yönetimi
Ürünlerin fiyat ve stok durumlarını merkezi olarak yönetebilirsiniz.

Ürün Tanımlama

# Yeni Ürün Girişi
POST http://localhost:3000/api/products
{
  "name": "Kablosuz Mouse",
  "price": 450.00,
  "stock": 50,
  "isStockTracking": true
}

Not: Stok takibi pasif (false) olan ürünler, miktar kontrolü yapılmaksızın satışa sunulabilir.

🛒 4. Satış ve Sipariş Süreçleri
Siparişler iki farklı yöntemle sisteme dahil edilebilir:

A. Kayıtlı Müşteri Siparişi
Sistemde mevcut olan bir customerId ile ürünleri eşleştirerek sipariş oluşturulur.

B. Hızlı (Misafir) Siparişi
Müşteri kaydı olmayan kullanıcılar için guestFirstName, guestEmail gibi alanlar kullanılarak anlık satış yapılabilir.

📂 5. Toplu Veri Aktarımı (ETL)
Firma tarafından sağlanan harici müşteri listelerini (CSV formatında) sisteme toplu olarak aktarmak için geliştirilen CLI aracını kullanın:

Komut Yapısı:

node src/etl/cli.js <dosya_yolu.csv> <rapor_cikti.json>

İşlem Sonrası Raporlama: Aktarım tamamlandığında sistem size kaç kaydın başarıyla yüklendiğini, kaç kaydın hatalı (Eksik veri vb.) olduğunu raporlar.

❓ Sıkça Sorulan Sorular (SSS)
S: Stok yetersiz olduğunda sipariş onaylanır mı? C: Hayır, sistem otomatik olarak stok kontrolü yapar ve yetersiz bakiye durumunda işlemi reddederek hata mesajı döner.

S: Aynı e-posta ile ikinci bir kayıt açılabilir mi? C: Hayır, sistem "Conflict (409)" hatası vererek mevcut kullanıcı bilgisini raporlar.

S: Hatalı bir siparişi iptal edebilir miyim? C: Evet, sipariş durumunu (status) cancelled olarak güncelleyerek işlemi durdurabilirsiniz.

🆘 Teknik Destek ve İzleme
Uygulama ile ilgili operasyonel bir sorun yaşanması durumunda:

1. logs/error.log dosyasındaki hata kodlarını inceleyin.

2. Veritabanı bağlantısının (PostgreSQL) aktifliğini kontrol edin.

3. Detaylı teknik altyapı için TEKNIK_MIMARI.md dosyasını inceleyin.



