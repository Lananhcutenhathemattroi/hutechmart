function GetParam() {
    var year = $("#year").val();
    if (year == "") {
        Swal.fire({
            icon: 'error',
            title: 'Thất bại',
            text: 'Vui lòng nhập năm cần thống kê'
        })
    }
    else {
        createChart(year);
    }
}

function ExportExcel() {
    var chart = $("#chartTarget").getKendoChart();
    chart.saveAsPDF();
}

function createChart(year) {
    $("#chartTarget").kendoChart({
        dataSource: {
            transport: {
                read: {
                    url: "/Report/GetDataTargetSupllyByYear",
                    data: { year: year },
                    dataType: "json"
                }
            },
            sort: {
                field: "sotien",
                dir: "asc"
            }
        },
        title: {
            text: "Top 10 Nhà cung cấp nhập hàng nhiều"
        },
        legend: {
            visible: false
        },
        seriesDefaults: {
            type: "bar"
        },
        series:
            [{
                tooltip: {
                    template: kendo.template("#: value # VNĐ"),
                    visible: true,
                    padding: 10
                },
                field: "sotien",
                categoryField: "tennhacungcap",
                color: "#319fd2",
                gap: 1
            }],
        categoryAxis: {
            majorGridLines: {
                visible: false
            }
        },
        valueAxis: {
            line: {
                visible: false
            },
            labels: {
                template: kendo.template("Số tiền: #: value # VNĐ")
            }
        }
    });
}

$(document).ready(function () {
    var today = new Date();
    var year = today.getFullYear();

    createChart(year);
});
