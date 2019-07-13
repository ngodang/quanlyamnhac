const uuidv4 = require('uuid/v4');

let items = [
    {
        id        : uuidv4(),
        AnhDaiDien: "images/avt_huong_giang.jpg",
        NgheDanh  : "Hương Giang",
        TenThat   : "Nguyễn Ngọc Hiếu",
        GioiTinh  : 0, //0 là nam, 1 là nữ
        NgaySinh  : "29/12/1991",
        QueQuan   : "Hà Nội, Việt Nam",
        TieuSu    : "Năm 2012, Hương Giang đăng ký tham dự cuộc thi tìm kiếm tài năng âm nhạc Vietnam Idol mùa thứ tư, trở thành thí sinh chuyển giới đầu tiên của chương trình này."
    },
    {
        id        : uuidv4(),
        AnhDaiDien: "images/avt_minh_hang.jpg",
        NgheDanh  : "Minh Hằng",
        TenThat   : "Lê Ngọc Minh Hằng",
        GioiTinh  : 1,
        NgaySinh  : "22/06/1987",
        QueQuan   : "Bình Thạnh, Hồ Chí Minh",
        TieuSu    : "null"
    }
        
]


export default items;