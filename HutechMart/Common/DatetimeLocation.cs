using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HutechMart.Common
{
    public class DatetimeLocation
    {
        public static DateTime GetDate()
        {
            DateTime date1 = DateTime.UtcNow;

            TimeZoneInfo tz = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");

            DateTime date2 = TimeZoneInfo.ConvertTime(date1, tz);

            return date2;
        }
    }
}