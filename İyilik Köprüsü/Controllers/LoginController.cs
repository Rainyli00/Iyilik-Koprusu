using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using İyilik_Köprüsü.Models;

namespace İyilik_Köprüsü.Controllers
{
    public class LoginController : Controller
    {
       BagisDBEntities db = new BagisDBEntities(); // Veritabanı bağlantısı için nesne oluşturduk

        // GET: Login
        public ActionResult Index()
        {
            return View(); // Login View'ını döner
        }

        // POST: Login
        [HttpPost]
        public ActionResult Login(string Email, string Sifre)
        {
            // Kullanıcıyı e-posta ve şifre ile sorgula
            
            var user = db.KullaniciLoginSorgu.Where(u => u.e_mail == Email && u.sifre == Sifre && u.rol_id==1).FirstOrDefault();

            if (user != null)
            {

                // Giriş başarılı olduğunda sessionlar ayarlandı
                Session["UserID"] = user.kullanici_id;
                Session["UserName"] = user.ad_soyad;
                Session["UserEmail"] = user.e_mail;
                Session["UserPhone"] = user.telefon;
                Session["UserIl"] = user.sehir_adi;
                Session["UserIlce"] = user.ilce_adi;

                var log = new Loglar//Log tablosuna giriş işleminin logunu ekler
                {
                    kullanici_id = user.kullanici_id,
                    islem_tarihi = DateTime.Now,
                    islem_turu_id = 2 // Giriş
                };
                db.Loglar.Add(log);
                db.SaveChanges();



                return RedirectToAction("Index", "Home"); // Girişten sonra ana sayfaya yönlendir
            }
            else
            {
                // Hata mesajıyla tekrar giriş sayfasına dön
                ViewBag.ErrorMessage = "Kullanıcı Adı veya Şifre Hatalı.";
                ViewBag.ActiveTab = "login";
                return View("Index");
            }
        }

        // POST: Register
        [HttpPost]
        public ActionResult Register(string isim, string Email, string telefon, string sehir, string ilce, string sifre)
        {
            // Aynı e-posta ile kayıt kontrolü
            var epostakontrol = db.Kullanicilar.FirstOrDefault(u => u.e_mail == Email && u.rol_id == 1);
            var misafiruyeolma = db.Kullanicilar.FirstOrDefault(u => u.e_mail == Email && u.rol_id == 0);
            if (epostakontrol != null)
            {
                ViewBag.ErrorMessage = "Bu e-posta adresi zaten kayıtlı.";
                ViewBag.ActiveTab = "register";
                return View("Index");
            }
            // Kullanıcı misfair olup sonrdan üye olursa bilgilerini üye özelliklerine göre günceller
            else if (misafiruyeolma != null)
            {
                misafiruyeolma.rozet_id = 1;
                misafiruyeolma.rol_id = 1;
                misafiruyeolma.sifre = sifre;
                misafiruyeolma.kayit_tarihi = DateTime.Now;
                // Kullanıcı adresi ekle
                var yeniMisafirKullaniciAdres = new KullaniciAdresi
                {
                    kullanici_id = misafiruyeolma.kullanici_id,
                    sehir_adi = sehir,
                    ilce_adi = ilce
                };

                var log = new Loglar //Log tablosuna kayıt işleminin logunu ekler
                {
                    kullanici_id = misafiruyeolma.kullanici_id,
                    islem_tarihi = DateTime.Now,
                    islem_turu_id = 3 // Kayıt olma
                };

                db.KullaniciAdresi.Add(yeniMisafirKullaniciAdres);
                db.SaveChanges();


                db.Loglar.Add(log);
                db.SaveChanges();



                return RedirectToAction("Index", "Home"); // Kayıt sonrası ana sayfaya yönlendirme

            }
          
                
            else { 

            // Yeni kullanıcı oluştur
            var yeniKullanici = new Kullanicilar
            {
                ad_soyad = isim,
                e_mail = Email,
                telefon = telefon,
                sifre = sifre,
                rol_id = 1, // üye rolü
                rozet_id = 1, // başlangıç rozeti(kayıt olan her kullanıcıya verilecek)
                kayit_tarihi = DateTime.Now
            };

            db.Kullanicilar.Add(yeniKullanici);
            db.SaveChanges();

            // Kullanıcı adresi ekle
            var yeniAdres = new KullaniciAdresi
            {
                kullanici_id = yeniKullanici.kullanici_id,
                sehir_adi = sehir,
                ilce_adi = ilce
            };

            db.KullaniciAdresi.Add(yeniAdres);
            db.SaveChanges();

            var log = new Loglar //Log tablosuna kayıt işleminin logunu ekler
            {
                kullanici_id = yeniKullanici.kullanici_id,
                islem_tarihi = DateTime.Now,
                islem_turu_id = 3 // Giriş
            };
            db.Loglar.Add(log);
            db.SaveChanges();

          

            return RedirectToAction("Index", "Home"); // Giriş sonrası ana sayfaya yönlendirme

        }

        }

        // Logout işlemi
        public ActionResult Logout()
        {
           
            // Kullanıcı ID'sini al
            var kullanici_id = Session["UserID"];

            // Oturum bilgilerini temizle
            Session.Abandon();

            // null mu diye sorgula
            if (kullanici_id != null)
            {
                var log = new Loglar //Log tablosuna çıkış işleminin logunu ekler
                {
                    kullanici_id = (int)kullanici_id,
                    islem_tarihi = DateTime.Now,
                    islem_turu_id = 4 
                };
                db.Loglar.Add(log);
                db.SaveChanges();
            }
            return RedirectToAction("Index", "Home"); // Ana sayfaya yönlendir

        }
    }
}
