const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})
//Sản phẩm
var SanPham = function () {
    this.masp = '';
    this.tensp = '';
    this.hinhanh = '';
    this.giaban = '';
    this.soluong = '';
    this.thanhtien = '';
}

var renderTableSanPham = function (arrSanPham) {
    var noiDungTable = '';
    for (var i = 0; i < arrSanPham.length; i++) {
        //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên từ trong mangSanPham
        var sp = new SanPham();
        sp.masp = arrSanPham[i].masp;
        sp.tensp = arrSanPham[i].tensp;
        sp.hinhanh = arrSanPham[i].hinhanh;
        sp.giaban = arrSanPham[i].giaban;
        sp.soluong = arrSanPham[i].soluong;
        noiDungTable += `
                <tr>
                    <td>${sp.masp}</td>
                    <td>${sp.tensp}</td>
                    <td><img src="/Assets/images/imageSanPham/${sp.hinhanh}" style="width: 50px; height: 50px" /></td>
                    <td>${sp.soluong}</td>
                    <td>${formatter.format(sp.giaban)}</td>
                    <td>
                        <button class="btn btn-danger" onclick="themGioHang('${sp.masp}')" style="background-color: #6399e2; padding: 5px; color: #fff; border-radius: 2px;">Thêm</button>
                    </td>
                </tr>
        `
    }
    //dom đến thẻ tbody gán innerHTML của tbody = noiDungTable
    document.querySelector('#tableSanPham').innerHTML = noiDungTable;
}

const loadDuLieuSanPham = function () {
    axios({
        url: '/BanHang/getsanpham',
        method: 'POST'
    }).then(res => { renderTableSanPham(res.data); })
        .catch(err => { err })
}
loadDuLieuSanPham();
// end sản phẩm

//Giỏ hàng
var renderTableGioHang = function (arrGioHang) {
    var noiDungGioHang = '';
    for (var i = 0; i < arrGioHang.length; i++) {
        //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên từ trong mangGioHang
        var gh = new SanPham();
        gh.masp = arrGioHang[i].masp;
        gh.tensp = arrGioHang[i].tensp;
        gh.hinhanh = arrGioHang[i].hinhanh;
        gh.giaban = arrGioHang[i].giaban;
        gh.soluong = arrGioHang[i].soluong;
        gh.thanhtien = arrGioHang[i].thanhtien;
        noiDungGioHang += `
                <tr>
                    <td class="stt" scope="row">${i + 1}</td>
                    <td class="masp">${gh.masp}</td>
                    <td class="tensp">${gh.tensp}</td>
                    <td class="img"><img src="/Assets/images/imageSanPham/${gh.hinhanh}" style="width: 50px; height: 50px" /></td>
                    <td><input class="sl" type="number" value="${gh.soluong}" min="1" id="soluong" /></td>
                    <td class="dongia">${formatter.format(gh.giaban)}</td>
                    <td class="thanhtien" id="thanhTien">${formatter.format(gh.thanhtien)}</td>
                    <td>
                        <span onclick="CapnhatGioHang('${gh.masp}')"><i class="far fa-edit"></i></span>
                    </td>
                    <td>
                        <span onclick="xoaGioHang('${gh.masp}')" class="clear" style="border-width: 0px;"><i class="fas fa-times"></i></span>
                    </td>
                </tr>
        `
    }
    //dom đến thẻ tbody gán innerHTML của tbody = noiDungGioHang
    document.querySelector('#tableGioHang').innerHTML = noiDungGioHang;
}

const loadDuLieuGioHang = function () {
    axios({
        url: '/BanHang/dataGioHang',
        method: 'POST'
    }).then(res => { renderTableGioHang(res.data); })
        .catch(err => { err })
    console.log("loadDuLieuGioHang");
}
loadDuLieuGioHang();

var themGioHang = function (maSp) {
    axios({
        method: 'POST',
        url: '/BanHang/ThemGioHang/?maSP=' + maSp,
    }).then(res => { loadDuLieuGioHang(); getHoaDon(); })
        .catch(err => { console.log(err); })
}

var xoaGioHang = function (maSp) {
    axios({
        method: 'DELETE',
        url: '/BanHang/XoaGioHang/?maSP=' + maSp,
    }).then(res => { loadDuLieuGioHang(); getHoaDon(); })
        .catch(err => { console.log(err); })
}
function ThanhToan() {
    axios({
        method: 'POST',
        url: '/BanHang/ThanhToan/',
    }).then(res => {
        loadDuLieuSanPham();
        loadDuLieuGioHang();
        getHoaDon();
        getThongTinKH();
        alert(res.data);
    })
        .catch(err => {
            console.log(err);
        })
}

var xoaTatCaGioHang = function () {
    axios({
        method: 'DELETE',
        url: '/BanHang/XoaTatCaGioHang/',
    }).then(res => { loadDuLieuGioHang(); getHoaDon(); getThongTinKH(); })
        .catch(err => { console.log(err); })
}

