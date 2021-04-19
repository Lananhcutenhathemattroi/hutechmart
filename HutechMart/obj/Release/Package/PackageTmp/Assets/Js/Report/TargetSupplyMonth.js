function GetParam() {
    var getTime = $("#time").val();

    var arrDate = getTime.split("-");

    var getYear = arrDate[0];
    var getMonth = arrDate[1];

    if (getTime != "") {
        createChart(getYear, getMonth);
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
    var chart = $("#chartTarget").getKendoChart();
    chart.saveAsPDF();
}

function createChart(year, month) {
    $("#chartTarget").kendoChart({
        dataSource: {
            transport: {
                read: {
                    url: "/Report/GetDataTargetSupplyByMonth",
                    data: { year: year, month: month },
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
    var month = today.getMonth() + 1;

    createChart(year, month);
});
