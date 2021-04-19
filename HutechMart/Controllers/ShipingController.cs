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
    public class ShipingController : BaseController
    {
        // GET: Shiping
        public ActionResult Index(int page = 1, int pagesize = 10)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var giaoHang = db.tbl_DoiTacGiaoHang.Include(x=>x.tbl_PhanLoai_GiaoHang).ToList();
                ViewBag.PhanLoai = db.tbl_PhanLoai_GiaoHang.ToList();
                return View(giaoHang.ToPagedList(page, pagesize));
            }
        }

        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }

        [HttpGet]
        public ActionResult CreateGroupShiping()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Update(int id)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var giaoHang = db.tbl_DoiTacGiaoHang.FirstOrDefault(x => x.id == id);
                return View(giaoHang);
            }
        }
        [HttpGet]
        public JsonResult DetailShiping(long id)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var info = from a in db.tbl_DoiTacGiaoHang
                           join b in db.tbl_PhanLoai_GiaoHang on a.id_phanloai equals b.id
                           where a.id == id
                           select new
                           {
                               MaDT = a.madoitac,
                               DiaChi = a.diachi_sonha + ", " + a.diachi_tenphuong + ", " + a.diachi_tenquan + ", " + a.diachi_tentinh,
                               TenDT = a.tendoitac,
                               SDT = a.sodienthoai,
                               Email = a.email,
                               GhiChu = a.ghichu,
                               TinhTrang = a.tinhtrang == true ? "Hoạt động" : "Không hoạt động",
                               NgayTao = a.ngaytao,
                               PhanLoai = b.tenphanloai
                           };
                return Json(info.ToList(), JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult Create(tbl_DoiTacGiaoHang giaoHang)
        {
            bool result = false;
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        giaoHang.ngaytao = DatetimeLocation.GetDate();
                        giaoHang.tinhtrang = true;
                        db.tbl_DoiTacGiaoHang.Add(giaoHang);
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
        public ActionResult Update(tbl_DoiTacGiaoHang giaoHang)
        {
            bool result = false;
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var _giaoHang = db.tbl_DoiTacGiaoHang.Find(giaoHang.id);
                using(var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        _giaoHang.id_phanloai = giaoHang.id_phanloai;
                        _giaoHang.diachi_tentinh = giaoHang.diachi_tentinh;
                        _giaoHang.diachi_tenquan = giaoHang.diachi_tenquan;
                        _giaoHang.diachi_tenphuong = giaoHang.diachi_tenphuong;
                        _giaoHang.diachi_sonha = giaoHang.diachi_sonha;
                        _giaoHang.tendoitac = giaoHang.tendoitac;
                        _giaoHang.sodienthoai = giaoHang.sodienthoai;
                        _giaoHang.email = giaoHang.email;
                        _giaoHang.id_nguoicapnhat = giaoHang.id_nguoicapnhat;
                        _giaoHang.ngaycapnhat = DatetimeLocation.GetDate();
                        _giaoHang.ghichu = giaoHang.ghichu;
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
            using(HutechMartDbContext db = new HutechMartDbContext())
            {
                using(var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        var giaoHang = db.tbl_DoiTacGiaoHang.FirstOrDefault(x => x.id == id);
                        db.tbl_DoiTacGiaoHang.Remove(giaoHang);
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
        public ActionResult CreateGroupShiping(string tenphanloai, string ghichu)
        {
            bool result = false;
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        tbl_PhanLoai_GiaoHang phanloai = new tbl_PhanLoai_GiaoHang();
                        phanloai.tenphanloai = tenphanloai;
                        phanloai.ghichu = ghichu;
                        db.tbl_PhanLoai_GiaoHang.Add(phanloai);
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
                var test = db.tbl_PhanLoai_GiaoHang.Where(x => x.tenphanloai.StartsWith(search.ToLower())).Select(x => new { id = x.id, tenphanloai = x.tenphanloai }).ToList();
                return Json(test, JsonRequestBehavior.AllowGet);
            }
        }
    }
}