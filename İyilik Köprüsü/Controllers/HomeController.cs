using İyilik_Köprüsü.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace İyilik_Köprüsü.Controllers
{
    public class HomeController : Controller
    {
         BagisDBEntities db = new BagisDBEntities(); // Veritabanı bağlantısı için nesne oluşturduk

        // GET: Home
        public ActionResult Index()
        {
            TempData.Clear();
            // Veritabanından üç tane projeyi çek
            var projeler = db.Proje.Take(3).ToList();
            return View(projeler); // Projeleri modelini view a gönderiyoruz
        }
    }
}