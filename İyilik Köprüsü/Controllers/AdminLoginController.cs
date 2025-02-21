using İyilik_Köprüsü.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace İyilik_Köprüsü.Controllers
{
    public class AdminLoginController : Controller
    {

        BagisDBEntities db = new BagisDBEntities();
        // GET: AdminLogin
        public ActionResult Index()
        {

            return View();
        }

        [HttpPost]

        public ActionResult YoneticiLogin(string email,string password)
        {
            var yonetici = db.Yonetici.FirstOrDefault(y => y.yonetici_mail == email && y.yonetici_sifre == password);

            if (yonetici != null)
            {
                Session["YoneticiID"] = yonetici.yonetici_id;
                Session["YoneticiMail"] = yonetici.yonetici_mail;
                Session["YoneticiAdSoyad"] = yonetici.yonetici_ad_soyad;
                return RedirectToAction("Index", "AdminHome");
            }
            else
            {
                ViewBag.ErrorMessage = "Kullanıcı adı veya şifre hatalı";
                return View("Index");
            }
        }

        public ActionResult Logout()
        {
            Session.Abandon();
            return RedirectToAction("Index", "Home");
        }


    }
}