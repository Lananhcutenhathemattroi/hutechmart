$(function () {
    $("#searching").on("keyup", function () {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var value = $(this).val().toLowerCase();
            $("#table_products tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        }
    });

    $("#phanLoai").on("keyup", function () {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var value = $(this).val().toLowerCase();
            $("#table_products tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        }
    });

    $("#xuatXu").on("keyup", function () {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var value = $(this).val().toLowerCase();
            $("#table_products tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        }
    });

    $("#phanLoai").autocomplete({
        source: function (request, response) {
            var search = $("#phanLoai").val()
            $.ajax({
                url: "/Product/DanhSachPhanLoai",
                type: "POST",
                dataType: "json",
                data: { search: search },
                success: function (data) {
                    response($.map(data, function (value) {
                        return { label: value.tenphanloai, value: value.tenphanloai }
                    }))
                }
            })
        }
    });

    $("#xuatXu").autocomplete({
        source: function (request, response) {
            var search = $("#xuatXu").val()
            $.ajax({
                url: "/Product/DanhSachXuatXu",
                type: "POST",
                dataType: "json",
                data: { search: search },
                success: function (data) {
                    response($.map(data, function (value) {
                        return { label: value.xuatxu, value: value.xuatxu }
                    }))
                }
            })
        }
    });
})

function ModalCreateOrigin() {
    $.ajax({
        type: 'GET',
        url: '/Product/CreateOriginProduct',
        success: function (result) {
            $("#createOrigin .modal-content").html(result);
        }
    })
}

function ModalCreateGroup() {
    $.ajax({
        type: 'GET',
        url: '/Product/CreateGroupProduct',
        success: function (result) {
            $("#createGroup .modal-content").html(result);
        }
    })
}

function ModalCreateSale() {
    $.ajax({
        type: 'GET',
        url: '/Product/CreateSaleProduct',
        success: function (result) {
            $("#createSale .modal-content").html(result);
        }
    })
}

function ModalCreate() {
    $.ajax({
        type: 'GET',
        url: '/Product/Create',
        success: function (result) {
            $("#create .modal-content").html(result);
        }
    })
}

function ModalUpdate(item) {
    var id = $(item).attr("data-id");
    $.ajax({
        type: 'GET',
        data: { id },
        url: '/Product/Update',
        success: function (result) {
            $("#update-" + id + " .modal-content").html(result);
        }
    })
}

function CreateOrigin() {
    $("#createloading").css({ "visibility": "visible" });
    var diadiem = $("#diadiem").val();
    $.ajax({
        type: 'POST',
        url: '/Product/CreateOriginProduct',
        data: { diadiem: diadiem },
        success: function (result) {
            if (result == true) {
                Swal.fire(
                    'Thành công',
                    '',
                    'success'
                )
                setTimeout(function () { location.href = "/Product/Index" }, 2000);
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Có lỗi xảy ra',
                })
            }
        }
    })
}

function CreateSale() {
    $("#createloading").css({ "visibility": "visible" });
    var giamgia = parseInt($("#giamgia").val());
    $.ajax({
        type: 'POST',
        url: '/Product/CreateSaleProduct',
        data: { giamgia: giamgia },
        success: function (result) {
            if (result == true) {
                Swal.fire(
                    'Thành công',
                    '',
                    'success'
                )
                setTimeout(function () { location.href = "/Product/Index" }, 2000);
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Có lỗi xảy ra',
                })
            }
        }
    })
}

function CreateGroup() {
    $("#createloading").css({ "visibility": "visible" });
    var tenphanloai = $("#tenphanloai").val();
    var ghichu = $("#ghichu").val();
    $.ajax({
        type: 'POST',
        url: '/Product/CreateGroupProduct',
        data: { tenphanloai: tenphanloai, ghichu: ghichu },
        success: function (result) {
            if (result == true) {
                Swal.fire(
                    'Thành công',
                    '',
                    'success'
                )
                setTimeout(function () { location.href = "/Product/Index" }, 2000);
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Có lỗi xảy ra',
                })
            }
        }
    })
}

