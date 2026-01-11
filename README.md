# Mini CRM Backend Projesi 🚀

Bu proje, modern yazılım geliştirme prensipleri (CI/CD, Test, Loglama, ETL, Migration) uygulanarak geliştirilmiş bir Müşteri İlişkileri Yönetimi (CRM) backend uygulamasıdır.

## 🛠 Kullanılan Teknolojiler
* **Runtime:** Node.js (v24+)
* **Framework:** Express.js
* **ORM:** Sequelize
* **Database:** PostgreSQL
* **Testing:** Jest & Supertest
* **Logging:** Winston
* **CI/CD:** GitHub Actions

---

## 📋 Ödev Maddeleri Uygulama Raporu

### 1. Proje Başlatma ve Modeller (Sequelize)
Proje Sequelize ORM kullanılarak yapılandırılmıştır. `Customer` ve `Order` modelleri oluşturulmuş, aralarında **1-N (One-to-Many)** ilişki kurulmuştur.

### 2. CRUD Operasyonları ve API Tasarımı
Tüm temel operasyonlar RESTful prensiplerine uygun olarak geliştirilmiştir:
* `GET /api/customers`: Müşteri listeleme.
* `POST /api/customers`: Yeni müşteri ekleme.
* `POST /api/orders`: Sipariş oluşturma.

### 3. Hata Yönetimi (Global Error Handling)
Uygulama genelinde merkezi bir hata yakalama mekanizması kurulmuştur. `middleware/errorMiddleware.js` üzerinden tüm hatalar standart bir formatta kullanıcıya dönülür ve loglanır.

### 4. Kod Standartları ve Kalite (Linting)
Kod kalitesini korumak adına **ESLint** yapılandırması yapılmıştır. Kod yazım standartları her aşamada denetlenmiştir.

### 5. Test Süreci ve CI/CD Pipeline
* **Testler:** `tests/` klasörü altında Unit ve Integration testleri (Jest) bulunmaktadır.
* **GitHub Actions:** Her push ve pull request işleminde testler otomatik olarak çalıştırılmaktadır.
* **Code Review:** Geliştirmeler Pull Request (PR) üzerinden ekip arkadaşı onayı ile `main` branch'ine dahil edilmiştir.

### 6. Loglama Sistemi
**Winston** kütüphanesi kullanılarak profesyonel loglama yapısı kurulmuştur:
* Kritik hatalar ve sistem logları hem konsola hem de `logs/` klasörü altındaki dosyalara kaydedilir.

### 7. Veritabanı Migration Yönetimi
Veritabanı şemasındaki değişiklikler Sequelize-CLI üzerinden yönetilmektedir:
* Bozuk/eski migration dosyaları düzeltilmiştir.
* `20260111181433-add-phone-to-customers.js` dosyası ile veritabanına versiyonlanmış kolon ekleme işlemi (phoneNumber) başarıyla uygulanmıştır.

### 8. Veri Geçişi (ETL Görevi)
Eski verileri sisteme aktarmak için `src/scripts/importCustomers.js` scripti geliştirilmiştir:
* **Extract:** CSV dosyasından veriler okundu.
* **Transform:** Veriler temizlendi (lowercase, trim) ve duplicate (mükerrer) kayıtlar elendi.
* **Report:** Hatalı veya eksik kayıtlar (Email/Ad eksikliği) raporlanarak tablo şeklinde sunuldu.

---

## 🚀 Kurulum ve Çalıştırma

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
