using HutechMart.Common;
using HutechMart.Models;
using PagedList;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HutechMart.Controllers
{
    public class EmployeesController : BaseController
    {
        // GET: Employees
        public ActionResult Index(int page = 1, int pagesize = 10)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var nhanVien = db.tbl_NhanVien.Include(x=>x.tbl_ChucVu).ToList();
                ViewBag.ChucVu = db.tbl_ChucVu.ToList();
                return View(nhanVien.ToPagedList(page, pagesize));
            }
        }

        public ActionResult Create()
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                ViewBag.id_chucvu = new SelectList(db.tbl_ChucVu.ToList(), "id", "chucvu");
                return View();
            }
        }

        public ActionResult CreateGroupEmployees()
        {
            return View();
        }

        public ActionResult Update(int id)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var nhanVien = db.tbl_NhanVien.FirstOrDefault(x => x.id == id);
                ViewBag.id_chucvu = new SelectList(db.tbl_ChucVu.ToList(), "id", "chucvu");
                return View(nhanVien);
            }
        }

        public ActionResult InforEmployee(int id)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var nhanVien = db.tbl_NhanVien
                                .Include(x => x.tbl_ChucVu)
                                .Include(x => x.tbl_CuaHang)
                                .Include(x => x.tbl_DangNhap)
                                .FirstOrDefault(x => x.id == id);
                return View(nhanVien);
            }
        }

        [HttpPost]
        public ActionResult CreateGroupEmployees(string chucVu)
        {
            bool result = false;
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        tbl_ChucVu _chucVu = new tbl_ChucVu();
                        _chucVu.chucvu = chucVu;
                        db.tbl_ChucVu.Add(_chucVu);
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
        public ActionResult Create(tbl_NhanVien nhanVien, HttpPostedFileBase hinhAnh)
        {
            bool result = false;
            if (hinhAnh == null)
            {
                nhanVien.hinhanh = "NguoiDung.jpg";
            }
            else
            {
                nhanVien.hinhanh = GetImage(hinhAnh, nhanVien.tennhanvien);
            }

            nhanVien.tinhtrang = true;
            nhanVien.ngaytao = DatetimeLocation.GetDate();

            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        db.tbl_NhanVien.Add(nhanVien);
                        db.SaveChanges();

                        var dangNhap = new tbl_DangNhap();
                        dangNhap.id_nhanvien = nhanVien.id;
                        dangNhap.taikhoan = nhanVien.sodienthoai;
                        dangNhap.matkhau = nhanVien.sodienthoai;
                        if (nhanVien.id_chucvu != 1)
                            dangNhap.loaitaikhoan = true;
                        else
                            dangNhap.loaitaikhoan = false;

                        db.tbl_DangNhap.Add(dangNhap);
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
        public ActionResult Update(tbl_NhanVien nhanVien, HttpPostedFileBase hinhAnh)
        {
            bool result = false;
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var _nhanVien = db.tbl_NhanVien.FirstOrDefault(x => x.id == nhanVien.id);
                if (hinhAnh != null)
                {
                    Random rd = new Random();
                    var thayAnh = nhanVien.tennhanvien + rd.Next(1, 10);
                    nhanVien.hinhanh = GetImage(hinhAnh, thayAnh);
                }
                else
                {
                    nhanVien.hinhanh = _nhanVien.hinhanh;
                }
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        _nhanVien.hinhanh = nhanVien.hinhanh;
                        _nhanVien.id_cuahang = nhanVien.id_cuahang;
                        _nhanVien.id_chucvu = nhanVien.id_chucvu;
                        _nhanVien.tennhanvien = nhanVien.tennhanvien;
                        _nhanVien.gioitinh = nhanVien.gioitinh;
                        _nhanVien.ngaysinh = nhanVien.ngaysinh;
                        _nhanVien.sochungminh = nhanVien.sochungminh;
                        _nhanVien.sodienthoai = nhanVien.sodienthoai;
                        _nhanVien.email = nhanVien.email;
                        _nhanVien.facebook = nhanVien.facebook;
                        _nhanVien.diachi_tentinh = nhanVien.diachi_tentinh;
                        _nhanVien.diachi_tenquan = nhanVien.diachi_tenquan;
                        _nhanVien.diachi_tenphuong = nhanVien.diachi_tenphuong;
                        _nhanVien.diachi_sonha = nhanVien.diachi_sonha;
                        _nhanVien.ghichu = nhanVien.ghichu;
                        _nhanVien.id_nguoicapnhat = nhanVien.id_nguoicapnhat;
                        _nhanVien.ngaycapnhat = DateTime.Now;
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
                        var nhanVien = db.tbl_NhanVien.FirstOrDefault(x => x.id == id);
                        db.tbl_NhanVien.Remove(nhanVien);
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

        public ActionResult InfoUpdate(tbl_NhanVien nhanVien)
        {
            bool result = false;
            using(HutechMartDbContext db = new HutechMartDbContext())
            {
                using(var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        var _nhanVien = db.tbl_NhanVien.Find(nhanVien.id);
                        _nhanVien.sodienthoai = nhanVien.sodienthoai;
                        _nhanVien.facebook = nhanVien.facebook;
                        _nhanVien.email = nhanVien.email;
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
        public JsonResult ChiTietNV(long id)
        {
            HutechMartDbContext db = new HutechMartDbContext();
            var detail = from a in db.tbl_NhanVien
                         join b in db.tbl_ChucVu on a.id_chucvu equals b.id
                         where a.id == id
                         select new
                         {
                             HinhANh = a.hinhanh,
                             MaNV = a.manhanvien,
                             TenNV = a.tennhanvien,
                             GT = a.gioitinh,
                             NgaySinh = a.ngaysinh,
                             SDT = a.sodienthoai,
                             ChucVu = b.chucvu,
                             CMND = a.sochungminh,
                             DiaChi = a.diachi_sonha + " " + a.diachi_tenphuong + " " + a.diachi_tenquan + " " + a.diachi_tentinh,
                             Email = a.email,
                             Fb = a.facebook,
                             TinhTrang = a.tinhtrang == true ? "Hoạt động" : "Không hoạt động"
                         };
            return Json(detail, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult ChangePassword(int id, string MatKhauCu, string MatKhauMoi)
        {
            bool result = false;
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    var thongTin = db.tbl_DangNhap.FirstOrDefault(x => x.id_nhanvien == id);
                    if (thongTin.matkhau == MatKhauCu)
                    {
                        try
                        {
                            thongTin.matkhau = MatKhauMoi;
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
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DanhSachPhanLoai(string search)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var test = db.tbl_ChucVu.Where(x => x.chucvu.StartsWith(search.ToLower())).Select(x => new { id = x.id, chucvu = x.chucvu }).ToList();
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
                    path = Path.Combine(Server.MapPath("~/Img/NhanVien/"), fileName);
                    HinhAnh.SaveAs(path);
                }
            }
            return ConvertUnicde.Remove(fileName);
        }
    }
}