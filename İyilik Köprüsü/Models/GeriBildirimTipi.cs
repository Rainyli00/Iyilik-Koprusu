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
    
    public partial class GeriBildirimTipi
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public GeriBildirimTipi()
        {
            this.GeriBildirim = new HashSet<GeriBildirim>();
        }
    
        public int geribildirim_tipi_id { get; set; }
        public string geribildirim_adi { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<GeriBildirim> GeriBildirim { get; set; }
    }
}
