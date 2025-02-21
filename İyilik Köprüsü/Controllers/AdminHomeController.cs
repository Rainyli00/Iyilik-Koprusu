using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using İyilik_Köprüsü.Models;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Data.SqlClient;


namespace İyilik_Köprüsü.Controllers
{
    public class AdminHomeController : Controller
    {
        // Veritabanı bağlantısı
        BagisDBEntities db = new BagisDBEntities();
        

        [HttpGet]
        public ActionResult Index()
        {
            if (Session["YoneticiID"] != null)
            {
                ViewBag.ToplamKullanici = db.Kullanicilar.Count();
                ViewBag.ToplamBagis = db.Gelir.Sum(b => (decimal?)b.gelir_miktari) ?? 0;
                ViewBag.Kasa = (db.Gelir.Sum(g => (decimal?)g.gelir_miktari) ?? 0) - (db.Gider.Sum(g => (decimal?)g.gider_miktari) ?? 0);
                ViewBag.YoneticiAdSoyad = Session["YoneticiAdSoyad"];



                return View();
            }

            else
            {
                return RedirectToAction("Index", "AdminLogin");
            }
        }




        //Chart İçin verileri getirir

        [HttpGet]
        public ActionResult GetBagisByKategori()
        {

            var bagisKategorilereGore = db.Gelir
       .GroupBy(g => g.kategori_id)
       .Select(s => new
       {
           KategoriAdi = db.ProjeKategori
               .Where(k => k.kategori_id == s.Key)
               .Select(k => k.kategori_adi)
               .FirstOrDefault(),
           ToplamBagis = s.Sum(x => x.gelir_miktari)
       })
       .ToList();

            return Json(bagisKategorilereGore, JsonRequestBehavior.AllowGet);
        }
 // Kulanıcı işlemleri *******************************************************************************

        // Kullanıcı Bilgisi Getirme
        [HttpGet]
        public ActionResult GetPagedKullanicilar(string search = "", int page = 1, int pageSize = 10)
        {
            var query = db.Kullanicilar.AsQueryable();

            // Arama filtresi
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(k => k.ad_soyad.Contains(search) || k.e_mail.Contains(search));
            }

            var toplamVeri = query.Count();

            var kullanicilar = query
                .OrderBy(k => k.kullanici_id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(k => new
                {
                    k.kullanici_id,
                    k.ad_soyad,
                    k.e_mail,
                    k.telefon,
                    Rol = k.Roller.rol_ad
                }).ToList();

            var totalPages = (int)Math.Ceiling((double)toplamVeri / pageSize);

            return Json(new
            {
                kullanicilar = kullanicilar,
                totalPages = totalPages
            }, JsonRequestBehavior.AllowGet);
        }

        

