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
    
    public partial class tbl_DoiTacGiaoHang
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tbl_DoiTacGiaoHang()
        {
            this.tbl_PhieuNhap = new HashSet<tbl_PhieuNhap>();
        }
    
        public int id { get; set; }
        public string madoitac { get; set; }
        public Nullable<int> id_phanloai { get; set; }
        public Nullable<int> id_cuahang { get; set; }
        public string diachi_tentinh { get; set; }
        public string diachi_tenquan { get; set; }
        public string diachi_tenphuong { get; set; }
        public string diachi_sonha { get; set; }
        public string tendoitac { get; set; }
        public string sodienthoai { get; set; }
        public string email { get; set; }
        public Nullable<int> id_nguoitao { get; set; }
        public Nullable<System.DateTime> ngaytao { get; set; }
        public Nullable<int> id_nguoicapnhat { get; set; }
        public Nullable<System.DateTime> ngaycapnhat { get; set; }
        public string ghichu { get; set; }
        public Nullable<bool> tinhtrang { get; set; }
    
        public virtual tbl_PhanLoai_GiaoHang tbl_PhanLoai_GiaoHang { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_PhieuNhap> tbl_PhieuNhap { get; set; }
    }
}