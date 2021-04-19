using HutechMart.Common;
using HutechMart.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HutechMart.Controllers
{
    public class ReportController : BaseController
    {
        // GET: Report
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ReportTargetDay()
        {
            return View();
        }

        public ActionResult ReportTargetYear()
        {
            return View();
        }

        public ActionResult ReportTargetMonth()
        {
            return View();
        }

        public ActionResult ReportTargetAllYear()
        {
            return View();
        }

        public ActionResult ReportProductsBestSaleMonth()
        {
            return View();
        }

        public ActionResult ReportProductsBadSaleMonth()
        {
            return View();
        }

        public ActionResult ReportTargetCustomerByMonth()
        {
            return View();
        }

        public ActionResult ReportTargetCustomerByYear()
        {
            return View();
        }

        public ActionResult ReportTargetSupplyByMonth()
        {
            return View();
        }

        public ActionResult ReportTargetSupplyByYear()
        {
            return View();
        }

        public ActionResult GetDataReportTargetByDay(int year, int month, int day)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var result = db.tbl_HoaDon
                                .Where(x =>x.ngaylap.Day == day && x.ngaylap.Month == month && x.ngaylap.Year == year)
                                .Select(x => new { value = x.tongtien, date = x.ngaylap }).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetDataReportTargetByMonth(int year, int month)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var result = db.tbl_HoaDon
                                .Where(x => x.ngaylap.Month == month && x.ngaylap.Year == year)
                                .Select(x => new { value = x.tongtien, date = x.ngaylap }).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetDataReportTargetByYear(int year)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var datetime = DatetimeLocation.GetDate();
                var result = db.tbl_HoaDon
                                .Where(x => x.ngaylap.Year == year)
                                .Select(x => new { value = x.tongtien, date = x.ngaylap }).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetDataReportTargetByAllYear()
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var result = db.tbl_HoaDon
                                .Select(x => new { value = x.tongtien, date = x.ngaylap }).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetDataTargetProductBestSale(int year, int month)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var result = db.tbl_HoaDon_SanPham
                               .Include(x => x.tbl_SanPham)
                               .Where(x => x.tbl_HoaDon.ngaylap.Year == year && x.tbl_HoaDon.ngaylap.Month == month)
                               .GroupBy(x => x.id_sanpham)
                               .Select(x => new
                               {
                                   sanpham = x.FirstOrDefault(s => s.tbl_SanPham.id == x.Key).tbl_SanPham.tensanpham,
                                   sotien = x.Sum(s => s.thanhtien)
                               })
                               .OrderByDescending(x => x.sotien)
                               .Take(10).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetDataTargetProductBadSale(int year, int month)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var result = db.tbl_HoaDon_SanPham
                               .Include(x => x.tbl_SanPham)
                               .Where(x => x.tbl_HoaDon.ngaylap.Year == year && x.tbl_HoaDon.ngaylap.Month == month)
                               .GroupBy(x => x.id_sanpham)
                               .Select(x => new
                               {
                                   sanpham = x.FirstOrDefault(s => s.tbl_SanPham.id == x.Key).tbl_SanPham.tensanpham,
                                   sotien = x.Sum(s => s.thanhtien)
                               })
                               .OrderBy(x => x.sotien)
                               .Take(10).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetDataQuantityProductBestSale(int year, int month)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var result = db.tbl_HoaDon_SanPham
                                .Include(x => x.tbl_SanPham)
                                .Where(x => x.tbl_HoaDon.ngaylap.Year == year && x.tbl_HoaDon.ngaylap.Month == month)
                                .GroupBy(x => x.id_sanpham)
                                .Select(x => new
                                {
                                    sanpham = x.FirstOrDefault(s => s.tbl_SanPham.id == x.Key).tbl_SanPham.tensanpham,
                                    soluong = x.Sum(s => s.soluong)
                                })
                                .OrderByDescending(x => x.soluong)
                                .Take(10).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetDataQuantityProductBadSale(int year, int month)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var result = db.tbl_HoaDon_SanPham
                                .Include(x => x.tbl_SanPham)
                                .Where(x => x.tbl_HoaDon.ngaylap.Year == year && x.tbl_HoaDon.ngaylap.Month == month)
                                .GroupBy(x => x.id_sanpham)
                                .Select(x => new
                                {
                                    sanpham = x.FirstOrDefault(s => s.tbl_SanPham.id == x.Key).tbl_SanPham.tensanpham,
                                    soluong = x.Sum(s => s.soluong)
                                })
                                .OrderBy(x => x.soluong)
                                .Take(10).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetDataTargetCustomerByMonth(int year, int month)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var result = db.tbl_HoaDon
                               .Include(x => x.tbl_KhachHang)
                               .Where(x => x.ngaylap.Year == year && x.ngaylap.Month == month)
                               .GroupBy(x => x.id_khachhang)
                               .Select(x => new
                               {
                                   tenkhachhang = x.FirstOrDefault(s => s.tbl_KhachHang.id == x.Key).tbl_KhachHang.tenkhachhang,
                                   sotien = x.Sum(s => s.tongtien)
                               })
                               .OrderByDescending(x => x.sotien)
                               .Take(10).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetDataTargetCustomerByYear(int year)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var result = db.tbl_HoaDon
                               .Include(x => x.tbl_KhachHang)
                               .Where(x => x.ngaylap.Year == year)
                               .GroupBy(x => x.id_khachhang)
                               .Select(x => new
                               {
                                   tenkhachhang = x.FirstOrDefault(s => s.tbl_KhachHang.id == x.Key).tbl_KhachHang.tenkhachhang,
                                   sotien = x.Sum(s => s.tongtien)
                               })
                               .OrderByDescending(x => x.sotien)
                               .Take(10).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetDataTargetSupplyByMonth(int year, int month)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var result = db.tbl_PhieuNhap
                               .Include(x => x.tbl_NhaCungCap)
                               .Where(x => x.ngaylap.Year == year && x.ngaylap.Month == month)
                               .GroupBy(x => x.id_nhacungcap)
                               .Select(x => new
                               {
                                   tennhacungcap = x.FirstOrDefault(s => s.tbl_NhaCungCap.id == x.Key).tbl_NhaCungCap.tennhacungcap,
                                   sotien = x.Sum(s => s.tongtien)
                               })
                               .OrderByDescending(x => x.sotien)
                               .Take(10).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GetDataTargetSupllyByYear(int year)
        {
            using (HutechMartDbContext db = new HutechMartDbContext())
            {
                var result = db.tbl_PhieuNhap
                                .Include(x => x.tbl_NhaCungCap)
                                .Where(x => x.ngaylap.Year == year)
                                .GroupBy(x => x.id_nhacungcap)
                                .Select(x => new
                                {
                                    tennhacungcap = x.FirstOrDefault(s => s.tbl_NhaCungCap.id == x.Key).tbl_NhaCungCap.tennhacungcap,
                                    sotien = x.Sum(s => s.tongtien)
                                })
                                .OrderByDescending(x => x.sotien)
                                .Take(10).ToList();
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

    }
}