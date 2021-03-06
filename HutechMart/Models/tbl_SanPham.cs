//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace HutechMart.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbl_SanPham
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tbl_SanPham()
        {
            this.tbl_HoaDon_SanPham = new HashSet<tbl_HoaDon_SanPham>();
            this.tbl_PhieuNhap_SanPham = new HashSet<tbl_PhieuNhap_SanPham>();
            this.tbl_ThongKe_SanPham = new HashSet<tbl_ThongKe_SanPham>();
        }
    
        public int id { get; set; }
        public string masanpham { get; set; }
        public Nullable<int> id_cuahang { get; set; }
        public Nullable<int> id_phanloai { get; set; }
        public Nullable<int> id_xuatxu { get; set; }
        public Nullable<int> id_donvitinh { get; set; }
        public Nullable<int> id_khuyenmai { get; set; }
        public string tensanpham { get; set; }
        public string hinhanh { get; set; }
        public Nullable<int> soluong { get; set; }
        public Nullable<double> giaban { get; set; }
        public Nullable<double> gianhap { get; set; }
        public Nullable<int> id_nguoitao { get; set; }
        public Nullable<System.DateTime> ngaytao { get; set; }
        public Nullable<int> id_nguoicapnhat { get; set; }
        public Nullable<System.DateTime> ngaycapnhat { get; set; }
        public string ghichu { get; set; }
        public Nullable<bool> tinhtrang { get; set; }
    
        public virtual tbl_DonViTinh tbl_DonViTinh { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_HoaDon_SanPham> tbl_HoaDon_SanPham { get; set; }
        public virtual tbl_KhuyenMai tbl_KhuyenMai { get; set; }
        public virtual tbl_PhanLoai_SanPham tbl_PhanLoai_SanPham { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_PhieuNhap_SanPham> tbl_PhieuNhap_SanPham { get; set; }
        public virtual tbl_XuatXu tbl_XuatXu { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_ThongKe_SanPham> tbl_ThongKe_SanPham { get; set; }
    }
}
