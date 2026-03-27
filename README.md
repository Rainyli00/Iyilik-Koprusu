# İyilik Köprüsü

<div align="center">
  <h1>🌟 İyilik Köprüsü (Bridge of Goodness)</h1>
  <p><b>Kullanıcılar ile ihtiyaç sahipleri arasında köprü kuran şeffaf ve güvenilir bağış platformu.</b></p>

  [![ASP.NET MVC](https://img.shields.io/badge/ASP.NET_MVC-.NET_Framework_4.8.1-blue.svg)](https://dotnet.microsoft.com/)
  [![Entity Framework](https://img.shields.io/badge/Entity_Framework-Database_First-orange.svg)](https://learn.microsoft.com/en-us/ef/)
</div>

---

## 📖 Proje Hakkında
**İyilik Köprüsü**, hayırsever kullanıcıların çeşitli yardım kategorilerine (sağlık, eğitim, gıda vb.) kolayca bağış yapabilmesini sağlayan; aynı zamanda dernek/vakıf yöneticilerinin tüm süreçleri anlık olarak takip edebildiği kapsamlı bir bağış yönetim sistemidir. 

**ASP.NET MVC** mimarisi kullanılarak geliştirilmiş olup, veritabanı işlemlerinde **Entity Framework - Database First (EDMX)** yaklaşımı tercih edilmiştir. Gelişmiş bir Admin paneli ile gelir-gider takibi, şeffaf kasa yönetimi ve kullanıcı istatistikleri sunar.

---

## ✨ Temel Özellikler

### 👤 Kullanıcı Modülü 
- **Güvenli Üyelik Sistemi:** Kullanıcıların sisteme kayıt olması ve kendi hesaplarına giriş yapabilmesi.
- **Kategorize Edilmiş Bağışlar:** Kullanıcıların gıda, eğitim, barınma gibi belirli kampanyalara hedeflenmiş bağış yapabilmesi.
- **Güvenli Ödeme Ekranı:** Kredi kartı arayüzü ile bağış ödemesinin yapılması ve sepet işlemleri (`Donate/Odeme`).
- **Şeffaflık Panosu:** Sistemde son yapılan bağışların (**SonBagisModel**) listelenmesi ve güncel kampanya durumlarının görüntülenmesi.

### 🛡️ Yönetici Modülü 
- **Gelişmiş Dashboard:** Toplam üye sayısı, toplanan toplam bağış miktarı ve anlık **Kasa (Net Bakiye: Gelir - Gider)** istatistiklerinin takibi.
- **Dinamik Grafik ve Raporlamalar:** Chart aracılığıyla gelirlerin kategorilere göre (Eğitim, Sağlık vb.) oransal dağılımının izlenmesi.
- **Gelir ve Gider Yönetimi:** Sisteme giren her bir bağışın ve dernek kasasından yapılan masrafların/yardımların veritabanına işlenmesi.
- **Güvenli Oturum (Session) Yönetimi:** `AdminLoginController` üzerinden yöneticilerin güvenli girişi, Session kontrolü ve yetkilendirme işlemleri.

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
* **Kütüphaneler:** jQuery, Bootstrap, Özelleştirilmiş Scriptler (`scriptAdminMainAndKullanici.js`)

---

## 📂 Proje Mimarisi (MVC)

Proje, katmanların birbirine olan bağımlılığını azaltan ve kodun okunabilirliğini artıran Standart MVC Design Pattern ile tasarlanmıştır:
- **Models:** Veritabanı tablolarının nesne karşılıkları (`BagisDBEntities`, `BagisModel`, `SonBagisModel`).
- **Views:** Kullanıcılara ve yöneticilere sunulan arayüz sayfaları (`Donate/Index.cshtml`, `AdminLogin/Index.cshtml` vb.).
- **Controllers:** İş mantığının yönetildiği sınıflar (`AdminHomeController`, `AdminLoginController`, `DonateController` vb.)
- **Scripts:** Sayfa bazlı özel JavaScript dosyaları.

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

