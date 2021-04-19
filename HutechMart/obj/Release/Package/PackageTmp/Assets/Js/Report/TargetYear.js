function GetParam() {
    var getYear = $("#year").val();
    if (getYear == "") {
        Swal.fire({
            icon: 'error',
            title: 'Thất bại',
            text: 'Vui lòng nhập năm cần thống kê'
        })
    }
    else {
        GetDataByYear(getYear)
    }
}

function ExportExcel() {
    var chart = $("#chartByYear").getKendoChart();
    chart.saveAsPDF();
}

function GetDataByYear(year) {
    $.ajax({
        type: "GET",
        url: "/Report/GetDataReportTargetByYear",
        data: { year: year },
        success: function (result) {
            if (result.length > 0) {
                $("#chartByYear").data("kendoChart").dataSource.read();
                $("#chartByYear").data("kendoChart").setOptions({ theme: "uniform" });

                for (var i = 0; i < result.length; i++) {
                    var value = result[i].value;
                    var getDate = result[i].date;
                    var date = new Date(parseInt(getDate.substring(6, getDate.length - 2)));

                    //if (getDate.substring(0, 6) == "/Date(") {
                    //    var dt = new Date(parseInt(getDate.substring(6, getDate.length - 2)));
                    //}

                    $("#chartByYear").data("kendoChart").dataSource.add({ value: value, date: date });
                }
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Thất bại',
                    text: 'Không có dữ liệu của năm này'
                })
            }
        }
    })
}

function createChart() {
    $("#chartByYear").kendoChart({
        series: [{
            tooltip: {
                template: kendo.template("Doanh số: #: value # VNĐ"),
                visible: true,
                padding: 10
            },
            type: "column",
            field: "value",
            categoryField: "date"
        }],
        categoryAxis: {
            baseUnit: "months",
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
    var year = today.getFullYear()

    GetDataByYear(year)

    createChart();
});