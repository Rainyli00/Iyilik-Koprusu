using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace İyilik_Köprüsü.Models
{
    public class BagisModel
    {
        public string ProjeAd { get; set; }   // Bağış yapılan projenin adı
        public DateTime BagisTarihi { get; set; }  // Bağışın yapıldığı tarih
        public decimal BagisMiktari { get; set; }  // Bağışın miktarı
    }
}