$(function () {
    $("#searching").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#table_customer tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
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