var getHoaDon = function () {
    axios({
        method: 'GET',
        url: '/BanHang/getHoaDon/',
    }).then(res => { renderHoaDon(res.data); console.log(res.data); })
        .catch(err => { console.log(err); })
}
getHoaDon();
var renderHoaDon = function (arr) {
    var HoaDon = '';

    var TongTien = arr.TongTien;
    var TongSoLuong = arr.TongSoLuong;
    HoaDon = `
        <div class="border-bottom py-1">
            <label class="text__pay">Số lượng: </label>
            <label id="so-luong" class="w-50 ml-5 text-right">${TongSoLuong}</label>
        </div>
        <div class="border-bottom py-2">
            <label class="text-danger font-weight-bold">Tổng tiền: </label>
            <label id="tong-tien" class="w-50 ml-5 text-right">${formatter.format(TongTien)}</label>
        </div>
    `

    document.querySelector('#renderHoaDon').innerHTML = HoaDon;
    console.log(HoaDon);
}

var CapnhatGioHang = function (maSp) {
    let soluong = document.querySelector('#soluong').value;
    axios({
        method: 'PUT',
        url: '/BanHang/CapnhatGioHang/?maSP=' + maSp + '&soluong=' + soluong,
    }).then(res => { loadDuLieuGioHang(); getHoaDon(); })
        .catch(err => { console.log(err); })
}
//end giỏ hàng

//Đăng ký khách hàng
document.querySelector('#btnXacNhan').onclick = function () {
    //Tạo đối tượng chứa dữ liệu nhập từ người dùng

    let tenkh = document.querySelector('#inputTenKH').value;
    let sdt = document.querySelector('#inputSdt').value;
    let diachi = document.querySelector('#inputDiaChiKh').value;
    let emailinputTenKH = document.querySelector('#inputEmail').value;
    let inputBirthKh = document.querySelector('#inputBirthKh').value;
    let inputTT = document.querySelector('#inlineRadio1').value;
    let inputFB = document.querySelector('#inputFB').value;
    let inputGioiTinh = document.querySelector('#inlineGioiTinh').value;
    let inputGhiChu = document.querySelector('#inputNote').value;
    let LoaiKH = document.querySelector('#renderloaiKH').value;

    const KhachHang = {
        "diachi": diachi,
        "sdt": sdt,
        "tenkh": tenkh,
        "email": emailinputTenKH,
        "ngaysinh": inputBirthKh,
        "tinhtrang": inputTT,
        "fb": inputFB,
        "gt": inputGioiTinh,
        "ghichu": inputGhiChu,
        "loaiKH": LoaiKH,
    }

    axios({
        method: 'POST',
        url: '/BanHang/DangKyKhachHang/',
        data: KhachHang
    }).then(res => { alert(res.data); getThongTinKH(); })
        .catch(err => { console.log(err); })
    console.log(KhachHang);
}
//end Đăng ký khách hàng

//get thông tin khách hàng
var getThongTinKH = function () {
    axios({
        method: 'GET',
        url: '/BanHang/getThongTinKH/',
    }).then(res => {
        renderThongTinKH(res.data);
    })
        .catch(err => { console.log(err); })
}
getThongTinKH();
var renderThongTinKH = function (arr) {
    var ThongTinKH = '';
    var TenKH = arr.TenKH;
    var sdtKH = arr.sdtKH;
    ThongTinKH = `
        <label class="id__user"><i class="fa fa-user icn__user"></i>Tên khách hàng: ${TenKH}</label> <br>
        <label class="id__user"><i class="fa fa-user icn__user"></i>Số điện thoại:  ${sdtKH}</label>
    `
    document.querySelector('#renderThongTinKH').innerHTML = ThongTinKH;
    console.log(HoaDon);
}
//end thông tin khách hàng

//Tìm kiếm khách hàng
var input = document.getElementById("TimSDT");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) { //Enter
        document.getElementById("btnTimKH").click();
    }
});

document.querySelector('#btnTimKH').onclick = function () {
    let sdt = document.querySelector('#TimSDT').value;
    axios({
        method: 'POST',
        url: '/BanHang/TimKiemKH/?SDT=' + sdt,
    }).then(res => {
        getThongTinKH();
        if (res.data)
            alert(res.data);
    })
        .catch(err => { console.log(err); })
}
//End tìm kiếm khách hàng

//Dropdown loaiKH
function getDropdownloaiKH() {
    axios({
        method: 'GET',
        url: '/BanHang/loaiKH/',
    }).then(res => {
        renderDropdownloaiKH(res.data);
    })
        .catch(err => { console.log(err); })
}
getDropdownloaiKH();
var renderDropdownloaiKH = function (arr) {
    var loaiKH = '';
    for (var i = 0; i < arr.length; i++) {
        var idLoaiKH = arr[i].idLoaiKH;
        var TenLoaiKH = arr[i].TenLoaiKH;
        loaiKH += `
                <option value="${idLoaiKH}">${TenLoaiKH}</option>
        `
    }
    document.querySelector('#renderloaiKH').innerHTML = loaiKH;
}
//----
//render TenNV
function getTenNV() {
    axios({
        method: 'GET',
        url: '/BanHang/TenNhanVien/',
    }).then(res => {
        renderTenNV(res.data);
    })
        .catch(err => { console.log(err); })
}
getTenNV();
var renderTenNV = function (arr) {
    var TenNV = '';
    var get = '';
    arr.map((item) => { get = item.TenNV });
    TenNV = `
        <label class="id__user"><i class="fa fa-user icn__user"></i>Tên nhân viên: ${get}</label>
    `
    document.querySelector('#renderTenNV').innerHTML = TenNV;
}