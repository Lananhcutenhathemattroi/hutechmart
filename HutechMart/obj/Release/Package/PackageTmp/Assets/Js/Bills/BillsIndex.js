const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

loadDefault();
async function loadDefault() {
    sessionStorage.clear();
    await countBill();
    TimKiem();
    SearchRangeDate();
}

//Phân trang API
var TotalRecord;
function countBill() {
    axios({
        url: '/Bills/CountBill',
        method: 'GET'
    }).then(res => {
        $('#pagination').pagination({
            dataSource: TotalRecord = new Array(res.data),
            pageSize: 10,
            autoHideNext: true,
            autoHidePrevious: true,
            showGoInput: true,
            showGoButton: true,
            callback: function (data, pagination) {
                let search = sessionStorage.getItem("search");
                let dateS = sessionStorage.getItem("dateStart");
                let dateE = sessionStorage.getItem("dateEnd");
                loadDataBill(pagination.pageNumber, search, dateS, dateE);
            }
        })
    })
        .catch(err => { err })
}
//--Phân trang
var PageNe = 1,
    Search = null,
    dateStart = null, dateEnd = null;
function loadDataBill(PageNe, Search, dateStart, dateEnd) {
    var search = "", date = '&dateStart=1900-01-01&dateEnd=1900-01-01';
    if (Search) search = '&Search=' + Search;
    if (dateStart && dateEnd) date = '&dateStart=' + dateStart + '&dateEnd=' + dateEnd;
    axios({
        url: '/Bills/GetBill?Page=' + PageNe + search + date,
        method: 'GET',
    }).then(res => {
        renderTableBill(res.data);
    })
        .catch(err => { err })
}

//Tìm kiếm
function TimKiem() {
    var input = document.getElementById("searching");
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) { //Enter
            document.getElementById("btnSearch").click();
        }
    });
    document.querySelector('#btnSearch').onclick = function () {
        let content = document.querySelector('#searching').value;
        sessionStorage.setItem("search", content);
        let dateS = sessionStorage.getItem("dateStart");
        let dateE = sessionStorage.getItem("dateEnd");
        loadDataBill(1, content, dateS, dateE);
        $('#pagination').pagination(1);
    }
}

//RangeDate
function SearchRangeDate() {
    var input = document.getElementById("dateStart");
    input.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) { //Enter
            document.getElementById("btnSearchRange").click();
        }
    });
    document.querySelector('#btnSearchRange').onclick = function () {
        let dateS = document.querySelector('#dateStart').value;
        let dateE = document.querySelector('#dateEnd').value;
        let content = sessionStorage.getItem("search");
        sessionStorage.setItem("dateStart", dateS);
        sessionStorage.setItem("dateEnd", dateE);
        loadDataBill(1, content, dateS, dateE);
    }
}

function renderTableBill(arr) {
    var noiDungTable = '';
    for (var i = 0; i < arr.length; i++) {
        var idHoaDon = arr[i].idHoaDon;
        var MaHD = arr[i].MaHD;
        var KhuyenMai = arr[i].KhuyenMai
        var ThoiGian = arr[i].ThoiGian;
        var TenKH = arr[i].TenKH;
        var TongTien = arr[i].TongTien;
        var KhachTra = arr[i].KhachTra;
        var millisecond = parseInt(ThoiGian.replace("/Date(", "").replace(")/", ""));
        var newDate = new Date(millisecond);
        noiDungTable += `
            <tr id="row" data-toggle="collapse" data-target="#accordion_">
                <td>${MaHD}</td>
                <td>${moment(newDate).format('DD/MM/YYYY HH:mm')}</td>
                <td>${TenKH}</td>
                <td>${formatter.format(TongTien)}</td>
                <td>${KhuyenMai}</td>
                <td>${formatter.format(KhachTra)}</td>
                <td class="text-center">
                    <button  class="btn btn-warning" data-toggle="modal" data-target="#updateBills" onclick="loadDataModal('${idHoaDon}')">Chi tiết</button>
                    <button class="btn btn-danger" id="btnDelete" onclick="XoaHoaDon('${idHoaDon}')">Xóa</button>
                </td>
            </tr>
        `
    }
    document.querySelector('#table_employees').innerHTML = noiDungTable;
}

