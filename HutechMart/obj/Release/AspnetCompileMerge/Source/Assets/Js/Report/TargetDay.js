function GetParam() {
    var getTime = $("#time").val();

    var arrDate = getTime.split("-");

    var getYear = arrDate[0];
    var getMonth = arrDate[1];
    var getDate = arrDate[2];

    if (getTime != "") {
        GetDataByDay(getYear, getMonth, getDate)
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Thất bại',
            text: 'Nhập ngày cần thống kê'
        })
    }
}

function ExportExcel() {
    var chart = $("#chartByDay").getKendoChart();
    chart.saveAsPDF();
}

function GetDataByDay(year, month, day) {
    $.ajax({
        type: "GET",
        url: "/Report/GetDataReportTargetByDay",
        data: { year: year, month: month, day: day },
        success: function (result) {
            if (result.length > 0) {
                $("#chartByDay").data("kendoChart").dataSource.read();
                $("#chartByDay").data("kendoChart").setOptions({ theme: "uniform" });

                for (var i = 0; i < result.length; i++) {
                    var value = result[i].value;
                    var getDate = result[i].date;

                    var date = new Date(parseInt(getDate.substring(6, getDate.length - 2)));

                    $("#chartByDay").data("kendoChart").dataSource.add({ value: value, date: date });
                }
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Thất bại',
                    text: 'Không có dữ liệu của ngày này'
                })
            }
        }
    })
}

function createChart() {
    $("#chartByDay").kendoChart({
        series: [{
            tooltip: {
                template: kendo.template("Doanh số: #: value # VNĐ"),
                visible: true,
                padding: 10
            },
            aggregate: "sum",
            type: "column",
            field: "value",
            categoryField: "date"
        }],
        categoryAxis: {
            baseUnit: "hours",
            majorGridLines: {
                visible: false
            }
        },
        valueAxis: {
            labels: {
                template: kendo.template("#: value #")
            },
            line: {
                visible: true
            }
        }
    });
}

$(document).ready(function () {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1
    var year = today.getFullYear()

    GetDataByDay(year, month, day);

    createChart();
});
