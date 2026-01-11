# 🧪 Test Stratejisi ve Kalite Güvence Raporu

Bu doküman, Mini CRM projesinin kararlılığını ölçmek için uygulanan test metodolojilerini, kapsam oranlarını ve test sonuçlarını içermektedir. Projede **TDD (Test-Driven Development)** prensipleri benimsenmiş; Jest ve Supertest kütüphaneleri kullanılmıştır.

---

## 1. Test Ortamı ve Yapılandırma

Sistem, gerçek veritabanına zarar vermemek adına izole bir test ortamında (`NODE_ENV=test`) koşturulmaktadır.

* **Test Veritabanı:** `mini_crm_test` (Her test öncesi temizlenir).
* **Kapsam:** Unit Tests (Birim), Integration Tests (Entegrasyon) ve End-to-End (Uçtan Uca).

---

## 2. Test Sonuçları Özeti

Yapılan testler sonucunda tüm ana modüller (Müşteri, Ürün, Sipariş, ETL) başarıyla doğrulanmıştır.

**[GÖRSEL BURAYA: Terminalde 'npm test' çalıştırdığında çıkan yeşil tablolu ekran görüntüsünü koy]**
*Görsel 1: Tüm test senaryolarının başarıyla (PASS) tamamlandığını gösteren konsol çıktısı.*

---

## 3. Modüler Test Detayları

### A. API Entegrasyon Testleri (Integration)
Express.js uç noktaları (Endpoints) üzerinde yapılan testlerde aşağıdaki senaryolar doğrulanmıştır:
* **Müşteri Modülü:** Yeni kayıt oluşturma, mükerrer e-posta kontrolü ve veri normalizasyonu.
* **Ürün Modülü:** Fiyat güncellemeleri ve stok seviyesi değişimleri.
* **Sipariş Modülü:** Stok kontrolü yapılması ve yetersiz stok durumunda siparişin reddedilmesi.

**[GÖRSEL BURAYA: 'npm run test:coverage' komutu sonrası çıkan, kodun yüzde kaçının test edildiğini gösteren tabloyu koy]**
*Görsel 2: Kod kapsama (Code Coverage) raporu.*

### B. ETL ve Veri Temizleme Testleri (Unit)
Dışarıdan alınan CSV verilerinin sisteme uygun hale getirilmesi için yazılan temizleme (cleaner) fonksiyonları test edilmiştir:
* Telefon numaralarındaki geçersiz karakterlerin ayıklanması.
* Boş bırakılan zorunlu alanların tespiti ve loglanması.

---

## 4. Hata Yönetimi ve Debugging

Testler sırasında karşılaşılan hataların takibi için `winston-logger` entegrasyonu test edilmiş; hataların `logs/test_error.log` dosyasına doğru TraceID ile düştüğü onaylanmıştır.

---

## 5. Testleri Manuel Çalıştırma

Projeyi değerlendiren eğitmen, aşağıdaki komutlarla testleri kendi ortamında tekrarlayabilir:

```bash
# Tüm testleri koşturur
npm test

# Detaylı kapsama raporu üretir
npm run test:coverage

# Sadece belirli bir dosyayı test eder (Örn: Siparişler)
npm test orders.test.js