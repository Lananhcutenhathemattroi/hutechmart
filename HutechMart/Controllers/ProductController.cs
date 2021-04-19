using HutechMart.Common;
using HutechMart.Models;
using PagedList;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HutechMart.Controllers
{
    public class ProductController : BaseController
    {
        // GET: Product
        public ActionResult Index(int page = 1, int pagesize = 10)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var sanPham = db.tbl_SanPham
                                .Include(x=>x.tbl_XuatXu)
                                .Include(x=>x.tbl_PhanLoai_SanPham)
                                .ToList();
                ViewBag.KhuyenMai = db.tbl_KhuyenMai.ToList();
                return View(sanPham.ToPagedList(page, pagesize));
            }
        }

        public ActionResult Create()
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                ViewBag.id_phanloai = new SelectList(db.tbl_PhanLoai_SanPham.ToList(), "id", "tenphanloai");
                ViewBag.id_xuatxu = new SelectList(db.tbl_XuatXu.ToList(), "id", "xuatxu");
                ViewBag.id_donvitinh = new SelectList(db.tbl_DonViTinh.ToList(), "id", "donvi");
                ViewBag.id_khuyenmai = new SelectList(db.tbl_KhuyenMai.ToList(), "id", "giamgia");
                return View();
            }
        }

        public ActionResult CreateGroupProduct()
        {
            return View();
        }

        public ActionResult CreateSaleProduct()
        {
            return View();
        }

        public ActionResult CreateOriginProduct()
        {
            return View();
        }
        [HttpGet]
        public JsonResult DetailProduct(long id)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var info = from a in db.tbl_SanPham
                           join b in db.tbl_XuatXu on a.id_xuatxu equals b.id into XuatXu
                           join c in db.tbl_PhanLoai_SanPham on a.id_phanloai equals c.id into PhanLoai
                           join d in db.tbl_DonViTinh on a.id_donvitinh equals d.id into DonVi
                           from e in XuatXu.DefaultIfEmpty()
                           from f in PhanLoai.DefaultIfEmpty()
                           from g in DonVi.DefaultIfEmpty()
                           where a.id == id
                           select new
                           {
                               MaSP = a.masanpham,
                               TenSP = a.tensanpham,
                               HinhAnh = a.hinhanh,
                               SL = a.soluong,
                               GiaBan = a.giaban,
                               GiaNhap = a.gianhap,
                               NgayTao = a.ngaytao,
                               GhiChu = a.ghichu,
                               XuatXu = e.xuatxu,
                               PhanLoai = f.tenphanloai,
                               DonViTinh = g.donvi,
                           };
                return Json(info.ToList(), JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Update(int id)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var sanPham = db.tbl_SanPham.FirstOrDefault(x => x.id == id);
                ViewBag.id_phanloai = new SelectList(db.tbl_PhanLoai_SanPham.ToList(), "id", "tenphanloai");
                ViewBag.id_xuatxu = new SelectList(db.tbl_XuatXu.ToList(), "id", "xuatxu");
                ViewBag.id_donvitinh = new SelectList(db.tbl_DonViTinh.ToList(), "id", "donvi");
                ViewBag.id_khuyenmai = new SelectList(db.tbl_KhuyenMai.ToList(), "id", "giamgia");
                return View(sanPham);
            }
        }

        [HttpPost]
        public ActionResult Create(tbl_SanPham sanPham, HttpPostedFileBase hinhAnh)
        {
            bool result = false;
            if (hinhAnh == null)
            {
                sanPham.hinhanh = "SanPham.png";
            }
            else
            {
                sanPham.hinhanh = GetImage(hinhAnh, sanPham.tensanpham);
            }

            sanPham.tinhtrang = true;
            sanPham.ngaytao = DatetimeLocation.GetDate();

            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        db.tbl_SanPham.Add(sanPham);
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
        public ActionResult Update(tbl_SanPham sanPham, HttpPostedFileBase hinhAnh)
        {
            bool result = false;
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var _sanPham = db.tbl_SanPham.FirstOrDefault(x => x.id == sanPham.id);
                if (hinhAnh != null)
                {
                    Random rd = new Random();
                    var thayAnh = sanPham.tensanpham + rd.Next(1, 10);
                    sanPham.hinhanh = GetImage(hinhAnh, thayAnh);
                }
                else
                {
                    sanPham.hinhanh = _sanPham.hinhanh;
                }
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        _sanPham.hinhanh = sanPham.hinhanh;
                        _sanPham.id_phanloai = sanPham.id_phanloai;
                        _sanPham.id_xuatxu = sanPham.id_xuatxu;
                        _sanPham.id_donvitinh = sanPham.id_donvitinh;
                        _sanPham.id_khuyenmai = sanPham.id_khuyenmai;
                        _sanPham.tensanpham = sanPham.tensanpham;
                        _sanPham.soluong = sanPham.soluong;
                        _sanPham.giaban = sanPham.giaban;
                        _sanPham.gianhap = sanPham.gianhap;
                        _sanPham.id_nguoicapnhat = sanPham.id_nguoicapnhat;
                        _sanPham.ngaycapnhat = DatetimeLocation.GetDate();
                        _sanPham.ghichu = sanPham.ghichu;
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

        public ActionResult Delete(int id)
        {
            bool result = false;
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        var sanPham = db.tbl_SanPham.FirstOrDefault(x => x.id == id);
                        db.tbl_SanPham.Remove(sanPham);
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
        public ActionResult CreateGroupProduct(string tenphanloai, string ghichu)
        {
            bool result = false;
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        tbl_PhanLoai_SanPham phanloai = new tbl_PhanLoai_SanPham();
                        phanloai.tenphanloai = tenphanloai;
                        phanloai.ghichu = ghichu;
                        db.tbl_PhanLoai_SanPham.Add(phanloai);
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
        public ActionResult CreateSaleProduct(int giamgia)
        {
            bool result = false;
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        tbl_KhuyenMai khuyenmai = new tbl_KhuyenMai();
                        khuyenmai.giamgia = giamgia;
                        db.tbl_KhuyenMai.Add(khuyenmai);
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
        public ActionResult CreateOriginProduct(string diadiem)
        {
            bool result = false;
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        tbl_XuatXu xuatxu = new tbl_XuatXu();
                        xuatxu.xuatxu = diadiem;
                        db.tbl_XuatXu.Add(xuatxu);
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
                var test = db.tbl_PhanLoai_SanPham.Where(x => x.tenphanloai.StartsWith(search.ToLower())).Select(x => new { id = x.id, tenphanloai = x.tenphanloai }).ToList();
                return Json(test, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult DanhSachXuatXu(string search)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var test = db.tbl_XuatXu.Where(x => x.xuatxu.StartsWith(search.ToLower())).Select(x => new { id = x.id, xuatxu = x.xuatxu }).ToList();
                return Json(test, JsonRequestBehavior.AllowGet);
            }
        }

        public string GetImage(HttpPostedFileBase HinhAnh, string tenNV)
        {
            string path = "";
            string fileName = tenNV + ".jpg";
            if (HinhAnh != null && HinhAnh.ContentLength > 0)
            {
                string extension = Path.GetExtension(HinhAnh.FileName);
                if (extension.Equals(".jpg") || extension.Equals(".png") || extension.Equals(".jpeg"))
                {
                    path = Path.Combine(Server.MapPath("~/Img/SanPham/"), fileName);
                    HinhAnh.SaveAs(path);
                }
            }
            return ConvertUnicde.Remove(fileName);
        }
    }
}