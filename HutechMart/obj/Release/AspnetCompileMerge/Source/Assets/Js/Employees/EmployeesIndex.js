$(function () {
    $("#searching").on("keyup", function () {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var value = $(this).val().toLowerCase();
            $("#table_employees tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        }
    });

    $("#chucVu").on("keyup", function () {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var value = $(this).val().toLowerCase();
            $("#table_employees tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        }
    });

    $("#chucVu").autocomplete({
        source: function (request, response) {
            var search = $("#chucVu").val()
            $.ajax({
                url: "/Employees/DanhSachPhanLoai",
                type: "POST",
                dataType: "json",
                data: { search: search },
                success: function (data) {
                    response($.map(data, function (value) {
                        return { label: value.chucvu, value: value.chucvu }
                    }))
                }
            })
        }
    });
})

function ModalCreateGroup() {
    $.ajax({
        type: 'GET',
        url: '/Employees/CreateGroupEmployees',
        success: function (result) {
            $("#createGroup .modal-content").html(result);
        }
    })
}

function ModalCreate() {
    $.ajax({
        type: 'GET',
        url: '/Employees/Create',
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
        url: '/Employees/Update',
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
        url: '/Employees/Create',
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
                setTimeout(function () { location.href = "/Employees/Index" }, 1500);
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
    var chucvu = $("#chucvu").val();
    $.ajax({
        type: 'POST',
        url: '/Employees/CreateGroupEmployees',
        data: { chucVu: chucvu },
        success: function (result) {
            if (result == true) {
                Swal.fire(
                    'Thành công',
                    '',
                    'success'
                )
                setTimeout(function () { location.href = "/Employees/Index" }, 2000);
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
    $("#updateloading").css({ "visibility": "visible" });
    var formData = new FormData($("#formUpdate")[0]);
    $.ajax({
        type: 'POST',
        url: '/Employees/Update',
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
                setTimeout(function () { location.href = "/Employees/Index" }, 1500);
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
        title: 'Xóa nhân viên',
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
                url: '/Employees/Delete/',
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
async function loadChiTietNV(id) {
    console.log(id);
    await axios({
        url: '/Employees/ChiTietNV?id=' + id,
        method: 'GET',
    }).then(res => {
        renderChiTietNV(res.data);
    })
        .catch(err => { err })
}
function renderChiTietNV(arr) {
    console.log(arr);
    var noiDungTable = '';
    for (var i = 0; i < arr.length; i++) {
        var HinhANh = arr[i].HinhANh;
        var MaNV = arr[i].MaNV;
        var TenNV = arr[i].TenNV;
        var GT = arr[i].GT;
        var SDT = arr[i].SDT;
        var ChucVu = arr[i].ChucVu;
        var CMND = arr[i].CMND;
        var DiaChi = arr[i].DiaChi;
        var Email = arr[i].Email;
        var Fb = arr[i].Fb;
        var TinhTrang = arr[i].TinhTrang;
        var NgaySinh = arr[i].NgaySinh;
        var millisecond = parseInt(NgaySinh.replace("/Date(", "").replace(")/", ""));
        var newDate;
        if (arr[i].NgayTao != null) {
            var NgayTao = arr[i].NgayTao;
            var millisecond = parseInt(NgayTao.replace("/Date(", "").replace(")/", ""));
            newDate = new Date(millisecond);
        }
        noiDungTable = `
<div class="row">
             <div class="col-2 pt-2">
                                                                <p><img src="/Img/NhanVien/${HinhANh}" width="100" height="100" /></p>
                                                            </div>
                                                            <div class="col-10 row">
                                                                <div class="col-5">
                                                                    <div class="form-group row">
                                                                        <p class="col-sm-4 col-form-label text-left text-bold">Mã nhân viên</p>
                                                                        <div class="col-sm-8">
                                                                            <p class="col-form-label text-left" >${MaNV}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group row">
                                                                        <p class="col-sm-4 col-form-label text-left text-bold">Tên nhân vien</p>
                                                                        <div class="col-sm-8">
                                                                            <p class="col-form-label text-left" >${TenNV}</p>
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
                                                                            <p class="col-form-label text-left" >${newDate ? moment(newDate).format('DD/MM/YYYY') : null}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group row">
                                                                        <p class="col-sm-4 col-form-label text-left text-bold">Số điệm thoại</p>
                                                                        <div class="col-sm-8">
                                                                            <p class="col-form-label text-left" >${SDT}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group row">
                                                                        <p class="col-sm-4 col-form-label text-left text-bold">Chức vụ</p>
                                                                        <div class="col-sm-8">
                                                                            <p class="col-form-label text-left">${ChucVu}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-7">
                                                                    <div class="form-group row">
                                                                        <p class="col-sm-4 col-form-label text-left text-bold">Thẻ căn cước/CMND</p>
                                                                        <div class="col-sm-8">
                                                                            <p class="col-form-label text-left" >${CMND}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group row">
                                                                        <p class="col-sm-3 col-form-label text-left text-bold">Địa chỉ</p>
                                                                        <div class="col-sm-9">
                                                                            <p class="col-form-label text-left">${DiaChi}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group row">
                                                                        <p class="col-sm-3 col-form-label text-left text-bold">Email</p>
                                                                        <div class="col-sm-9">
                                                                            <p class="col-form-label text-left">${Email}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group row">
                                                                        <p class="col-sm-3 col-form-label text-left text-bold">Facebook</p>
                                                                        <div class="col-sm-9">
                                                                            <p class="col-form-label text-left">${Fb}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group row">
                                                                        <p class="col-sm-3 col-form-label text-left text-bold">Tình trạng</p>
                                                                        <div class="col-sm-9">
                                                                            <p class="col-form-label text-left">${TinhTrang}</p>
                                                                        </div>
                                                                    </div>
        </div>
        `
    }
    console.log(noiDungTable);
    document.querySelector('#chiTiet').innerHTML = noiDungTable;
}
