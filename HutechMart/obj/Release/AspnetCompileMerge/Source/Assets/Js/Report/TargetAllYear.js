function GetDataByAllYear() {
    $.ajax({
        type: "GET",
        url: "/Report/GetDataReportTargetByAllYear",
        success: function (result) {
            $("#chartByAllYear").data("kendoChart").setOptions({ theme: "uniform" });

            for (var i = 0; i < result.length; i++) {
                var value = result[i].value;
                var getDate = result[i].date;
                var date = new Date(parseInt(getDate.substring(6, getDate.length - 2)));

                //if (getDate.substring(0, 6) == "/Date(") {
                //    var date = new Date(parseInt(getDate.substring(6, getDate.length - 2)));
                //}
                $("#chartByAllYear").data("kendoChart").dataSource.add({ value: value, date: date });
            }
        }
    })
}

function ExportExcel() {
    var chart = $("#chartByAllYear").getKendoChart();
    chart.saveAsPDF();
}

function createChart() {
    $("#chartByAllYear").kendoChart({
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
            baseUnit: "years",
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
    GetDataByAllYear();
    createChart();
});