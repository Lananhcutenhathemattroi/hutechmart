var Validation = function ()
{
    //value:giá trị người dùng nhập từ input
    //name: Tên thuộc tính kiểm tra
    //selectorError: thẻ mà mình sẽ hiển thị lỗi
    this.kiemTraRong = function (value, name, selectorError) {
        if (value.trim() === '') {
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống!';
            document.querySelector(selectorError).className = 'alert alert-danger';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        document.querySelector(selectorError).className = '';
        console.log(kiemTraRong)
        return true;
    }
    this.kiemTraTatCaLaSo = function (value, name, selectorError) {
        var regexAllNumber = /^[0-9]+$/;
        if (!regexAllNumber.test(value)) {
            document.querySelector(selectorError).innerHTML = name + ' tất cả phải là số !';
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
}

var validate = new Validation();
document.querySelector('#btn__themkh').onclick = function () {
    //Tạo đối tượng chứa dữ liệu nhập từ người dùng
    let inputTenKH = document.querySelector('#inputTenKH').value;
    let inputSdt = document.querySelector('#inputSdt').value;
    //----------------Kiểm tra dữ liệu hợp lệ ----------------
    // -------Kiểm tra rổng-----------
    let valid = true;

    valid &= validate.kiemTraRong(inputTenKH, 'Tên khách hàng', '#kiemTraRong-tenKhachHang')
        & validate.kiemTraRong(inputSdt, 'Số điện thoại', '#kiemTraRong-sdtKhachHang');

    // Kiểm tra định dạng
    valid &= validate.kiemTraTatCaLaSo(inputSdt, 'Số điện thoại', '#kiemTraTatCaLaSo-sdtKhachHang');
    //Kiểm 

    if (!valid) {
        return;
    }
}
