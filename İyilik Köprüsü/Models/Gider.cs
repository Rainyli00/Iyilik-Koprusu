//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace İyilik_Köprüsü.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Gider
    {
        public int gider_id { get; set; }
        public int kategori_id { get; set; }
        public decimal gider_miktari { get; set; }
        public System.DateTime gider_tarihi { get; set; }
    
        public virtual ProjeKategori ProjeKategori { get; set; }
    }
}
