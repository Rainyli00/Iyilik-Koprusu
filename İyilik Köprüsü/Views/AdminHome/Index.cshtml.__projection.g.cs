//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ASP {
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Helpers;
using System.Web.Security;
using System.Web.UI;
using System.Web.WebPages;
using System.Web.WebPages.Html;

public class _Page_Index_cshtml : System.Web.WebPages.WebPage {
private static object @__o;
#line hidden
public _Page_Index_cshtml() {
}
protected System.Web.HttpApplication ApplicationInstance {
get {
return ((System.Web.HttpApplication)(Context.ApplicationInstance));
}
}
public override void Execute() {

#line 1 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
  
    ViewBag.Title = "Y�netim Paneli";
    Layout = null;


#line default
#line hidden

#line 2 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
           __o = ViewBag.YoneticiAdSoyad;


#line default
#line hidden

#line 3 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
                                              __o = Url.Action("Logout", "AdminLogin");


#line default
#line hidden

#line 4 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
                                               __o = ViewBag.ToplamKullanici;


#line default
#line hidden

#line 5 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
                                               __o = ViewBag.ToplamBagis;


#line default
#line hidden

#line 6 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
                                               __o = ViewBag.Kasa;


#line default
#line hidden

#line 7 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
     __o = Url.Action("GetBagisByKategori", "AdminHome");


#line default
#line hidden

#line 8 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
             __o = Url.Action("GetPagedKullanicilar", "AdminHome");


#line default
#line hidden

#line 9 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
         __o = Url.Action("GetKullaniciDetayli", "AdminHome");


#line default
#line hidden

#line 10 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
             __o = Url.Action("UpdateKullanici", "AdminHome");


#line default
#line hidden

#line 11 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
                 __o = Url.Action("DeleteKullanici", "AdminHome");


#line default
#line hidden

#line 12 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
             __o = Url.Action("GetProjeler", "AdminHome");


#line default
#line hidden

#line 13 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
             __o = Url.Action("GetProjeDetayli", "AdminHome");


#line default
#line hidden

#line 14 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
                 __o = Url.Action("DeleteProje", "AdminHome");


#line default
#line hidden

#line 15 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
                   __o = Url.Action("UpdateProje", "AdminHome");


#line default
#line hidden

#line 16 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
                                                               __o = Url.Action("AddProje", "AdminHome");


#line default
#line hidden

#line 17 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
             __o = Url.Action("GetKategoriler", "AdminHome");


#line default
#line hidden

#line 18 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
             __o = Url.Action("GetLogs", "AdminHome");


#line default
#line hidden

#line 19 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
             __o = Url.Action("GetBagislar", "AdminHome");


#line default
#line hidden

#line 20 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
             __o = Url.Action("GetKategoriler", "AdminHome");


#line default
#line hidden

#line 21 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
             __o = Url.Action("AddGider", "AdminHome");


#line default
#line hidden

#line 22 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
             __o = Url.Action("GetGeriBildirimler", "AdminHome");


#line default
#line hidden

#line 23 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
                 __o = Url.Action("GetProjeYorumlari", "AdminHome");


#line default
#line hidden

#line 24 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
                 __o = Url.Action("GetYoneticiListesi", "AdminHome");


#line default
#line hidden

#line 25 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
                       __o = Url.Action("UpdateYonetici", "AdminHome");


#line default
#line hidden

#line 26 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
                                                                      __o = Url.Action("AddYonetici", "AdminHome");


#line default
#line hidden

#line 27 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
                 __o = Url.Action("GetYoneticiDetayli", "AdminHome");


#line default
#line hidden

#line 28 "C:\Users\rabia\AppData\Local\Temp\8E5E75FA5E513670A487C4C1DDFADB01D2F8\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
                     __o = Url.Action("DeleteYonetici", "AdminHome");


#line default
#line hidden
}
}
}
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ASP {
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Helpers;
using System.Web.Security;
using System.Web.UI;
using System.Web.WebPages;
using System.Web.WebPages.Html;

public class _Page_Index_cshtml : System.Web.WebPages.WebPage {
private static object @__o;
#line hidden
public _Page_Index_cshtml() {
}
protected System.Web.HttpApplication ApplicationInstance {
get {
return ((System.Web.HttpApplication)(Context.ApplicationInstance));
}
}
public override void Execute() {

#line 1 "C:\Users\rabia\AppData\Local\Temp\FABDC6EA3B59A66E961A42F2451DF1981325\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
  
    ViewBag.Title = "Y�netim Paneli";
    Layout = null;


#line default
#line hidden

#line 2 "C:\Users\rabia\AppData\Local\Temp\FABDC6EA3B59A66E961A42F2451DF1981325\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
           __o = ViewBag.YoneticiAdSoyad;


#line default
#line hidden

#line 3 "C:\Users\rabia\AppData\Local\Temp\FABDC6EA3B59A66E961A42F2451DF1981325\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
                                              __o = Url.Action("Logout", "AdminLogin");


#line default
#line hidden

#line 4 "C:\Users\rabia\AppData\Local\Temp\FABDC6EA3B59A66E961A42F2451DF1981325\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
                                               __o = ViewBag.ToplamKullanici;


#line default
#line hidden

#line 5 "C:\Users\rabia\AppData\Local\Temp\FABDC6EA3B59A66E961A42F2451DF1981325\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
                                               __o = ViewBag.ToplamBagis;


#line default
#line hidden

#line 6 "C:\Users\rabia\AppData\Local\Temp\FABDC6EA3B59A66E961A42F2451DF1981325\2\�yilik K�pr�s�\�yilik K�pr�s�\Views\AdminHome\Index.cshtml"
                                               __o = ViewBag.Kasa;


#line default
#line hidden
}
}
}
