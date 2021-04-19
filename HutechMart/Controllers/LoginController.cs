using HutechMart.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HutechMart.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Login(string taiKhoan, string matKhau)
        {
            bool result = false;
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var dangNhap = db.tbl_DangNhap.FirstOrDefault(x => x.taikhoan == taiKhoan);
                if(dangNhap != null)
                {
                    if(dangNhap.matkhau == matKhau)
                    {
                        var nguoiDung = db.tbl_NhanVien
                                        .Include(x=>x.tbl_ChucVu)
                                        .Include(x=>x.tbl_CuaHang)
                                        .Include(x=>x.tbl_DangNhap)
                                        .FirstOrDefault(x => x.id == dangNhap.id_nhanvien);
                        Session["NguoiDung"] = nguoiDung;                       
                        result = true;
                    }
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Logout()
        {
            Session.Clear();
            return RedirectToAction("Index", "Login");
        }
    }
}