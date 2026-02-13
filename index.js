const bg = document.getElementById('bg');
const btnNoWrapper = document.getElementById('btn-no-wrapper');
const btnYesWrapper = document.getElementById('btn-yes-wrapper');
const textNo = document.getElementById('text-no');
const textYes = document.getElementById('text-yes');

const messagesNo = [
    "Từ chối?", "Thật sao?", "Đừng mà 🥺", "Suy nghĩ lại đi!",
    "Huhu khóc đó T.T", "Năn nỉ đó...", "Sao nỡ làm thế?",
    "Quá đáng lắm luôn", "Rất buồn...", "Trái tim tan vỡ 💔"
];

const messagesYes = [
    "Đồng ý", "Đồng ý đi mà", "Chắc chắn nha!", "Yêu cậu lắm ❤️",
    "Bấm đây nè!", "Đúng rồi đó!", "Tuyệt vời!", "Chốt đơn!",
    "Về bên tớ đi", "YES I DO! 💖"
];

let clickCount = 0;
let returnTimeout; 

// --- 1. Hiệu ứng Parallax (Giữ nguyên vì nó đẹp, PC hay Mobile có tí hiệu ứng cũng ko sao) ---
document.addEventListener('mousemove', function (e) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    const moveX = -(x * 30);
    const moveY = -(y * 30);
    
    if(bg) {
        bg.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// --- 2. Hàm kiểm tra thiết bị ---
function isMobile() {
    const isSmallScreen = window.innerWidth <= 768;
    // Check user agent để bắt chính xác các thiết bị di động
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return isSmallScreen || isMobileDevice;
}

// --- 3. PHÂN CHIA LOGIC ---

if (isMobile()) {
    // ================= LOGIC MOBILE (Ghim trái - To sang phải) =================
    console.log("Detected Mobile Mode");

    // Set điểm neo (anchor point) của nút Yes về bên TRÁI
    // Để khi scale nó sẽ dãn sang phải, cạnh trái đứng yên
    btnYesWrapper.style.transformOrigin = "left center"; 
    btnYesWrapper.style.transition = "transform 0.3s ease"; // Thêm chút hiệu ứng cho mượt

    btnNoWrapper.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        clickCount++;
        
        // a. Xử lý nút NO (nhỏ dần)
        // Thêm transformOrigin cho nút No để nó nhỏ lại tại chỗ hoặc về góc nào đó tuỳ ông
        // Mặc định cứ để nó nhỏ dần vào tâm (center) cũng được
        let scaleNo = 1 - (clickCount * 0.1); 
        if (scaleNo < 0) scaleNo = 0; 
        btnNoWrapper.style.transform = `scale(${scaleNo})`;
        
        // b. Xử lý nút YES (Ghim trái, to phải)
        let scaleYes = 1 + (clickCount * 0.1); 
        
        // Vì đã set transformOrigin = "left center" ở trên
        // Nên chỉ cần scale là nó tự hiểu "đứng yên bên trái, phình sang phải"
        btnYesWrapper.style.transform = `scale(${scaleYes})`;

        // c. Đổi nội dung chữ
        const index = clickCount % messagesNo.length;
        textNo.innerText = messagesNo[index];
        textYes.innerText = messagesYes[index];
    });
} else {
    // ================= LOGIC PC (Rê chuột là chạy) =================
    console.log("Detected PC Mode");

    btnNoWrapper.addEventListener('mouseover', function () {
        // Tính toán vị trí ngẫu nhiên trong khung nhìn
        // Trừ đi kích thước nút (khoảng 100px) để không bị tràn ra ngoài
        const newX = Math.floor(Math.random() * (window.innerWidth - 420)); 
        const newY = Math.floor(Math.random() * (window.innerHeight - 300));

        // Gán vị trí mới
        btnNoWrapper.style.position = 'fixed'; 
        btnNoWrapper.style.left = newX + 'px';
        btnNoWrapper.style.top = newY + 'px';
        
        // --- THÊM DÒNG NÀY: Xoay nhẹ ngẫu nhiên để tạo cảm giác "né" ---
        const randomRotate = Math.floor(Math.random() * 40) - 20; // Xoay từ -20 đến 20 độ
        btnNoWrapper.style.transform = `rotate(${randomRotate}deg)`;
            
        // Reset timeout cũ nếu chuột lùa liên tục
        clearTimeout(returnTimeout);
        
        // Hẹn giờ quay về chỗ cũ sau 2s nếu không bị lùa nữa (tuỳ chọn)
        returnTimeout = setTimeout(() => {
            btnNoWrapper.style.position = 'relative';
            btnNoWrapper.style.left = 'auto';
            btnNoWrapper.style.top = 'auto';
            btnNoWrapper.style.transform = 'rotate(0deg)';
        }, 3000);
    });
}

// Hàm đóng popup
function closePopup() {
    const popup = document.getElementById('msg-popup');
    popup.classList.remove('show-popup');
}

// Logic nút YES
btnYesWrapper.addEventListener('click', function() {
    const popup = document.getElementById('msg-popup');
    popup.classList.add('show-popup');

    // Nếu ông có dùng hiệu ứng pháo hoa thì ném code confetti vào đây
});