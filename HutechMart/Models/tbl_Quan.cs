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
    
    public partial class tbl_Quan
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tbl_Quan()
        {
            this.tbl_Phuong = new HashSet<tbl_Phuong>();
        }
    
        public int id { get; set; }
        public Nullable<int> id_tinh { get; set; }
        public string tenquan { get; set; }
        public string phanloai { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_Phuong> tbl_Phuong { get; set; }
        public virtual tbl_Tinh tbl_Tinh { get; set; }
    }
}