function XoaHoaDon(MaHD) {
    axios({
        method: 'POST',
        url: '/Bills/XoaHoaDon/?MaHD=' + MaHD,
    }).then(res => {
        loadDataBill();
        alert('Xóa thành công');
    })
        .catch(err => { console.log(err); })
}

async function loadDataModal(id) {
    await axios({
        url: '/Bills/ThongTinHoaDon?id=' + id,
        method: 'GET',
    }).then(res => { renderThongTinHoaDon(res.data); })
        .catch(err => { err })
    await loadDataChiTietHoaDon(id);
}
function renderThongTinHoaDon(arr) {
    var noiDungTable = '';
    for (var i = 0; i < arr.length; i++) {
        var MaHD = arr[i].MaHD;
        var NgayLap = arr[i].NgayLap
        var TenKH = arr[i].TenKH;
        var TenNV = arr[i].TenNV;
        var VAT = arr[i].VAT;
        var Voucher = arr[i].Voucher;
        var TongTien = arr[i].TongTien;
        var KhachTra = arr[i].KhachTra;
        //Time
        var millisecond = parseInt(NgayLap.replace("/Date(", "").replace(")/", ""));
        var newDate = new Date(millisecond);
        noiDungTable = `
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-6">
                            <div class="">
                                <div class="form-group row">
                                    <p class="col-sm-4  text-bold">Mã hóa đơn</p>
                                    <div class="col-sm-8 chitiet__input">
                                        <p>${MaHD}</p>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <p class="col-sm-4  text-bold">Thời gian</p>
                                    <div class="col-sm-8 chitiet__input">
                                        <p>${moment(newDate).format('DD/MM/YYYY HH:mm')}</p>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <p class="col-sm-4  text-bold">Tên khách hàng</p>
                                    <div class="col-sm-8 chitiet__input">
                                        <p>${TenKH}</p>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <p class="col-sm-4  text-bold">Tên nhân viên</p>
                                    <div class="col-sm-8 chitiet__input">
                                        <p>${TenNV}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-5">
                            <div class="infor__khachhang">
                                <div class="form-group row">
                                    <p class="col-sm-4  text-bold">Voucher</p>
                                    <div class="col-sm-8 chitiet__input">
                                        <p>${Voucher}</p>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <p class="col-sm-4  text-bold">VAT</p>
                                    <div class="col-sm-8 chitiet__input">
                                        <p>${VAT}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Mã hàng</th>
                                <th scope="col">Tên Hàng</th>
                                <th scope="col">Đơn giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody id="ChiTietHoaDon">
                        </tbody>
                    </table>
                    <div style="float: right;margin-right: 30px;">
                        <p ><span class="text-bold">Tổng tiền hàng: </span> ${TongTien}</p>
                        <p ><span class="text-bold">Giảm giá : </span> ${Voucher}</p>
                        <p ><span class="text-bold">Khách cần trả : </span> ${KhachTra}</p>
                    </div>
                </div>
            </div>
        `
    }
    document.querySelector('#ModalNe').innerHTML = noiDungTable;
}

function loadDataChiTietHoaDon(id) {
    axios({
        url: '/Bills/ChiTietHoaDon?id=' + id,
        method: 'GET',
    }).then(res => { renderChiTietHoaDon(res.data); })
        .catch(err => { err })
}
function renderChiTietHoaDon(arr) {
    var noiDungTable = '';
    for (var i = 0; i < arr.length; i++) {
        var MaSP = arr[i].MaSP;
        var TenSP = arr[i].TenSP;
        var SoLuong = arr[i].SoLuong
        var GiaBan = arr[i].GiaBan;
        var ThanhTien = arr[i].ThanhTien;
        noiDungTable += `
            <tr>
                <td>${MaSP}</td>
                <td>${TenSP}</td>
                <td>${SoLuong}</td>
                <td>${GiaBan}</td>
                <td>${ThanhTien}</td>
            </tr>
        `
    }
    document.querySelector('#ChiTietHoaDon').innerHTML = noiDungTable;
}