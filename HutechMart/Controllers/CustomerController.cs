using HutechMart.Common;
using HutechMart.Models;
using PagedList;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HutechMart.Controllers
{
    public class CustomerController : BaseController
    {
        // GET: Customer
        public ActionResult Index(int page = 1, int pagesize = 10)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var khachHang = db.tbl_KhachHang.Include(x=>x.tbl_PhanLoai_KhachHang).ToList();
                ViewBag.PhanLoai = db.tbl_PhanLoai_KhachHang.ToList();
                return View(khachHang.ToPagedList(page, pagesize));
            }
        }

        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }

        public ActionResult Update(int id)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var khachHang = db.tbl_KhachHang.FirstOrDefault(x => x.id == id);
                return View(khachHang);
            }
        }

        public ActionResult CreateGroupCustomer()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Update(tbl_KhachHang khachHang)
        {
            bool result = false;
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        var _khachHang = db.tbl_KhachHang.Find(khachHang.id);
                        _khachHang.id_phanloai = khachHang.id_phanloai;
                        _khachHang.tenkhachhang = khachHang.tenkhachhang;
                        _khachHang.gioitinh = khachHang.gioitinh;
                        _khachHang.ngaysinh = khachHang.ngaysinh;
                        _khachHang.sochungminh = khachHang.sochungminh;
                        _khachHang.sodienthoai = khachHang.sodienthoai;
                        _khachHang.diachi_tentinh = khachHang.diachi_tentinh;
                        _khachHang.diachi_tenquan = khachHang.diachi_tenquan;
                        _khachHang.diachi_tenphuong = khachHang.diachi_tenphuong;
                        _khachHang.diachi_sonha = khachHang.diachi_sonha;
                        _khachHang.email = khachHang.email;
                        _khachHang.facebook = khachHang.facebook;
                        _khachHang.ghichu = khachHang.ghichu;
                        _khachHang.id_nguoicapnhat = khachHang.id_nguoicapnhat;
                        _khachHang.ngaycapnhat = DatetimeLocation.GetDate();
                        db.SaveChanges();
                        trans.Commit();
                        result = true;
                    }
                    catch
                    {
                        trans.Rollback();
                    }
                }
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult Create(tbl_KhachHang khachHang)
        {
            bool result = false;
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        khachHang.ngaytao = DatetimeLocation.GetDate();
                        khachHang.tinhtrang = true;
                        db.tbl_KhachHang.Add(khachHang);
                        db.SaveChanges();
                        trans.Commit();
                        result = true;
                    }
                    catch
                    {
                        trans.Rollback();
                    }
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            bool result = false;
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        var customer = db.tbl_KhachHang.FirstOrDefault(x => x.id == id);
                        db.tbl_KhachHang.Remove(customer);
                        db.SaveChanges();
                        trans.Commit();
                        result = true;
                    }
                    catch
                    {
                        trans.Rollback();
                    }
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DanhSachPhanLoai(string search)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var test = db.tbl_PhanLoai_KhachHang.Where(x => x.tenphanloai.StartsWith(search.ToLower())).Select(x => new { id = x.id, tenphanloai = x.tenphanloai }).ToList();
                return Json(test, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpGet]
        public JsonResult DetailCustomer(long id)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var info = from a in db.tbl_KhachHang
                           join b in db.tbl_NhanVien on a.id_nguoitao equals b.id into NguoiTao
                           from c in NguoiTao.DefaultIfEmpty()
                           where a.id == id
                           select new
                           {
                               MaKH = a.makhachhang,
                               DiaChi = a.diachi_sonha + ", " + a.diachi_tenphuong + ", " + a.diachi_tenquan + ", " + a.diachi_tentinh,
                               TenKH = a.tenkhachhang,
                               GT = a.gioitinh,
                               NgaySinh = a.ngaysinh,
                               SDT = a.sodienthoai,
                               CMND = a.sochungminh,
                               Email = a.email,
                               FB = a.facebook,
                               TinhTrang = a.tinhtrang == true ? "Hoạt động" : "Không hoạt động",
                               NguoiTao = c.tennhanvien
                           };
                return Json(info.ToList(), JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult CreateGroupCustomer(string tenphanloai, string ghichu)
        {
            bool result = false;
            using(HutechMartDbContext db = new HutechMartDbContext())
            {
                using(var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        tbl_PhanLoai_KhachHang phanloai = new tbl_PhanLoai_KhachHang();
                        phanloai.tenphanloai = tenphanloai;
                        phanloai.ghichu = ghichu;
                        db.tbl_PhanLoai_KhachHang.Add(phanloai);
                        db.SaveChanges();
                        trans.Commit();
                        result = true;
                    }
                    catch
                    {
                        trans.Rollback();
                    }
                }
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}