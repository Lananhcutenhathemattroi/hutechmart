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
    
    public partial class tbl_Phuong
    {
        public int id { get; set; }
        public Nullable<int> id_quan { get; set; }
        public string tenphuong { get; set; }
        public string phanloai { get; set; }
    
        public virtual tbl_Quan tbl_Quan { get; set; }
    }
}
