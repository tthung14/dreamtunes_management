
const API_URL = 'http://localhost:8080/api'; // Thay thế bằng URL của API của bạn

function getListSinger() {
    axios.get(API_URL + '/singers')
        .then(response => {
            console.log('check res', response);
            renderItems(response.data); 
        })
        .catch(error => {
            console.error('Error fetching items:', error);
        });
}
window.onload = function() {
    getListSinger();
};


// Định nghĩa hàm để render danh sách các mục
function renderItems(items) {
    var tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ''; // Xóa bỏ dữ liệu cũ trước khi render mới

    items.forEach(function (item) {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td class="songimgname">
                <a href="javascript:void(0);" class="song-img">
                    <img src=${item.image} alt="singer">
                </a>
                <a href="javascript:void(0);">${item.singerName}</a>
            </td>
            <td>
                <a class="me-3" href="singer-details.html" onclick="viewItem(${item.id})">
                    <img src="assets/img/icons/eye.svg" alt="img">
                </a>
                <a class="me-3" href="editsinger.html">
                    <img src="assets/img/icons/edit.svg" alt="img">
                </a>
                <a class="confirm-text" href="javascript:void(0);" onclick="deleteItem(${item.id})">
                    <img src="assets/img/icons/delete.svg" alt="img">
                </a>
            </td>
            `;
        tableBody.appendChild(row);
    });
}

// Xóa một mục từ API và sau đó render lại danh sách
function deleteItem(itemId) {
    
}

function viewItem(itemId) {
    
}