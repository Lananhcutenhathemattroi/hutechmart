using HutechMart.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HutechMart.Controllers
{
    public class AddressController : BaseController
    {
        // GET: Address
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult DanhSachTinh(string search)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var test = db.tbl_Tinh.Where(x => x.tentinh.StartsWith(search.ToLower())).Select(x => new { id = x.id, tentinh = x.tentinh }).ToList();
                return Json(test, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult DanhSachQuan(string search, int id)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var test = db.tbl_Quan.Where(x => x.tenquan.StartsWith(search.ToLower()) && x.id_tinh == id).Select(x => new { id = x.id, tenquan = x.tenquan }).ToList();
                return Json(test, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult DanhSachPhuong(string search, int id)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var test = db.tbl_Phuong.Where(x => x.tenphuong.StartsWith(search.ToLower()) && x.id_quan == id).Select(x => x.tenphuong).ToList();
                return Json(test, JsonRequestBehavior.AllowGet);
            }
        }
    }
}