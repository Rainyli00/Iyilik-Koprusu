<div align="center">
  <h1>🌟 İyilik Köprüsü</h1>
  <p><b>Kullanıcılar ile ihtiyaç sahipleri arasında köprü kuran şeffaf ve güvenilir bağış platformu.</b></p>

  [![ASP.NET MVC](https://img.shields.io/badge/ASP.NET_MVC-.NET_Framework_4.8.1-blue.svg?logo=dotnet)](https://dotnet.microsoft.com/)
  [![Entity Framework](https://img.shields.io/badge/Entity_Framework-Database_First-orange.svg?logo=nuget)](https://learn.microsoft.com/en-us/ef/)
</div>

<br/>

## 📖 Proje Hakkında

**İyilik Köprüsü**, hayırsever kullanıcıların çeşitli yardım kategorilerine (sağlık, eğitim, gıda vb.) kolayca bağış yapabilmesini sağlayan ve aynı zamanda dernek/vakıf yöneticilerinin tüm süreçleri anlık olarak takip edebildiği kapsamlı bir bağış yönetim sistemidir. 

**ASP.NET MVC** mimarisi kullanılarak geliştirilen bu projede, veritabanı işlemleri için **Entity Framework - Database First (EDMX)** yaklaşımı tercih edilmiştir. Gelişmiş yönetici paneli sayesinde gelir-gider takibi, şeffaf kasa yönetimi ve detaylı kullanıcı istatistikleri sunulmaktadır.

---

## ✨ Öne Çıkan Özellikler

### 👤 Kullanıcı Paneli
- **🔐 Üyelik ve Güvenlik:** Güvenli oturum (`Session`) yönetimi.
- **🎯 Kolay Bağış:** Kategoriye göre proje filtreleme ve hızlı bağış adımları.
- **🕵️ Misafir Bağışı:** Oturum açmadan misafir kullanıcı olarak bağış yapabilme esnekliği.
- **📊 Hesap Özeti:** Son bağışları ve tüm bağış geçmişini anlık görüntüleme.
- **💬 Etkileşim:** Projelere yorum yapabilme ve sisteme geri bildirim gönderebilme.

### 🛡️ Yönetici Paneli (Admin)
- **📈 Dashboard:** Toplam kullanıcı, toplam bağış ve kasa (gelir-gider) özetlerini tek ekranda görme.
- **📊 Görsel Raporlama:** Kategori bazlı bağış istatistikleri ve grafikleri.
- **⚙️ Tam Kontrol:** Kullanıcı, proje ve yönetici hesapları için tam CRUD işlemleri.
- **📝 Log ve Takip:** Sistem log kayıtlarını filtreleyerek detaylı inceleme.
- **💸 Finans Yönetimi:** Tüm bağış listesini görüntüleme ve sisteme gider ekleme.
- **🔄 Otomatik Yedekleme:** SQL Agent job tetikleyerek tek tıkla veritabanı yedeği başlatma.
- **🗣️ Geri Bildirim Yönetimi:** Kullanıcı yorumlarını ve sistem geri bildirimlerini denetleme.

---

## 🛠️ Kullanılan Teknolojiler

| Kategori | Teknolojiler |
| :--- | :--- |
| **Backend** | C#, ASP.NET MVC (.NET Framework 4.8.1) |
| **Veritabanı & ORM** | MS SQL Server (T-SQL), Entity Framework 6 (Database First) |
| **Frontend** | HTML5, CSS3, JavaScript, Razor (`.cshtml`) |
| **Kütüphaneler** | jQuery, Bootstrap, Chart.js |

---

## 📂 Mimari ve Klasör Yapısı

```text
📁 Proje Dizini
├── 📁 Controllers/
│   ├── HomeController.cs        # Anasayfa işlemleri
│   ├── LoginController.cs       # Kullanıcı giriş/kayıt/çıkış
│   ├── DonateController.cs      # Bağış akışı ve ödeme
│   ├── AccountController.cs     # Hesap özeti, geçmiş, yorum ve geri bildirim
│   ├── AdminLoginController.cs  # Yönetici giriş/çıkış
│   └── AdminHomeController.cs   # Yönetici paneli servisleri
├── 📁 Models/
│   ├── BagisDB.edmx             # EF Database-First modeli
│   └── (Kullanicilar, Bagis, Proje, Gelir, Gider, Loglar, Yonetici Varlıkları)
├── 📁 Views/
│   ├── 📁 Home, Donate, Login, Account  # Kullanıcı arayüzleri
│   └── 📁 AdminLogin, AdminHome         # Yönetici arayüzleri
└── 📁 Scripts/sayfa_scriptler/
    ├── scriptDonate.js
    └── scriptAdminMainAndKullanici.js
```

---

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

### 📌 Gereksinimler
- **Visual Studio 2019 / 2022** *(ASP.NET ve Web Geliştirme iş yükü kurulu olmalı)*
- **Microsoft SQL Server Management Studio (SSMS)**

### ⚙️ Adımlar

1. **Projeyi Klonlayın:**
   ```bash
   git clone [https://github.com/Rainyli00/Iyilik-Koprusu.git](https://github.com/Rainyli00/Iyilik-Koprusu.git)
   ```
2. **Projeyi Açın:** İndirdiğiniz dizindeki `İyilik Köprüsü.sln` çözüm dosyasını Visual Studio ile açın.
3. **Veritabanını Hazırlayın:**
   Proje Database First yaklaşımını kullanır. SQL Server'da `BagisDB` adında bir veritabanı oluşturun ve `Models/BagisDB.edmx` dosyası üzerinden modelinizi güncelleyin *(Update Model from Database)*.
4. **Bağlantı Dizesini (Connection String) Ayarlayın:**
   Ana dizindeki `Web.config` dosyasını açın. `<connectionStrings>` altındaki `BagisDBEntities` değerini kendi yerel SQL Server bilgilerinize göre düzenleyin:
   ```xml
   Data Source=SUNUCU_ADINIZ; Initial Catalog=BagisDB; Integrated Security=True;
   ```
5. **Derleyin ve Başlatın:**
   Visual Studio'da **F5** tuşuna basarak projeyi derleyin ve tarayıcınızda başlatın.

---

## 🗺️ Rota ve Başlangıç Noktaları

- **Varsayılan Rota:** `/{controller}/{action}/{id}`
- **🏠 Açılış Sayfası:** `Home/Index`
- **👤 Kullanıcı Girişi:** `Login/Index`
- **🔐 Yönetici Girişi:** `AdminLogin/Index`

---

## 🤝 Katkıda Bulunma

Bu proje açık kaynaklıdır ve her türlü katkıya (Pull Request, özellik önerisi, hata bildirimi) açıktır. Katkıda bulunmak isterseniz:

1. Bu depoyu **Fork**'layın.
2. Yeni özelliğiniz için bir dal oluşturun (`git checkout -b feature/YeniOzellik`).
3. Değişikliklerinizi commit edin (`git commit -m 'Harika bir özellik eklendi'`).
4. Dalınızı uzak sunucuya gönderin (`git push origin feature/YeniOzellik`).
5. Bir **Pull Request (PR)** oluşturun.

---

## 📜 Lisans

Bu proje portfolyo amaçlı geliştirilmiş olup eğitim ve gösterim hedeflenerek tasarlanmıştır. Proje ile ilgili her türlü sorunuz veya geri bildiriminiz için repoya issue açabilirsiniz!
