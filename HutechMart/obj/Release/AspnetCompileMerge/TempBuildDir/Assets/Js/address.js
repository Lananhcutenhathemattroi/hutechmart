
$(function () {
    var id_tinh
    var id_quan
    $("#diachi_tentinh").autocomplete({
        source: function (request, response) {
            var search = $("#diachi_tentinh").val()
            $.ajax({
                url: "/Address/DanhSachTinh",
                type: "POST",
                dataType: "json",
                data: { search: search },
                success: function (data) {
                    response($.map(data, function (value) {
                        id_tinh = value.id
                        return { label: value.tentinh, value: value.tentinh }
                    }))
                }
            })
        }
    });

    $("#diachi_tenquan").autocomplete({
        source: function (request, response) {
            var search = $("#diachi_tenquan").val()
            var tentinh = $("#diachi_tentinh").val()
            if (tentinh != "") {
                $.ajax({
                    url: "/Address/DanhSachQuan",
                    type: "POST",
                    dataType: "json",
                    data: { search: search, id: id_tinh },
                    success: function (data) {
                        response($.map(data, function (value) {
                            id_quan = value.id
                            return { label: value.tenquan, value: value.tenquan }
                        }))
                    }
                })
            }
        }
    });

    $("#diachi_tenphuong").autocomplete({
        source: function (request, response) {
            var search = $("#diachi_tenphuong").val()
            var tenquan = $("#diachi_tenquan").val()
            if (tenquan != "") {
                $.ajax({
                    url: "/Address/DanhSachPhuong",
                    type: "POST",
                    dataType: "json",
                    data: { search: search, id: id_quan },
                    success: function (data) {
                        response($.map(data, function (value) {
                            return { label: value, value: value }
                        }))
                    }
                })
            }
        }
    });

})


