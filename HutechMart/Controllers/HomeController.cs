using HutechMart.Common;
using HutechMart.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HutechMart.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            using(HutechMartDbContext db = new HutechMartDbContext())
            {
                ViewBag.DoanhSoNgay = db.tbl_HoaDon.Where(x => x.ngaylap.Day == DateTime.UtcNow.Day).Sum(x => x.tongtien);
                ViewBag.DoanhSoThang = db.tbl_HoaDon.Where(x => x.ngaylap.Month == DateTime.UtcNow.Month).Sum(x=>x.tongtien);
                ViewBag.KhachHang = db.tbl_KhachHang.Count();
                ViewBag.SanPham = db.tbl_SanPham.Count();
            }
            return View();
        }  
    }
}