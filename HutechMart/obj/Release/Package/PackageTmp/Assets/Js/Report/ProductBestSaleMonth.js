function GetParam() {
    var getTime = $("#time").val();

    var arrDate = getTime.split("-");

    var getYear = arrDate[0];
    var getMonth = arrDate[1];

    if (getTime != "") {
        createChartQuantity(getYear, getMonth);
        createChartTarget(getYear, getMonth);
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
    var chart = $("#chartQuantityBestSale").getKendoChart();

    chart.saveAsPDF();
}

function createChartTarget(year, month) {
    $("#chartTargetBestSale").kendoChart({
        dataSource: {
            transport: {
                read: {
                    url: "/Report/GetDataTargetProductBestSale",
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
            text: "Top 10 Sản phẩm có doanh thu cao"
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
                categoryField: "sanpham",
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

function createChartQuantity(year, month) {
    $("#chartQuantityBestSale").kendoChart({
        dataSource: {
            transport: {
                read: {
                    url: "/Report/GetDataQuantityProductBestSale",
                    data: { year: year, month: month },
                    dataType: "json"
                }
            },
            sort: {
                field: "soluong",
                dir: "asc"
            }
        },
        title: {
            text: "Top 10 Sản phẩm bán chạy"
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
                    template: kendo.template("#: value # Sản phẩm"),
                    visible: true,
                    padding: 10
                },
                field: "soluong",
                categoryField: "sanpham",
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
                template: kendo.template("Số lượng: #: value #")
            }
        }
    });
}


$(document).ready(function () {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;

    createChartQuantity(year, month);
    createChartTarget(year, month);
});

