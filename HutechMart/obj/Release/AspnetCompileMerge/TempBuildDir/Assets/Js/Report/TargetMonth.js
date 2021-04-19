function GetParam() {
    var getTime = $("#time").val();

    var arrDate = getTime.split("-");

    var getYear = arrDate[0];
    var getMonth = arrDate[1];

    if (getTime != "") {
        GetDataByMonth(getYear, getMonth)
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Thất bại',
            text: 'Nhập tháng năm cần thống kê'
        })
    }
}

function ExportExcel() {
    var chart = $("#chartByMonth").getKendoChart();
    chart.saveAsPDF();
}

function GetDataByMonth(year, month) {
    $.ajax({
        type: "GET",
        url: "/Report/GetDataReportTargetByMonth",
        data: { year: year, month: month },
        success: function (result) {
            if (result.length > 0) {
                $("#chartByMonth").data("kendoChart").dataSource.read();
                $("#chartByMonth").data("kendoChart").setOptions({ theme: "uniform" });

                for (var i = 0; i < result.length; i++) {
                    var value = result[i].value;
                    var getDate = result[i].date;

                    var date = new Date(parseInt(getDate.substring(6, getDate.length - 2)));

                    $("#chartByMonth").data("kendoChart").dataSource.add({ value: value, date: date });
                }
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Thất bại',
                    text: 'Không có dữ liệu của tháng này'
                })
            }
        }
    })
}

function createChart() {
    $("#chartByMonth").kendoChart({
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
            baseUnit: "days",
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
    var month = today.getMonth() + 1
    var year = today.getFullYear()

    GetDataByMonth(year, month);

    createChart();
});

$("#example").bind("kendo:skinChange", createChart);
$(".box-col").bind("change", refresh);

function refresh() {
    var chart = $("#chartByMonth").data("kendoChart"),
        categoryAxis = chart.options.categoryAxis,
        baseUnitInputs = $("input:radio[name=baseUnit]");
    categoryAxis.baseUnit = baseUnitInputs.filter(":checked").val();

    chart.refresh();
}