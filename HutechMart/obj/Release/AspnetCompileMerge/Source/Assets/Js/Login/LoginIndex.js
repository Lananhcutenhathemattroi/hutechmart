
$("#btnLogin").click(function (e) {
    //$("#checkLogin").css({ "visibility": "visible" });
    Swal.fire(
        'Tiến hành đăng nhập',
        'Đang kiểm tra thông tin',
        'warning'
    )
    e.preventDefault();
    var taikhoan = $("#taiKhoan").val();
    var matkhau = $("#matKhau").val();
    var obj = {
        taiKhoan: taikhoan,
        matKhau: matkhau
    }
    $.ajax({
        type: "POST",
        url: "/Login/Login",
        data: obj,
        success: function (result) {
            if (result == true) {
                setTimeout(function () { location.href = "/Home/Index" }, 1000);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Có lỗi xảy ra',
                    text: 'Tài khoản hoặc mật khẩu không chính xác',
                })
            }
        }
    })
})
