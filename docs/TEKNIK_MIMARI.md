# 🏗 Proje Mimarisi ve Teknik Analiz (System Architecture)

Bu bölüm, Mini CRM sisteminin tasarım kararlarını, veri akış şemalarını ve katmanlı yapısını detaylandırmaktadır. Proje, ölçeklenebilir ve sürdürülebilir bir Back-End altyapısı sağlamak amacıyla modüler bir yapıda inşa edilmiştir.

## 1. Sistem Tasarım Şeması (Workflow)

İsteklerin (Request) sistem içerisindeki yolculuğu aşağıda görselleştirilmiştir:

```text
[İstemci (Client)]
      │
      ▼
[Express Sunucusu] ──────────┐
      │                      │
      ▼                [Logger (Winston)]
[Middleware Katmanı] <───────┘ (İşlem Takibi ve Hata Yönetimi)
      │
      ▼
[API Yönlendirici (Routes)]
      │
      ▼
[İş Mantığı (Services)] <─────┐
      │                       │
      ▼                [Validasyon ve Temizleme]
[ORM Katmanı (Sequelize)]
      │
      ▼
[Veritabanı (PostgreSQL)]

2. Modüler Katman Yapısı
Proje, sorumlulukların ayrılması (Separation of Concerns) prensibine göre şu klasör yapısında organize edilmiştir:

Veri Giriş Noktaları (src/routes/): Gelen HTTP protokollerini karşılar. JSDoc ile entegre edilen bu katman, API uç noktalarının dokümantasyonunu sağlar.

İş Kuralları (src/services/): Veritabanı işlemlerinden önce verinin doğruluğunu, benzersizliğini (Duplicate Check) ve iş kurallarına uygunluğunu denetleyen "Business Logic" katmanıdır.

Veri Tanımları (src/models/): PostgreSQL tablolarını temsil eden Sequelize şemalarıdır. Müşteri (Customer) ve Sipariş (Order) arasındaki ilişkisel bağlar burada tanımlanır.

3. Veri Sözlüğü (Data Dictionary)

👤 Müşteri (Customer) Nesnesi

Özellik	Veri Tipi	Zorunlu mu?	Notlar
id	Sayısal	Evet	Otomatik artan anahtar.
firstName	Metin	Evet	Kayıt için temel alan.
email	Metin	Hayır	Benzersiz olması önerilir.
phoneNumber	Metin	Hayır	ETL sırasında standardize edilir.


📦 Sipariş (Order) Nesnesi
Durum Yönetimi: Siparişler pending, processing, shipped ve completed aşamalarından geçer.

İlişkisel Bağ: Her sipariş bir customerId üzerinden bir müşteriye bağlanır.

4. Veri Dönüştürme ve Aktarım (ETL) Süreci
Dış kaynaklı verilerin (Excel/CSV) sisteme güvenli aktarımı için geliştirilen script şu aşamalardan geçer:

Analiz: Sütun başlıklarındaki farklılıklar (Ad/FirstName) normalize edilir.

Arındırma: Telefon numaralarındaki semboller temizlenir, e-postalar küçük harfe dönüştürülür.

Hata Raporlama: Geçersiz kayıtlar (Örn: İsimsiz kayıtlar) sisteme alınmaz ve işlem sonunda bir tablo halinde raporlanır.

5. Güvenlik ve İzlenebilirlik (Monitoring)
Request Tracking: Her işleme özel bir ID atanarak (TraceID), karmaşık hata durumlarında hata kaynağı loglar üzerinden takip edilebilir.

Global Error Handler: Uygulamanın herhangi bir noktasında oluşabilecek hatalar merkezi bir yapı tarafından yakalanır ve kullanıcıya anlamlı hata mesajları döner.

CI/CD Entegrasyonu: Kod her güncellendiğinde GitHub Actions üzerinde testler koşturularak sistem bütünlüğü korunur.

🎨 Görsel Diyagramlar
Projenin kapsamlı tasarımı için hazırladığım şemaları aşağıdan inceleyebilirsiniz:

Nesne İlişkileri: Sınıf Diyagramı İçin Tıklayın

Kullanım Senaryoları: Use Case Diyagramı İçin Tıklayın