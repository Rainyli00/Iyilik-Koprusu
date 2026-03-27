# İyilik Köprüsü

<div align="center">
  <h1>🌟 İyilik Köprüsü </h1>
  <p><b>Kullanıcılar ile ihtiyaç sahipleri arasında köprü kuran şeffaf ve güvenilir bağış platformu.</b></p>

  [![ASP.NET MVC](https://img.shields.io/badge/ASP.NET_MVC-.NET_Framework_4.8.1-blue.svg)](https://dotnet.microsoft.com/)
  [![Entity Framework](https://img.shields.io/badge/Entity_Framework-Database_First-orange.svg)](https://learn.microsoft.com/en-us/ef/)
</div>

---

## 📖 Proje Hakkında
**İyilik Köprüsü**, hayırsever kullanıcıların çeşitli yardım kategorilerine (sağlık, eğitim, gıda vb.) kolayca bağış yapabilmesini sağlayan; aynı zamanda dernek/vakıf yöneticilerinin tüm süreçleri anlık olarak takip edebildiği kapsamlı bir bağış yönetim sistemidir. 

**ASP.NET MVC** mimarisi kullanılarak geliştirilmiş olup, veritabanı işlemlerinde **Entity Framework - Database First (EDMX)** yaklaşımı tercih edilmiştir. Gelişmiş bir Admin paneli ile gelir-gider takibi, şeffaf kasa yönetimi ve kullanıcı istatistikleri sunar.

---

## Özellikler

### Kullanıcı Tarafı
- Üyelik ve oturum (`Session`) yönetimi
- Kategoriye göre proje filtreleyerek bağış yapma
- Misafir bağış akışı (oturum yoksa misafir kullanıcı)
- Hesap özeti ve son bağışlar
- Bağış geçmişi görüntüleme
- Projelere yorum gönderme
- Geri bildirim gönderme

### Yönetici Paneli
- Dashboard: toplam kullanıcı, toplam bağış, kasa (gelir-gider)
- Kategori bazlı bağış grafiği
- Kullanıcı/proje/yönetici CRUD işlemleri
- Log kayıtlarını filtreleyerek görüntüleme
- Bağış listesi görüntüleme
- Gider ekleme
- Geri bildirim ve proje yorumları listeleme
- SQL Agent job tetikleyerek yedek başlatma Veritabanı yedekleme sürecini tetikleme.

---

## 🛠️ Kullanılan Teknolojiler

**Backend (Sunucu Tarafı)**
* **Dil:** C#
* **Framework:** ASP.NET MVC (.NET Framework 4.8.1)
* **ORM:** Entity Framework 6 (Database First - EDMX / `BagisDB`)
* **Veritabanı:** Microsoft SQL Server (T-SQL)

**Frontend (İstemci Tarafı)**
* **Diller:** HTML5, CSS3, JavaScript
* **View Engine:** Razor (`.cshtml`)
* **Kütüphaneler:** jQuery, Bootstrap, Chart.js

---

## Mimari ve Klasör Yapısı

- `Controllers/`
  - `HomeController`: Anasayfa
  - `LoginController`: Kullanıcı giriş/kayıt/çıkış
  - `DonateController`: Bağış süreci (kategori/proje seçimi + ödeme)
  - `AccountController`: Hesap özeti, bağış geçmişi, yorum, geri bildirim, hesap güncelleme
  - `AdminLoginController`: Yönetici giriş/çıkış
  - `AdminHomeController`: Yönetici paneli servisleri
- `Models/`
  - `BagisDB.edmx`, `BagisDB.Context.cs`: EF Database-First model
  - Temel varlıklar: `Kullanicilar`, `Bagis`, `Proje`, `Gelir`, `Gider`, `Loglar`, `Yonetici`
- `Views/`
  - Kullanıcı ekranları: `Home`, `Donate`, `Login`, `Account`, `About`
  - Yönetici ekranları: `AdminLogin`, `AdminHome`
- `Scripts/sayfa_scriptler/`
  - `scriptDonate.js`
  - `scriptAdminMainAndKullanici.js`


---

## 🚀 Kurulum ve Çalıştırma

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları sırasıyla uygulayın:

### 1. Gereksinimler
- Visual Studio 2019 veya 2022 (ASP.NET & Web Geliştirme iş yükü kurulu olmalı)
- Microsoft SQL Server Management Studio (SSMS)

### 2. Kurulum Adımları
1. **Projeyi Klonlayın:**
   ```bash
   git clone https://github.com/Rainyli00/Iyilik-Koprusu.git
   ```
2. **Projeyi Açın:** İndirdiğiniz klasördeki `İyilik Köprüsü.sln` çözüm dosyasını Visual Studio ile açın.
3. **Veritabanını Kurun:**
   - Proje Database First olduğu için `Models/BagisDB.edmx` dosyasını temel almaktadır. SQL Server'da `BagisDB` (veya sizin belirlediğiniz bir isimde) veritabanını oluşturun ve tablolarınızı `.edmx` üzerinden generate edin (Update Model from Database).
4. **Bağlantı Dizesini (Connection String) Ayarlayın:**
   - Proje ana dizinindeki `Web.config` dosyasını açın.
   - `<connectionStrings>` etiketi içerisindeki `BagisDBEntities` değerini bularak, kendi SQL Server bilginize (`Data Source=YOUR_SERVER_NAME; Initial Catalog=YOUR_DB_NAME; Integrated Security=True;`) göre güncelleyin.
5. **Derleme ve Çalıştırma:**
   - Visual Studio üzerinde **F5** tuşuna basarak projeyi derleyip (Build) başlatın.

---

## Rota ve Başlangıç

- Varsayılan rota: `/{controller}/{action}/{id}`
- Açılış sayfası: `Home/Index`
- Kullanıcı giriş: `Login/Index`
- Yönetici giriş: `AdminLogin/Index`

---

## 🤝 Katkıda Bulunma

Bu proje açık kaynaklıdır ve her türlü katkıya (Pull Request, özellik önerisi, hata bildirimi) açıktır. Katkıda bulunmak isterseniz:

1. Bu depoyu Fork'layın (`Fork`).
2. Özelliğiniz için yeni bir dal oluşturun (`git checkout -b feature/YeniOzellik`).
3. Değişikliklerinizi commit edin (`git commit -m 'Harika bir özellik eklendi'`).
4. Dalınızı gönderin (`git push origin feature/YeniOzellik`).
5. Bir **Pull Request (PR)** açın.

---

## 📜 Lisans

Bu proje portfolyo amaçlı geliştirilmiş olup eğitim/gösterim hedeflenerek tasarlanmıştır. Proje ile ilgili her türlü geri bildiriminiz için repoya issue açabilirsiniz!

