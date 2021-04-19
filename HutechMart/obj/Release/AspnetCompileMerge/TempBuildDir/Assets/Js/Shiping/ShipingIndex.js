$(function () {
    $("#searching").on("keyup", function () {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var value = $(this).val().toLowerCase();
            $("#table_shiping tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        }
    });

    $("#phanLoai").on("keyup", function () {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            var value = $(this).val().toLowerCase();
            $("#table_shiping tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        }
    });

    $("#phanLoai").autocomplete({
        source: function (request, response) {
            var search = $("#phanLoai").val()
            $.ajax({
                url: "/Shiping/DanhSachPhanLoai",
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
})

function ModalCreateGroup() {
    $.ajax({
        type: 'GET',
        url: '/Shiping/CreateGroupShiping',
        success: function (result) {
            $("#createGroup .modal-content").html(result);
        }
    })
}

function ModalCreate() {
    $.ajax({
        type: 'GET',
        url: '/Shiping/Create',
        success: function (result) {
            $("#create .modal-content").html(result);
        }
    })
}

function ModalUpdate(item) {
    var id = $(item).attr("data-id");
    $.ajax({
        type: 'GET',
        url: '/Shiping/Update',
        data: { id },
        success: function (result) {
            $("#update-" + id + " .modal-content").html(result);
        }
    })
}

function CreateGroup() {
    $("#createloading").css({ "visibility": "visible" });
    var tenphanloai = $("#tenphanloai").val();
    var ghichu = $("#ghichu").val();
    $.ajax({
        type: 'POST',
        url: '/Shiping/CreateGroupShiping',
        data: { tenphanloai: tenphanloai, ghichu: ghichu },
        success: function (result) {
            if (result == true) {
                Swal.fire(
                    'Thành công',
                    '',
                    'success'
                )
                setTimeout(function () { location.href = "/Shiping/Index" }, 2000);
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
    var formdata = new FormData($("#formCreate")[0]);
    $.ajax({
        type: 'POST',
        url: '/Shiping/Create',
        data: formdata,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result == true) {
                Swal.fire(
                    'Thành công',
                    'Hệ thống sẽ tự động chuyển đến danh sách nhà cung cấp',
                    'success'
                )
                setTimeout(function () { location.href = "/Shiping/Index" }, 1500);
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
    var formdata = new FormData($("#formUpdate")[0]);
    $.ajax({
        type: 'POST',
        url: '/Shiping/Update',
        data: formdata,
        contentType: false,
        processData: false,
        success: function (result) {
            if (result == true) {
                Swal.fire(
                    'Thành công',
                    'Hệ thống sẽ tự động chuyển đến danh sách nhà cung cấp',
                    'success'
                )
                setTimeout(function () { location.href = "/Shiping/Index" }, 1500);
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
        title: 'Xóa nhà cung cấp',
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
                url: '/Shiping/Delete/',
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
        url: '/Shiping/DetailShiping?id=' + id,
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
        var MaDT = arr[i].MaDT;
        var DiaChi = arr[i].DiaChi;
        var TenDT = arr[i].TenDT;
        var SDT = arr[i].SDT;
        var Email = arr[i].Email;
        var GhiChu = arr[i].GhiChu;
        var TinhTrang = arr[i].TinhTrang;
        var PhanLoai = arr[i].PhanLoai;
        var newDate;
        if (arr[i].NgayTao != null) {
            var NgayTao = arr[i].NgayTao;
            var millisecond = parseInt(NgayTao.replace("/Date(", "").replace(")/", ""));
            newDate = new Date(millisecond);
        }
        noiDungChiTiet = `
                <div class="col-12 row">
                    <div class="col-6">
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Mã đối tác</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${MaDT}</p>
                            </div>
                        </div>
                       <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Tên đối tác</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${TenDT}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Ngày tạo</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${newDate ? moment(newDate).format('DD/MM/YYYY') : null}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Địa chỉ</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${DiaChi}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Tình trạng</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${TinhTrang}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Số điện thoại</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${SDT}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Ghi chú</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${GhiChu}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Email</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${Email}</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <p class="col-sm-4 col-form-label text-left text-bold">Phân loại</p>
                            <div class="col-sm-8">
                                <p class="col-form-label text-left">${PhanLoai}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
        `
    }
    document.querySelector('#chiTiet').innerHTML = noiDungChiTiet;
}
