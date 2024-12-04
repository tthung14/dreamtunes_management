
const API_URL = 'http://localhost:8080/api'; // Thay thế bằng URL của API của bạn

function getListSong() {
    axios.get(API_URL + '/songs')
        .then(response => {
            console.log('check res', response);
            renderItems(response.data); 
        })
        .catch(error => {
            console.error('Error fetching items:', error);
        });
}
window.onload = function() {
    getListSong();
    viewItem(7);
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
                    <img src=${item.image} alt="song">
                </a>
                <a href="javascript:void(0);">${item.songName}</a>
            </td>
            <td>${item.duration}</td>
            <td>${item.singer.singerName}</td>
            <td>${item.type.typeName}</td>
            <td>${item.album.albumName}</td>
            <td></td>
            <td>
                <a class="me-3" href="song-details.html" onclick="viewItem(${item.id})">
                    <img src="assets/img/icons/eye.svg" alt="img">
                </a>
                <a class="me-3" href="editsong.html">
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
    axios.delete(API_URL + '/songs/delete' + itemId)
        .then(response => {
            console.log('Item deleted:', response);
            getListSong(); // Sau khi xóa thành công, render lại danh sách
        })
        .catch(error => {
            console.error('Error deleting item:', error);
        });
}

function viewItem(itemId) {
    axios.get(API_URL + '/songs/'+ itemId)
        .then(response => {
            const itemDetails = response.data;
            document.getElementById("songName").innerText = itemDetails.songName;
            document.getElementById("duration").innerText = itemDetails.duration;
            document.getElementById("singer").innerText = itemDetails.singer.singerName;
            document.getElementById("type").innerText = itemDetails.type.typeName;
            if (itemDetails.album.albumName != null) {
                document.getElementById("album").innerText = itemDetails.album.albumName;
            } else {
                document.getElementById("album").innerText = "";
            }
            document.getElementById("link").innerText = itemDetails.link;
            document.getElementById("image").src = itemDetails.image;
        })
        .catch(error => {
            console.error('Error get items:', error);
        });
}