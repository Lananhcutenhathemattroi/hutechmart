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
    
    public partial class tbl_CuaHang
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tbl_CuaHang()
        {
            this.tbl_NhanVien = new HashSet<tbl_NhanVien>();
        }
    
        public int id { get; set; }
        public string macuahang { get; set; }
        public string diachi_tentinh { get; set; }
        public string diachi_tenquan { get; set; }
        public string diachi_tenphuong { get; set; }
        public string diachi_sonha { get; set; }
        public string tencuahang { get; set; }
        public string sodienthoai { get; set; }
        public string ghichu { get; set; }
        public Nullable<bool> tinhtrang { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_NhanVien> tbl_NhanVien { get; set; }
    }
}
