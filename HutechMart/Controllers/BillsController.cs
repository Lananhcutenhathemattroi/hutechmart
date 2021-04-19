using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HutechMart.Models;
using System.Data.Entity;
using System.Globalization;

namespace HutechMart.Controllers
{
    public class BillsController : Controller
    {
        HutechMartDbContext db = new HutechMartDbContext();
        // GET: Bills
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult ChiTietHoaDon(long id)
        {
            var dbNe = from a in db.tbl_HoaDon_SanPham
                       join b in db.tbl_SanPham on a.id_sanpham equals b.id
                       where a.id_hoadon == id
                       select new { MaSP = b.masanpham, TenSP = b.tensanpham, SoLuong = a.soluong, GiaBan = a.giaban, ThanhTien = a.giaban * a.soluong };
            return Json(dbNe, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult ThongTinHoaDon(long id)
        {
            var dbNe = from a in db.tbl_HoaDon
                       join b in db.tbl_HoaDon_SanPham on a.id equals b.id_hoadon
                       join c in db.tbl_KhachHang on a.id_khachhang equals c.id into KHne
                       join d in db.tbl_NhanVien on a.id_nhanvien equals d.id into NVne
                       join e in db.tbl_Voucher on a.id_voucher equals e.id into VCne
                       join f in db.tbl_VAT on a.id_vat equals f.id into VATne
                       where a.id == id
                       from g in KHne.DefaultIfEmpty()
                       from h in NVne.DefaultIfEmpty()
                       from j in VCne.DefaultIfEmpty()
                       from k in VATne.DefaultIfEmpty()
                       group a by new
                       { a.mahoadon, a.ngaylap, g.tenkhachhang, h.tennhanvien, k.thuevat, j.giamgia, a.tongtien } into w
                       select new
                       {
                           MaHD = w.Key.mahoadon,
                           NgayLap = w.Key.ngaylap,
                           TenKH = w.Key.tenkhachhang,
                           TenNV = w.Key.tennhanvien,
                           VAT = w.Key.thuevat,
                           Voucher = w.Key.giamgia,
                           TongTien = w.Key.tongtien,
                           KhachTra = w.Key.giamgia == null ? w.Key.tongtien : w.Key.tongtien - w.Key.giamgia

                       };
            return Json(dbNe, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult CountBill()
        {
            var count = db.tbl_HoaDon.Count();
            return Json(count, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetBill(int Page, string Search, DateTime dateStart, DateTime dateEnd)
        {
            int Skip = 0, SizePage = 10;
            if (Page == 1) Skip = 0;
            else Skip = (Page * SizePage) - SizePage;
            DateTime TimeNe = DateTime.ParseExact("1900-01-01", "yyyy-MM-dd", null);
            var bill = (from a in db.tbl_HoaDon
                        join b in db.tbl_HoaDon_SanPham on a.id equals b.id_hoadon
                        join c in db.tbl_KhachHang on a.id_khachhang equals c.id into TenKH
                        join f in db.tbl_KhuyenMai on a.id_voucher equals f.id into GiamGia
                        from g in GiamGia.DefaultIfEmpty()
                        from e in TenKH.DefaultIfEmpty()
                        where ((Search != null && (a.mahoadon.ToLower().Contains(Search.ToLower()) || e.tenkhachhang.ToLower().Contains(Search.ToLower()))) || Search == null)
                        && ((dateStart == TimeNe && dateEnd == TimeNe) || ((dateStart != null && dateEnd != null) && DbFunctions.TruncateTime(a.ngaylap) >= dateStart.Date && DbFunctions.TruncateTime(a.ngaylap) <= dateEnd.Date))
                        group a by
                        new
                        {
                            a.mahoadon,
                            a.id,
                            a.ngaylap,
                            a.tongtien,
                            e.tenkhachhang,
                            g.giamgia
                        } into d
                        orderby d.Key.ngaylap descending
                        select new
                        {
                            idHoaDon = d.Key.id,
                            MaHD = d.Key.mahoadon,
                            ThoiGian = d.Key.ngaylap,
                            TenKH = d.Key.tenkhachhang,
                            TongTien = d.Key.tongtien,
                            KhuyenMai = d.Key.giamgia,
                            KhachTra = d.Key.giamgia != null ? d.Key.tongtien - d.Key.giamgia : d.Key.tongtien,
                        }).Skip(Skip).Take(SizePage);
            return Json(bill, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult XoaHoaDon(long MaHD)
        {
            var hd_sp = from a in db.tbl_HoaDon
                        join b in db.tbl_HoaDon_SanPham on a.id equals b.id_hoadon
                        where a.id == MaHD
                        select new { a, b };
            foreach (var hd in hd_sp)
            {
                db.tbl_HoaDon_SanPham.Remove(hd.b);
                db.tbl_HoaDon.Remove(hd.a);
            }
            db.SaveChanges();
            return Json(null, JsonRequestBehavior.AllowGet);
        }
    }
}