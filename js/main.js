/**
 * Lấy các điểm trung bình từ table (UI)
 */
var tbl = document.getElementById("tblBody");
// console.log(tbl);
// console.log(tbl.rows);
// console.log(tbl.rows[0]);

// //Hàng 1 cột 3
// console.log(tbl.rows[0].cells[3].innerHTML);
var danhSachDiem = [];
function layDanhSachDiem() {
    //C1: rows & cells
    // var arrRows = tbl.rows;//arrRows: chứa danh sách các thẻ tr (nhiều hàng)
    // console.log(arrRows);

    // //Duyệt qua từng hàng (tr) để lấy gtri trung bình
    // for(var i = 0; i < arrRows.length; i++){
    //     var dtb = arrRows[i].cells[3].innerHTML;
    //     console.log(dtb);
    //     danhSachDiem.push(parseFloat(dtb));
    // }

    //C2: Lấy thẻ = class
    var arrClass = document.getElementsByClassName("td-scores");
    console.log(arrClass);
    for (var i = 0; i < arrClass.length; i++) {
        var dtb = arrClass[i].innerHTML;
        console.log(dtb);
        danhSachDiem.push(parseFloat(dtb));
    }
    console.log(danhSachDiem);
}
//Khi trang web vừa load lên sẽ lấy danh sách điểm liền, ko cần qua thao tác gì
layDanhSachDiem();

/**
 * Tìm SV có điểm tb lớn nhất
 * B1: Giả sử dtb lớn nhất ở viTri = 0 (phần tử đầu tiên):
 *      max = danhSachDiem[0] => max = danhSachDiem[viTri]
 * B2: Duyệt mảng:
 *     so sánh biến max với các phần tử còn lại trong mảng
 *     Nếu có phần tử có giá trị lớn hơn max thì gán giá trị mới cho max (gán giá trị mới cho viTri)
 */
function timSVLonNhat() {
    //Giả sử phần tử đầu tiên lớn nhất
    var viTri = 0;
    var max = danhSachDiem[viTri];
    //var i = 1: vì đã lấy vị trí 0 ra rồi
    for (var i = 1; i < danhSachDiem.length; i++) {
        //Kiểm tra max còn lớn nhất hay không
        if (max < danhSachDiem[i]) {
            //Nếu max không lớn nhất
            //Thì đổi giá trị max thành giá trị lớn hơn
            max = danhSachDiem[i];
            //Lấy vị trí của giá trị lớn hơn
            viTri = i;
        }
    }
    //Lấy tên SV có dtb lớn nhất
    var tenSV = tbl.rows[viTri].cells[2].innerHTML;
    document.getElementById("svGioiNhat").innerHTML = "Tên SV: " + tenSV + " - Điểm trung bình: " + max;
}

/**
 * Tìm SV điểm nhỏ nhất
 */

function timSVNhoNhat() {
    //Giả sử phần tử đầu tiên nhỏ nhất
    var viTri = 0;
    var min = danhSachDiem[viTri];
    //var i = 1: vì đã lấy vị trí 0 ra rồi
    for (var i = 1; i < danhSachDiem.length; i++) {
        if (danhSachDiem[i] < min) {
            min = danhSachDiem[i];
            viTri = i;
        }
    }
    //Lấy tên SV có dtb nhỏ nhất
    var tenSV = tbl.rows[viTri].cells[2].innerHTML;
    document.getElementById("svYeuNhat").innerHTML = "Tên SV: " + tenSV + " - Điểm trung bình: " + min;
}

/**
 * Đếm số SV giỏi
 * -B1: tạo function xepLoai => Nhận tham số là dtb và Trả về kết quả loại sv
 * -B2: tạo function demSVGioi
 * 
 */
function xepLoai(dtb) {
    if (dtb > 8) {
        return "Giỏi";
    } else if (dtb > 6 && dtb <= 8) {
        return "Khá";
    } else if (dtb > 5 && dtb <= 6) {
        return "TB";
    } else {
        return "Yếu";
    }
}

function demSVGioi() {
    var count = 0;
    for (var i = 0; i < danhSachDiem.length; i++) {
        var loaiSV = xepLoai(danhSachDiem[i]);
        if (loaiSV == "Giỏi") {
            count++;
        }

    }
    document.getElementById("soSVGioi").innerHTML = count;
}

/**
 * Lấy danh sách sinh viên có điểm trung bình lớn hơn 5
 * -B1: hàm layDSHon5
 * -B2: tạo biến content (Chứa các tên sv và điểm tb lớn hơn 5)
 * -B3: Nếu SV dtb > 5 thì tìm tên SV
 *   => Nối chuỗi tenSV và điểm vào biến content
 * 
 */
function layDSHon5() {
    var content = "";
    for (var i = 0; i < danhSachDiem.length; i++) {
        if (danhSachDiem[i] > 5) {
            var tenSV = tbl.rows[i].cells[2].innerHTML;
            content += " - " + tenSV + " - " + danhSachDiem[i] + "<br>";
        }
    }
    document.getElementById("dsDiemHon5").innerHTML = content;
}

/**
 * Sắp xếp điểm tăng dần
 * //0    1    2    3    4    5    6
 * [6.4, 8.2, 3.4, 9.8, 2.4, 1.4, 9.4]
 * [1.4, .............., 9.8]
 */
function sapXepTangDan() {
    //Vòng lớn
    //danhSachDiem.length - 1: số lần lặp
    for (var i = 0; i < danhSachDiem.length - 1; i++) {
        //Bắt đầu duyệt dòng nhỏ
        for (var j = i + 1; j < danhSachDiem.length; j++) {
            //Nếu có phần tử có giá trị nhỏ hơn phần tử ở vị trí i (0: vị trí đầu)
            if(danhSachDiem[i] > danhSachDiem[j]){
                //i=0         j  
                //[6.4, 8.2, 3.4, 9.8, 2.4, 1.4, 9.4]
                //Chứa tạm giá trị của i vào temp
                var temp = danhSachDiem[i];
                //Chuyển giá trị nhỏ về đầu mảng
                danhSachDiem[i] = danhSachDiem[j];
                //Chuyển giá trị i thay thế vào j
                danhSachDiem[j] = temp;
            }
            
        }
        console.log(danhSachDiem);
    }
}


/**
 * Thêm sự kiện cho button
 */
document.getElementById("btnSVCaoDiemNhat").onclick = timSVLonNhat;
document.getElementById("btnSVThapDiemNhat").onclick = timSVNhoNhat;
document.getElementById("btnSoSVGioi").onclick = demSVGioi;
document.getElementById("btnSVDiemHon5").onclick = layDSHon5;
document.getElementById("btnSapXepTang").onclick = sapXepTangDan;