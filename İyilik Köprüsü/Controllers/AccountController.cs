using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using İyilik_Köprüsü.Models;    

namespace İyilik_Köprüsü.Controllers
{
    public class AccountController : Controller
    {

         BagisDBEntities db = new BagisDBEntities();
        // GET: Account   

        // **********************************GENEL KISMI*************************************
        public ActionResult Index()
        {
            int userId = (int)(Session["UserID"]);

            // Kullanıcı toplam bağış tutarı
            var toplamBagisTutari = db.Bagis
                .Where(b => b.kullanici_id == userId)
                .Sum(b => (decimal?)b.bagis_miktari) ?? 0;

            var rozet = db.Kullanicilar
                .Where(r => r.kullanici_id == userId)
                .Select(r => r.Rozetler.rozet_ad)
                .FirstOrDefault();
          

            // Son 5 bağış
            var sonBagislar = db.Bagis
                .Where(b => b.kullanici_id == userId)
                .OrderByDescending(b => b.bagis_tarihi)
                .Take(5)
                .Select(b => new SonBagisModel // tablodan çekilen verileri modelde topluyoruz;
                {
                    ProjeAd = b.Proje.proje_ad,  // Proje tablosundan proje_ad alınıyor
                    BagisTarihi = b.bagis_tarihi,
                    BagisMiktari = b.bagis_miktari
                }).ToList();



            // modelimizi viewbag ile viewa gönderiyoruz
            ViewBag.SonBagislar = sonBagislar;
            ViewBag.ToplamBagisTutari = toplamBagisTutari;
            ViewBag.Rozet = rozet;

            return View();
        }
        // **********************************BAĞIŞLARIM KISMI*************************************
        public ActionResult Bagislarim(int page = 1)
        {
            int userId = (int)Session["UserID"];
            int pageSize = 10;
            //kaç adet kaydın atlanacağını (skip) hesaplar. Örneğin, ikinci sayfaya geçmek için ilk sayfadaki kayıtlar atlanmalıdır.
            int skip = (page - 1) * pageSize;

            var bagislar = db.Bagis
                .Where(b => b.kullanici_id == userId)
                .Join(db.Proje,
                    b => b.proje_id,
                    p => p.proje_id,
                    (b, p) => new
                    {
                        b.bagis_tarihi,
                        b.bagis_miktari,
                        p.proje_ad,
                        proje_id = p.proje_id // Proje ID doğru alınıyor
                    })
                .OrderByDescending(b => b.bagis_tarihi)
                .Skip(skip)
                .Take(pageSize)
                .ToList();


            var toplamsayfa = db.Bagis.Count(b => b.kullanici_id == userId);

            return Json(new
            {
                bagislar = bagislar.Select(b => new
                {
                    proje_ad = b.proje_ad,
                    bagis_miktari = b.bagis_miktari,
                    bagis_tarihi = b.bagis_tarihi.ToString("yyyy-MM-dd HH:mm:ss"),
                    proje_id = b.proje_id // Bu değer kontrol edilmeli
                }),
                totalPages = (int)Math.Ceiling((double)toplamsayfa / pageSize)
            }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult YorumYap(int projeId, string yorumMetni)
        {
            if (string.IsNullOrWhiteSpace(yorumMetni))
            {
                return Json(new { success = false, message = "Yorum boş olamaz!" });
            }

            int kullaniciId = (int)Session["UserID"];

            var yeniYorum = new ProjeYorumlari
            {
                proje_id = projeId,
                kullanici_id = kullaniciId,
                yorum_metni = yorumMetni,
                yorum_tarihi = DateTime.Now
            };


            var log = new Loglar
            {
                kullanici_id = kullaniciId,
                islem_tarihi = DateTime.Now,
                islem_turu_id = 7
            };
          


            db.Loglar.Add(log);
            db.ProjeYorumlari.Add(yeniYorum);
            db.SaveChanges();

            return Json(new { success = true, message = "Yorum başarıyla eklendi!" });
        }


        // **********************************HESAP AYARLARI KISMI*************************************
        // İletişim Bilgileri Güncelleme Metodu (POST)
        [HttpPost]
       
        public ActionResult GuncelleIletisim(string telefon, string email, string il, string ilce, string eskiSifre, string yeniSifre)
        {
            // Session'dan UserID'yi al
            int userId = (int)Session["UserID"];


            // Kullanıcıyı ve adresini JOIN ile veritabanından al
            var kullanici = (from k in db.Kullanicilar
                             join ka in db.KullaniciAdresi on k.kullanici_id equals ka.kullanici_id
                             where k.kullanici_id == userId
                             select new { Kullaniciguncel = k, Adres = ka }).FirstOrDefault();

            // Kullanıcı bulunduysa
            if (kullanici != null)
            {
                // Telefon ve e-posta güncellemeleri
                kullanici.Kullaniciguncel.telefon = telefon;
                kullanici.Kullaniciguncel.e_mail = email;

                // Adres bilgilerini güncelle
                kullanici.Adres.sehir_adi = il;
                kullanici.Adres.ilce_adi = ilce;



                var log = new Loglar
                {
                    kullanici_id = kullanici.Kullaniciguncel.kullanici_id,
                    islem_tarihi = DateTime.Now,
                    islem_turu_id = 6
                };
                db.Loglar.Add(log);
                db.SaveChanges();


                // Veritabanında değişiklikleri kaydet
                db.SaveChanges();

                // Başarı mesajı döndür
                return Json(new { success = true, message = "Bilgiler başarıyla güncellendi." });
            }

            // Kullanıcı bulunamazsa hata mesajı döndür
            return Json(new { success = false, message = "Güncelleme başarısız. Kullanıcı bulunamadı." });

        }



        // Şifre Güncelleme Metodu (POST)
        [HttpPost]

        public ActionResult GuncelleSifre(string eskiSifre, string yeniSifre)
        {
            // Session'dan UserID'yi al
            int userId = (int)Session["UserID"];



            // Kullanıcıyı ve adresini JOIN ile veritabanından al
            var kullanici = db.Kullanicilar.Find(userId);

            // Kullanıcı bulunduysa
            if (kullanici != null)
            {
                

                // Şifre değiştirme kontrolü
                if (!string.IsNullOrEmpty(eskiSifre) && !string.IsNullOrEmpty(yeniSifre))
                {
                    // Eski şifre doğrulaması yapılabilir
                    if (kullanici.sifre != eskiSifre) // Şifre doğruysa kontrol edelim
                    {
                        return Json(new { success = false, message = "Eski şifre hatalı." });
                    }

                    // Yeni şifreyi güncelle
                    kullanici.sifre = yeniSifre;
                }

                var log = new Loglar
                {
                    kullanici_id = kullanici.kullanici_id,
                    islem_tarihi = DateTime.Now,
                    islem_turu_id = 5
                };
                db.Loglar.Add(log);
                db.SaveChanges();


                // Veritabanında değişiklikleri kaydet
                db.SaveChanges();

                // Başarı mesajı döndür
                return Json(new { success = true, message = "Şifre başarıyla güncellendi." });
            }

            // Kullanıcı bulunamazsa hata mesajı döndür
            return Json(new { success = false, message = "Güncelleme başarısız. Kullanıcı bulunamadı." });

        }

        // **********************************GERİ BİLDİRİM KISMI*************************************

        //GeriBildirim Türlerini dropdown liste gönderir

        [HttpGet]
        public ActionResult GeriBildirim()
        {
            var tipler = db.GeriBildirimTipi
                           .Select(t => new { t.geribildirim_tipi_id, t.geribildirim_adi })
                           .ToList();

            return Json(tipler, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult GeriBildirimGonder(int geribildirimTipiId, string geribildirimMesaj)
        {
            int kullaniciId = (int)Session["UserID"];
            if (string.IsNullOrWhiteSpace(geribildirimMesaj))
            {
                return Json(new { success = false, message = "Geri bildirim mesajı boş olamaz!" });
            }

           

            var geriBildirim = new GeriBildirim
            {
                kullanici_id = kullaniciId,
                geribildirim_tipi_id = geribildirimTipiId,
                geribildirim_mesaj = geribildirimMesaj,
                geribildirim_tarihi = DateTime.Now
            };
            var log = new Loglar
            {
                kullanici_id = kullaniciId,
                islem_tarihi = DateTime.Now,
                islem_turu_id = 8
            };

            db.Loglar.Add(log);
            

            try
            {
                db.GeriBildirim.Add(geriBildirim);
                db.Loglar.Add(log);
                db.SaveChanges();
                return Json(new { success = true, message = "Geri bildiriminiz başarıyla gönderildi!" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Bir hata oluştu: " + ex.Message });
            }
        }


       


    }
    }

    
        
    