        // Kullanıcı Bilgisi Getirme
        [HttpGet]
        public ActionResult GetKullaniciDetayli(int id)
        {
            try
            {
                var kullanici = db.Kullanicilar
                    .Where(k => k.kullanici_id == id)
                    .Select(k => new
                    {
                        k.kullanici_id,
                        ad_soyad = k.ad_soyad,
                        e_mail = k.e_mail,
                        telefon = k.telefon
                    })
                    .FirstOrDefault();

                if (kullanici != null)
                {
                    return Json(new { success = true, kullanici = kullanici }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { success = false, message = "Kullanıcı bulunamadı." }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Bir hata oluştu: " + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        // Kullanıcı Güncelleme
        [HttpPost]
        public ActionResult UpdateKullanici(int id, string adSoyad, string email, string telefon)
        {
            var kullanici = db.Kullanicilar.Find(id);
            if (kullanici != null)
            {
                kullanici.ad_soyad = adSoyad;
                kullanici.e_mail = email;
                kullanici.telefon = telefon;

                db.SaveChanges();
                return Json(new { success = true, message = "Kullanıcı başarıyla güncellendi." });
            }
            return Json(new { success = false, message = "Kullanıcı bulunamadı." });
        }

        // Kullanıcı Silme

        [HttpPost]
        public ActionResult DeleteKullanici(int id)
        {
            var kullanici = db.Kullanicilar.Find(id);
            if (kullanici != null)
            {

                // Prosedürü çalıştırır
                db.Database.ExecuteSqlCommand("EXEC KullaniciVeVerileriniSil @kullanici_id", new SqlParameter("@kullanici_id", id));
                

                return Json(new { success = true, message = "Kullanıcı başarıyla silindi." });
            }
            return Json(new { success = false, message = "Kullanıcı bulunamadı." });
        }


        //*****************************proje kısmı*************************************

        // Ekleme için kategoriyi getirir
        
        [HttpGet]
        public ActionResult GetKategoriler()
        {
            try
            {
                var kategoriler = db.ProjeKategori
                    .Select(k => new
                    {
                        k.kategori_id,
                        k.kategori_adi
                    })
                    .ToList();

                return Json(new { success = true, kategoriler = kategoriler }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Kategoriler yüklenirken bir hata oluştu: " + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult GetProjeler(string search = "", int page = 1, int pageSize = 10)
        {
            try
            {
                var projelerQuery = db.Proje.AsQueryable();

                // Arama Filtrelemesi
                if (!string.IsNullOrEmpty(search))
                {
                    projelerQuery = projelerQuery.Where(p => p.proje_ad.Contains(search));
                }

                // Toplam veri sayısını alıyoruz
                var toplamVeri = projelerQuery.Count();

                // Sayfalama işlemi
                var projeler = projelerQuery
                    .OrderBy(p => p.proje_id) // Verileri sıralıyoruz
                    .Skip((page - 1) * pageSize) // Atlanacak kayıt sayısı
                    .Take(pageSize) // Bu sayfada gösterilecek kayıt sayısı
                    .Select(p => new
                    {
                        p.proje_id,
                        p.proje_ad,
                        p.proje_aciklamasi,
                        Kategori = p.ProjeKategori.kategori_adi,
                        p.proje_resim_link
                    })
                    .ToList();

                // Toplam sayfa sayısını hesaplıyoruz
                var totalPages = (int)Math.Ceiling((double)toplamVeri / pageSize);

                return Json(new
                {
                    success = true,
                    projeler = projeler,
                    totalPages = totalPages,
                    currentPage = page
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Bir hata oluştu: " + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        //Düzenleme için bilgileri getirir
        [HttpGet]
        public ActionResult GetProjeDetayli(int id)
        {
            try
            {
                var proje = db.Proje
                    .Where(p => p.proje_id == id)
                    .Select(p => new
                    {
                        p.proje_id,
                        p.proje_ad,
                        p.proje_aciklamasi,
                        p.proje_resim_link,
                        kategori_id = p.kategori_id
                    })
                    .FirstOrDefault();

                if (proje != null)
                {
                    return Json(new { success = true, data = proje }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { success = false, message = "Proje bulunamadı." }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Bir hata oluştu: " + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        // Proje Ekle
        [HttpPost]
        public ActionResult AddProje(string projeAd, string projeAciklamasi, string projeResimLink, int kategoriId)
        {
            try
            {
                if (kategoriId <= 0)
                {
                    return Json(new { success = false, message = "Lütfen bir kategori seçiniz." });
                }

                var yeniProje = new Proje
                {
                    proje_ad = projeAd,
                    proje_aciklamasi = projeAciklamasi,
                    proje_resim_link = projeResimLink,
                    kategori_id = kategoriId // Kategoriyi ekliyoruz
                };

                db.Proje.Add(yeniProje);
                db.SaveChanges();

                return Json(new { success = true, message = "Proje başarıyla eklendi." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Proje eklenirken bir hata oluştu: " + ex.Message });
            }
        }


        // Proje Düzenle
        [HttpPost]
        public ActionResult UpdateProje(int id, string projeAd, string projeAciklamasi, string projeResimLink, int kategoriId)
        {
            try
            {
                var proje = db.Proje.Find(id);

                if (proje != null)
                {
                    // Gelen parametrelerle proje bilgilerini güncelle
                    proje.proje_ad = projeAd;
                    proje.proje_aciklamasi = projeAciklamasi;
                    proje.proje_resim_link = projeResimLink;
                    proje.kategori_id = kategoriId; // Kategori güncellemesi

                    db.SaveChanges();

                    return Json(new { success = true, message = "Proje başarıyla güncellendi." });
                }

                return Json(new { success = false, message = "Proje bulunamadı." });
            }
          
            catch (Exception ex)
            {
               
                return Json(new { success = false, message = $"Hata: {ex.Message}" });
            }
        }

        // Proje Sil
        [HttpPost]
        public ActionResult DeleteProje(int id)
        {
            try
            {
                // Projeyi bul
                var proje = db.Proje.Find(id);

                if (proje != null)
                {
                    
                    // Prosedürü çalıştırır
                    db.Database.ExecuteSqlCommand("EXEC ProjeSil @proje_id", new SqlParameter("@proje_id", id));

                    return Json(new { success = true, message = "Proje ve ilişkili kayıtlar başarıyla silindi." });
                }

                return Json(new { success = false, message = "Proje bulunamadı." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Proje silinirken bir hata oluştu: " + ex.Message });
            }
        }



        //*****************************************Log Kısmı***********************************************

        // Logları getirme metodu
        [HttpGet]
        public ActionResult GetLogs(string search = "", DateTime? startDate = null, DateTime? endDate = null, int page = 1, int pageSize = 30)
        {
            try
            {
                var sorgu = db.Loglar
                    .Include(l => l.Kullanicilar)
                    .Include(l => l.IslemTuru)
                    .AsQueryable();

                // Arama filtresi
                if (!string.IsNullOrEmpty(search))
                {
                    sorgu = sorgu.Where(log =>
                        log.Kullanicilar.ad_soyad.Contains(search) ||
                        log.IslemTuru.islem_turu_adi.Contains(search));
                }
                    
                // Tarih filtresi
                if (startDate.HasValue)
                {
                    sorgu = sorgu.Where(log => log.islem_tarihi >= startDate.Value);
                }

                if (endDate.HasValue)
                {
                    sorgu = sorgu.Where(log => log.islem_tarihi <= endDate.Value);
                }

                // Toplam veri sayısı
                var toplamVeri = sorgu.Count();

                // Sayfalama ve veri çekme
                var logs = sorgu
                    .OrderByDescending(log => log.islem_tarihi)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList() // Verileri belleğe al
                    .Select(log => new
                    {
                        log.log_id,
                        KullaniciAdi = log.Kullanicilar.ad_soyad,
                        IslemTuru = log.IslemTuru.islem_turu_adi,
                        IslemTarihi = log.islem_tarihi.ToString("yyyy-MM-ddTHH:mm:ss") // ISO formatında
                    });

                var totalPages = (int)Math.Ceiling((double)toplamVeri / pageSize);

                return Json(new
                {
                    success = true,
                    logs = logs,
                    totalPages = totalPages,
                    currentPage = page
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Loglar alınırken bir hata oluştu: " + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        //***********************************Bağış Listesi*****************************************
        [HttpGet]
        public ActionResult GetBagislar(string search = "", DateTime? startDate = null, DateTime? endDate = null, int page = 1, int pageSize = 10)
        {
            try
            {
                var query = db.Bagis
                    .Include(b => b.Kullanicilar)
                    .Include(b => b.Proje)
                    .Include(b => b.OdemeYontemi) // Ödeme yöntemini dahil ediyoruz
                    .AsQueryable();

                // Arama filtresi
                if (!string.IsNullOrEmpty(search))
                {
                    query = query.Where(b =>
                        b.Kullanicilar.ad_soyad.Contains(search) ||
                        b.Proje.proje_ad.Contains(search) ||
                        b.OdemeYontemi.odeme_yontem_adi.Contains(search));
                }

                // Tarih filtresi
                if (startDate.HasValue)
                {
                    query = query.Where(b => b.bagis_tarihi >= startDate.Value);
                }

                if (endDate.HasValue)
                {
                    query = query.Where(b => b.bagis_tarihi <= endDate.Value);
                }

                // Toplam kayıt sayısı
                var toplamVeri = query.Count();

                // Sayfalama ve veri çekme
                var bagislar = query
                    .OrderByDescending(b => b.bagis_tarihi)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList()
                    .Select(b => new
                    {
                        b.bagis_id,
                        KullaniciAdi = b.Kullanicilar.ad_soyad,
                        ProjeAdi = b.Proje.proje_ad,
                        OdemeYontemi = b.OdemeYontemi.odeme_yontem_adi,
                        b.bagis_miktari,
                        BagisTarihi = b.bagis_tarihi.ToString("dd.MM.yyyy HH:mm:ss")
                    });

                var totalPages = (int)Math.Ceiling((double)toplamVeri / pageSize);

                return Json(new
                {
                    success = true,
                    bagislar = bagislar,
                    totalPages = totalPages,
                    currentPage = page
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Bağışlar alınırken bir hata oluştu: " + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        //**************************************Gider Ekleme Kısmı ************************************

        [HttpPost]
        public ActionResult AddGider(decimal giderMiktari, int kategoriId)
        {
            try
            {
                // Kategori kontrolü
                if (kategoriId <= 0)
                {
                    return Json(new { success = false, message = "Lütfen bir kategori seçiniz." });
                }

                // Yeni gider kaydı oluşturma
                var yeniGider = new Gider
                {
                    kategori_id = kategoriId,
                    gider_miktari = giderMiktari,
                    gider_tarihi = DateTime.Now // Gider tarihini sistem saatiyle ayarlıyoruz
                };

                db.Gider.Add(yeniGider);
                db.SaveChanges();

                return Json(new { success = true, message = "Gider başarıyla eklendi." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Gider eklenirken bir hata oluştu: " + ex.Message });
            }
        }

        //********************** Geri Bildirim Görüntüleme Kısmı ****************************
        [HttpGet]
        public ActionResult GetGeriBildirimler(string search = "", DateTime? startDate = null, DateTime? endDate = null, int page = 1, int pageSize = 10)
        {
            try
            {
                var query = db.GeriBildirim
                    .Include(g => g.Kullanicilar)
                    .Include(g => g.GeriBildirimTipi)
                    .AsQueryable();

                // Arama filtresi
                if (!string.IsNullOrEmpty(search))
                {
                    query = query.Where(g =>
                        g.Kullanicilar.ad_soyad.Contains(search) ||
                        g.GeriBildirimTipi.geribildirim_adi.Contains(search));
                }

                // Tarih filtresi
                if (startDate.HasValue)
                {
                    query = query.Where(g => g.geribildirim_tarihi >= startDate.Value);
                }

                if (endDate.HasValue)
                {
                    query = query.Where(g => g.geribildirim_tarihi <= endDate.Value);
                }

                // Toplam veri sayısı
                var toplamVeri = query.Count();

                // Sayfalama ve veri çekme
                var geriBildirimler = query
                    .OrderByDescending(g => g.geribildirim_tarihi)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList()
                    .Select(g => new
                    {
                        g.geribildirim_id,
                        KullaniciAdi = g.Kullanicilar.ad_soyad,
                        GeriBildirimTuru = g.GeriBildirimTipi.geribildirim_adi,
                        Mesaj = g.geribildirim_mesaj,
                        GeriBildirimTarihi = g.geribildirim_tarihi.ToString("dd.MM.yyyy HH:mm:ss")
                    });

                var totalPages = (int)Math.Ceiling((double)toplamVeri / pageSize);

                return Json(new
                {
                    success = true,
                    geriBildirimler = geriBildirimler,
                    totalPages = totalPages,
                    currentPage = page
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Geri bildirimler alınırken bir hata oluştu: " + ex.Message });
            }
        }



        //***********************************Proje Yorumları Kısmı************************************
        [HttpGet]
        public ActionResult GetProjeYorumlari(string search = "", DateTime? startDate = null, DateTime? endDate = null, int page = 1, int pageSize = 10)
        {
            try
            {
                var query = db.ProjeYorumlari
                    .Include(p => p.Kullanicilar)
                    .Include(p => p.Proje)
                    .AsQueryable();

                // Arama filtresi
                if (!string.IsNullOrEmpty(search))
                {
                    query = query.Where(p =>
                        p.Kullanicilar.ad_soyad.Contains(search) ||
                        p.Proje.proje_ad.Contains(search) ||
                        p.yorum_metni.Contains(search));
                }

                // Tarih filtresi
                if (startDate.HasValue)
                {
                    query = query.Where(p => p.yorum_tarihi >= startDate.Value);
                }

                if (endDate.HasValue)
                {
                    query = query.Where(p => p.yorum_tarihi <= endDate.Value);
                }

                // Toplam veri sayısı
                var toplamVeri = query.Count();

                // Sayfalama ve veri çekme
                var yorumlar = query
                    .OrderByDescending(p => p.yorum_tarihi)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList()
                    .Select(p => new
                    {
                        p.yorum_id,
                        KullaniciAdi = p.Kullanicilar.ad_soyad,
                        ProjeAdi = p.Proje.proje_ad,
                        YorumMetni = p.yorum_metni,
                        YorumTarihi = p.yorum_tarihi.ToString("dd.MM.yyyy HH:mm:ss")
                    });

                var totalPages = (int)Math.Ceiling((double)toplamVeri / pageSize);

                return Json(new
                {
                    success = true,
                    yorumlar = yorumlar,
                    totalPages = totalPages,
                    currentPage = page
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Yorumlar alınırken bir hata oluştu: " + ex.Message });
            }
        }

        //*************************************Yönetici İşlemleri Kısmı********************************

        [HttpGet]
        public ActionResult GetYoneticiListesi(int page = 1, int pageSize = 10)
        {
            try
            {
                var toplamVeri = db.Yonetici.Count();

                var yoneticiler = db.Yonetici
                    .OrderBy(y => y.yonetici_id)
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToList()
                    .Select(y => new
                    {
                        y.yonetici_id,
                        y.yonetici_ad_soyad,
                        y.yonetici_mail,
                        y.yonetici_telefon,
                        y.yonetici_sifre
                    });

                var totalPages = (int)Math.Ceiling((double)toplamVeri / pageSize);

                return Json(new
                {
                    success = true,
                    yoneticiler = yoneticiler,
                    totalPages = totalPages,
                    currentPage = page
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Yöneticiler alınırken bir hata oluştu: " + ex.Message });
            }
        }

        // Yönetici Ekleme
        [HttpPost]
        public ActionResult AddYonetici(string yoneticiAdSoyad, string yoneticiMail, string yoneticiTelefon, string yoneticiSifre)
        {
            try
            {
                if (string.IsNullOrEmpty(yoneticiAdSoyad) || string.IsNullOrEmpty(yoneticiMail) || string.IsNullOrEmpty(yoneticiTelefon))
                {
                    return Json(new { success = false, message = "Lütfen tüm alanları doldurun." });
                }

                var yeniYonetici = new Yonetici
                {
                    yonetici_ad_soyad = yoneticiAdSoyad,
                    yonetici_mail = yoneticiMail,
                    yonetici_telefon = yoneticiTelefon,
                    yonetici_sifre = yoneticiSifre
                };

                db.Yonetici.Add(yeniYonetici);
                db.SaveChanges();

                return Json(new { success = true, message = "Yönetici başarıyla eklendi." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Yönetici eklenirken bir hata oluştu: " + ex.Message });
            }
        }

        // Yönetici Düzenle
        [HttpPost]
        public ActionResult UpdateYonetici(int id, string yoneticiAdSoyad, string yoneticiMail, string yoneticiTelefon, string yoneticiSifre)
        {
            try
            {
                var yonetici = db.Yonetici.Find(id);

                if (yonetici != null)
                {
                    // Gelen parametrelerle yöneticinin bilgilerini güncelle
                    yonetici.yonetici_ad_soyad = yoneticiAdSoyad;
                    yonetici.yonetici_mail = yoneticiMail;
                    yonetici.yonetici_telefon = yoneticiTelefon;
                    yonetici.yonetici_sifre = yoneticiSifre;

                    db.SaveChanges();

                    return Json(new { success = true, message = "Yönetici başarıyla güncellendi." });
                }

                return Json(new { success = false, message = "Yönetici bulunamadı." });
            }
      
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Yönetici Düzenlenirken bir hata oluştu: " + ex.Message });
            }
        }

        // Yönetici Sil
        [HttpPost]
        public ActionResult DeleteYonetici(int id)
        {
            try
            {
                var yonetici = db.Yonetici.Find(id);

                if (yonetici != null)
                {
                    db.Yonetici.Remove(yonetici);
                    db.SaveChanges();

                    return Json(new { success = true, message = "Yönetici başarıyla silindi." });
                }

                return Json(new { success = false, message = "Yönetici bulunamadı." });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "Yönetici silinirken bir hata oluştu: " + ex.Message });
            }
        }

        // Yönetici Düzenleme için bilgileri getir
[HttpGet]
public ActionResult GetYoneticiDetayli(int id)
{
    try
    {
        var yonetici = db.Yonetici
            .Where(y => y.yonetici_id == id)
            .Select(y => new
            {
                y.yonetici_id,
                y.yonetici_ad_soyad,
                y.yonetici_mail,
                y.yonetici_telefon,
                y.yonetici_sifre
            })
            .FirstOrDefault();

        if (yonetici != null)
        {
            return Json(new { success = true, data = yonetici }, JsonRequestBehavior.AllowGet);
        }
        return Json(new { success = false, message = "Yönetici bulunamadı." }, JsonRequestBehavior.AllowGet);
    }
    catch (Exception ex)
    {
        return Json(new { success = false, message = "Bir hata oluştu: " + ex.Message }, JsonRequestBehavior.AllowGet);
    }
}
        //***********************************Backup Kısmı************************************
        [HttpPost]
        public ActionResult BackupAl()
        {
            try
            {

                db.Database.ExecuteSqlCommand("EXEC msdb.dbo.sp_start_job @job_name = 'BagisDBHaftalikYedekAlma'");
             
                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                
                return Json(new { success = false, message = ex.Message });
            }
            
        }


    }
}
