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
    public class SupplyController : BaseController
    {
        // GET: Supply
        public ActionResult Index(int page = 1, int pagesize = 10)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var cungCap = db.tbl_NhaCungCap.Include(x=>x.tbl_PhanLoai_NhaCungCap).ToList();
                return View(cungCap.ToPagedList(page, pagesize));
            }
        }

        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }

        [HttpGet]
        public ActionResult CreateGroupSupply()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Update(int id)
        {
            using(HutechMartDbContext db = new HutechMartDbContext())
            {
                var cungCap = db.tbl_NhaCungCap.FirstOrDefault(x => x.id == id);
                return View(cungCap);
            }
        }

        [HttpPost]
        public ActionResult Create(tbl_NhaCungCap cungCap)
        {
            bool result = false;
            using(HutechMartDbContext db = new HutechMartDbContext())
            {
                using(var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        cungCap.ngaytao = DatetimeLocation.GetDate();
                        cungCap.tinhtrang = true;
                        db.tbl_NhaCungCap.Add(cungCap);
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
        public ActionResult Update(tbl_NhaCungCap cungCap)
        {
            bool result = false;
            using(HutechMartDbContext db = new HutechMartDbContext())
            {
                var _cungCap = db.tbl_NhaCungCap.Find(cungCap.id);
                using(var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        _cungCap.id_phanloai = cungCap.id_phanloai;
                        _cungCap.diachi_tentinh = cungCap.diachi_tentinh;
                        _cungCap.diachi_tenquan = cungCap.diachi_tenquan;
                        _cungCap.diachi_tenphuong = cungCap.diachi_tenphuong;
                        _cungCap.diachi_sonha = cungCap.diachi_sonha;
                        _cungCap.tennhacungcap = cungCap.tennhacungcap;
                        _cungCap.sodienthoai = cungCap.sodienthoai;
                        _cungCap.email = cungCap.email;
                        _cungCap.masothue = cungCap.masothue;
                        _cungCap.id_nguoicapnhat = cungCap.id_nguoicapnhat;
                        _cungCap.ngaycapnhat = DatetimeLocation.GetDate();
                        _cungCap.ghichu = cungCap.ghichu;
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
        [HttpGet]
        public JsonResult DetailSupply(long id)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var info = from a in db.tbl_NhaCungCap
                           join b in db.tbl_PhanLoai_NhaCungCap on a.id_phanloai equals b.id
                           where a.id == id
                           select new
                           {
                               MaNCC = a.manhacungcap,
                               DiaChi = a.diachi_sonha + ", " + a.diachi_tenphuong + ", " + a.diachi_tenquan + ", " + a.diachi_tentinh,
                               TenNCC = a.tennhacungcap,
                               MaSoThue = a.masothue,
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
        public ActionResult Delete(int id)
        {
            bool result = false;
            using(HutechMartDbContext db = new HutechMartDbContext())
            {
                using(var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        var cungCap = db.tbl_NhaCungCap.FirstOrDefault(x => x.id == id);
                        db.tbl_NhaCungCap.Remove(cungCap);
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
        public ActionResult CreateGroupSupply(string tenphanloai, string ghichu)
        {
            bool result = false;
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        tbl_PhanLoai_NhaCungCap phanloai = new tbl_PhanLoai_NhaCungCap();
                        phanloai.tenphanloai = tenphanloai;
                        phanloai.ghichu = ghichu;
                        db.tbl_PhanLoai_NhaCungCap.Add(phanloai);
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
                var test = db.tbl_PhanLoai_NhaCungCap.Where(x => x.tenphanloai.StartsWith(search.ToLower())).Select(x => new { id = x.id, tenphanloai = x.tenphanloai }).ToList();
                return Json(test, JsonRequestBehavior.AllowGet);
            }
        }
    }
}