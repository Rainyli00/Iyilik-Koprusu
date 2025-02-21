using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using İyilik_Köprüsü.Models;

namespace İyilik_Köprüsü.Controllers
{
    public class DonateController : Controller
    {
        // GET: Donate
        BagisDBEntities db = new BagisDBEntities();

        [HttpGet]
        public ActionResult Index()
        {
            if (Session["UserID"] != null)
            {
                int userId = (int)Session["UserID"];
                var user = db.Kullanicilar.FirstOrDefault(u => u.kullanici_id == userId);

                if (user != null)
                {
                    // Kullanıcı bilgilerini ViewBag'e aktar
                    ViewBag.UserName = user.ad_soyad;
                    ViewBag.UserEmail = user.e_mail;
                    ViewBag.UserPhone = user.telefon;
                }
            }
            // Kategorileri SelectList olarak oluştur ve ViewBag'e ata
            ViewBag.Kategoriler = new SelectList(db.ProjeKategori.ToList(), "kategori_id", "kategori_adi");
            ViewBag.Projeler = new SelectList(Enumerable.Empty<Proje>(), "proje_id", "proje_ad"); // İlk etapta boş olacak
            return View();
        }

        // Proje listesini kategoriye göre döndüren metot
        public ActionResult GetKategoriyeGoreProje(int kategori_id)
        {
            var projeler = db.Proje
                .Where(p => p.kategori_id == kategori_id)
                .Select(p => new
                {
                    proje_id = p.proje_id,
                    proje_ad = p.proje_ad
                }).ToList();

            return Json(projeler, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetTumProjeler()
        {
            var projeler = db.Proje
                .Select(p => new
                {
                    proje_id = p.proje_id,
                    proje_ad = p.proje_ad
                }).ToList();

            return Json(projeler, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetProjeDetayları(int proje_id)
        {
            var project = db.Proje
                .Where(p => p.proje_id == proje_id)
                .Select(p => new
                {
                    proje_ad = p.proje_ad,
                    proje_resim = p.proje_resim_link,
                    proje_aciklama = p.proje_aciklamasi
                })
                .FirstOrDefault();

            return Json(project, JsonRequestBehavior.AllowGet);
        }

        // POST: Bağış detaylarını geçici olarak tut
        [HttpPost]
        public ActionResult SubmitDonation(int proje_id, decimal bagis_miktari, string ad_soyad, string email, string telefon)
        {
            // Proje adını al
            var proje = db.Proje.FirstOrDefault(p => p.proje_id == proje_id);
            if (proje == null)
            {
                return HttpNotFound();
            }
            // Bağış bilgilerini geçici olarak session'da saklıyoruz

            Session["Seçili Proje İdsi"] = proje_id;
            Session["Seçili Proje Adı"] = proje.proje_ad;
            Session["Bağış Tutarı"] = bagis_miktari;
            Session["Seçili Kategori"] = proje.kategori_id;
            Session["Ad Soyad"] = ad_soyad;
            Session["Email"] = email;
            Session["Telefon"] = telefon;

            return RedirectToAction("Odeme");
        }

        // Ödeme Sayfasını Görüntüle
        [HttpGet]
        public ActionResult Odeme()
        {
            // sesion'dan geçici bilgiler alınır
            ViewBag.SeciliProjeAdi = Session["Seçili Proje Adı"];
            ViewBag.BagisTutari = Session["Bağış Tutarı"];
            ViewBag.OdemeYontemleri = new SelectList(db.OdemeYontemi.ToList(), "odeme_yontem_id", "odeme_yontem_adi");

            return View();
        }

        // Ödeme işlemini sonlandırma
        [HttpPost]
        public ActionResult ÖdemeTamamlama(int odeme_yontem_id)
        {

            try
            {
                string email = (string)Session["Email"];


                // Eğer kullanıcı giriş yapmamışsa, misafir kullanıcı oluştur tablo verileri için
                if (Session["UserID"] == null)
                {
                    var user = db.Kullanicilar.FirstOrDefault(u => u.e_mail == email && u.rol_id == 0);
                    if (user == null)
                    {
                        var misafir = new Kullanicilar
                        {
                            ad_soyad = (string)Session["Ad Soyad"],
                            e_mail = (string)Session["Email"],
                            telefon = (string)Session["Telefon"],
                            rol_id = 0,
                        };

                        db.Kullanicilar.Add(misafir);
                        db.SaveChanges();

                        var ensonuye = db.Kullanicilar.Max(x => x.kullanici_id);
                        TempData["UserID"] = ensonuye;
                    }
                    else
                    {
                        TempData["UserID"] = user.kullanici_id;
                    }
                }



                int KullaniciID = TempData["UserID"] != null ? (int)TempData["UserID"] : (int)Session["UserID"];
                decimal BagisMiktari = (decimal)Session["Bağış Tutarı"];
                int projeId = (int)Session["Seçili Proje İdsi"];
                int kategoriId = (int)Session["Seçili Kategori"];
                 
                // Veritabanına bağış kaydı ekle
                 db.Database.ExecuteSqlCommand(
                "EXEC [dbo].[BagisYap] @kullanici_id, @odeme_yontem_id, @proje_id, @bagis_miktari, @bagis_tarihi",
                 new SqlParameter("@kullanici_id", KullaniciID),
                 new SqlParameter("@odeme_yontem_id", odeme_yontem_id),
                 new SqlParameter("@proje_id", projeId),
                 new SqlParameter("@bagis_miktari", BagisMiktari),
                 new SqlParameter("@bagis_tarihi", DateTime.Now) );
                                                                    
                TempData["OnayMesajı"] = "Bağışınız için Teşekkürler.Ödemeniz başarıyla tamamlandı! Ana sayfaya yönlendiriliyorsunuz.";
                
                return RedirectToAction("Odeme"); // Odeme View'ına dön
                


            }
            catch (Exception ex)
            {
                TempData["HataMesajı"] = "Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin."+ex;
                return RedirectToAction("Odeme");



            }
        }
    }
}