function Create() {
    $("#createloading").css({ "visibility": "visible" });
    var formData = new FormData($("#formCreate")[0]);
    $.ajax({
        type: 'POST',
        url: '/Product/Create',
        data: formData,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result == true) {
                Swal.fire(
                    'Thành công',
                    'Hệ thống sẽ tự động chuyển đến danh sách sản phẩm',
                    'success'
                )
                setTimeout(function () { location.href = "/Product/Index" }, 1500);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Có lỗi xảy ra',
                })
            }
        }
    })
}

function Update() {
    $("#updateloading").css({ "visibility": "visible" });
    var formData = new FormData($("#formUpdate")[0]);
    $.ajax({
        type: 'POST',
        url: '/Product/Update',
        data: formData,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result == true) {
                Swal.fire(
                    'Thành công',
                    'Hệ thống sẽ tự động chuyển đến danh sách sản phẩm',
                    'success'
                )
                setTimeout(function () { location.href = "/Product/Index" }, 1500);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Có lỗi xảy ra',
                })
            }
        }
    })
}

function Delete(item) {
    Swal.fire({
        title: 'Xóa sản phẩm',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.isConfirmed) {
            var id = $(item).attr("data-id");
            $.ajax({
                type: 'POST',
                url: '/Product/Delete/',
                data: { id },
                success: function (result) {
                    if (result == true) {
                        Swal.fire(
                            'Thành công',
                            '',
                            'success'
                        )
                        $("#row_" + id).remove();
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Có lỗi xảy ra'
                        })
                    }
                }

            })
        }
    })
}


async function loadChiTiet(id) {
    await axios({
        url: '/Product/DetailProduct?id=' + id,
        method: 'GET',
    }).then(res => {
        renderChiTietKH(res.data);
    })
        .catch(err => { err })
}

function renderChiTietKH(arr) {
    console.log(arr);
    var noiDungChiTiet = '';
    for (var i = 0; i < arr.length; i++) {
        var MaSP = arr[i].MaSP;
        var TenSP = arr[i].TenSP;
        var HinhAnh = arr[i].HinhAnh;
        var SL = arr[i].SL;
        var GiaBan = arr[i].GiaBan;
        var GhiChu = arr[i].GhiChu;
        var XuatXu = arr[i].XuatXu;
        var PhanLoai = arr[i].PhanLoai;
        var DonViTinh = arr[i].DonViTinh;
        var newDate1;
        if (arr[i].NgayNhap != null) {
            var NgayNhap = arr[i].NgayNhap;
            var millisecond = parseInt(NgayNhap.replace("/Date(", "").replace(")/", ""));
            newDate1 = new Date(millisecond);
        }
        var newDate;
        if (arr[i].NgayTao != null) {
            var NgayTao = arr[i].NgayTao;
            var millisecond = parseInt(NgayTao.replace("/Date(", "").replace(")/", ""));
            newDate = new Date(millisecond);
        }
        noiDungChiTiet = `
                <div class="col-12 row">
                    <div class="col-2">
                        <p class="col-form-label text-left p-3"><img src="/Img/SanPham/${HinhAnh}" height="85" width="85"  /></p>
                    </div>
                    <div class="col-5">
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Mã sản phẩm</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${MaSP}</p>
                            </div>
                        </div>
                       <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Tên sản phẩm</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${TenSP}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Số lượng</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${SL}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Giá bán</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${GiaBan}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Phân loại</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${PhanLoai}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-5">
                       
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Ghi chú</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${GhiChu}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Xuất xứ</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${XuatXu}</p>
                            </div>
                        </div>
                        
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Đơn vị tính</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${DonViTinh}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Ngày tạo</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${newDate ? moment(newDate).format('DD/MM/YYYY') : null}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Ngày nhập</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${newDate1 ? moment(newDate1).format('DD/MM/YYYY') : null}</p>
                            </div>
                        </div>
                    </div>
                </div>
        `
    }
    document.querySelector('#chiTiet').innerHTML = noiDungChiTiet;
}
