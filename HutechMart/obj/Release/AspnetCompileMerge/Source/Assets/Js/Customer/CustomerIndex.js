$(function () {
    $("#searching").on("keyup", function () {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var value = $(this).val().toLowerCase();
            $("#table_customer tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        }
    });

    $("#phanLoai").on("keyup", function () {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var value = $(this).val().toLowerCase();
            $("#table_customer tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        }
    });

    $("#khuVuc").on("keyup", function () {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var value = $(this).val().toLowerCase();
            $("#table_customer tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        }
    });

    $("#phanLoai").autocomplete({
        source: function (request, response) {
            var search = $("#phanLoai").val()
            $.ajax({
                url: "/Customer/DanhSachPhanLoai",
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

    $("#khuVuc").autocomplete({
        source: function (request, response) {
            var search = $("#khuVuc").val()
            $.ajax({
                url: "/Address/DanhSachTinh",
                type: "POST",
                dataType: "json",
                data: { search: search },
                success: function (data) {
                    response($.map(data, function (value) {
                        return { label: value.tentinh, value: value.tentinh }
                    }))
                }
            })
        }
    });
})

function ModalCreate() {
    $.ajax({
        type: 'GET',
        url: '/Customer/Create',
        success: function (result) {
            $("#create .modal-content").html(result);
        }
    })
}

function ModalCreateGroup() {
    $.ajax({
        type: 'GET',
        url: '/Customer/CreateGroupCustomer',
        success: function (result) {
            $("#createGroup .modal-content").html(result);
        }
    })
}

function ModalUpdate(item) {
    var id = $(item).attr("data-id");
    $.ajax({
        type: 'GET',
        data: { id },
        url: '/Customer/Update',
        success: function (result) {
            $("#update-" + id + " .modal-content").html(result);
        }
    })
}

function Create() {
    $("#createloading").css({ "visibility": "visible" });
    var formData = new FormData($("#formCreate")[0]);
    $.ajax({
        type: 'POST',
        url: '/Customer/Create',
        data: formData,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result == true) {
                Swal.fire(
                    'Thành công',
                    'Hệ thống sẽ tự động chuyển đến danh sách nhân viên',
                    'success'
                )
                setTimeout(function () { location.href = "/Customer/Index" }, 2000);
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

function CreateGroup() {
    $("#createloading").css({ "visibility": "visible" });
    let tenphanloai = $("#tenphanloai").val();
    let ghichu = $("#ghichu").val();
    $.ajax({
        type: 'POST',
        url: '/Customer/CreateGroupCustomer',
        data: { tenphanloai: tenphanloai, ghichu: ghichu },
        success: function (result) {
            if (result == true) {
                Swal.fire(
                    'Thành công',
                    '',
                    'success'
                )
                setTimeout(function () { location.href = "/Customer/Index" }, 1500);
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

function Update() {
    $("#createloading").css({ "visibility": "visible" });
    var formData = new FormData($("#formUpdate")[0]);
    $.ajax({
        type: 'POST',
        url: '/Customer/Update',
        data: formData,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result == true) {
                Swal.fire(
                    'Thành công',
                    'Hệ thống sẽ tự động chuyển đến danh sách khách hàng',
                    'success'
                )
                setTimeout(function () { location.href = "/Customer/Index" }, 1500);
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
        title: 'Xóa khách hàng',
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
                data: { id },
                url: '/Customer/Delete',
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
        url: '/Customer/DetailCustomer?id=' + id,
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
        var MaKH = arr[i].MaKH;
        var DiaChi = arr[i].DiaChi;
        var TenKH = arr[i].TenKH;
        var GT = arr[i].GT;
        var SDT = arr[i].SDT;
        var CMND = arr[i].CMND;
        var Email = arr[i].Email;
        var FB = arr[i].FB;
        var TinhTrang = arr[i].TinhTrang;
        var NguoiTao = arr[i].NguoiTao;
        var newDate;
        if (arr[i].NgaySinh != null) {
            var NgaySinh = arr[i].NgaySinh;
            var millisecond = parseInt(NgaySinh.replace("/Date(", "").replace(")/", ""));
            newDate = new Date(millisecond);
        }
        noiDungChiTiet = `
                <div class="col-12 row">
                    <div class="col-6">
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Mã khách hàng</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${MaKH}</p>
                            </div>
                        </div>
                       <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Tên khách hàng</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${TenKH}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Số điện thoại</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${SDT}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Giới tính</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${GT}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Ngày sinh</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${newDate ? moment(newDate).format('DD/MM/YYYY') : null}</p>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-6">
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Địa chỉ</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${DiaChi}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Email</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${Email}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Facebook</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${FB}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Tình trạng</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${TinhTrang}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Người tạo</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${NguoiTao}</p>
                            </div>
                        </div>
                    </div>
                </div>
        `
    }
    document.querySelector('#chiTiet').innerHTML = noiDungChiTiet;

}
