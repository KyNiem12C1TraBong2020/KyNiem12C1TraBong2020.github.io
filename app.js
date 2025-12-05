const items = [
    {
        img: "kyyeu.jpg",
        title: "Kỷ Yêu",
        caption: "Thư mục kỷ yếu",
        url: "https://drive.google.com/drive/folders/1Zu5DIQGuDSyoDyyaBmgzfPG7eoxSBBNr?usp=sharing",
    },
    {
        img: "camping.jpg",
        title: "Cắm Trại Đi",
        caption: "Thư mục về cắm trại 2019",
        url: "https://drive.google.com/drive/folders/1PbXVih8Du9r7ajQtDlGEKlCZD73uWg7y?usp=sharing",
    },
    {
        img: "drinking.jpg",
        title: "Nhậu Gì Đếy",
        caption: "Thư mục nhạy cảm",
        url: "https://drive.google.com/drive/folders/1CkDO8ouiremm_zYnxs24rcIHZ5pEgQlz?usp=sharing",
    },
    {
        img: "party.jpg",
        title: "Liên Hoan (lạc)",
        caption: "Thư mục nhạy cảm",
        url: "https://drive.google.com/drive/folders/1nT0e1rSCxJRltu7LyOVUedypq-36lC_8?usp=sharing",
    },
    {
        img: "football.jpg",
        title: "Banh Bóng",
        caption: "Thư mục xíu banh bóng",
        url: "https://drive.google.com/drive/folders/1PJJn81R7-gSc_fGAYDnCn_FeMQq515Y4?usp=sharing",
    },
    {
        img: "PE.jpg",
        title: "Tiết Thể Dục Cuối",
        caption: "Thư mục tiết thể dục cuối",
        url: "https://drive.google.com/drive/folders/1aoSJ8bZhr3_QvggtxyY326vRRvvWFeKn?usp=sharing",
    },
    {
        img: "random.jpg",
        title: "Linh Tinh",
        caption: "Thư mục tổng hợp chung chung",
        url: "https://drive.google.com/drive/folders/1d0ZXRkjO2vKjkIZwM6oY4FtYhJNV9eW_?usp=sharing",
    },
];

let current = 0;
const slideshow = document.querySelector('.slideshow');

function render(currentIdx, nextIdx = null, direction = 1) {
    slideshow.innerHTML = '';

    const box = createBox(items[currentIdx], true);

    if (nextIdx !== null) {
        const nextBox = createBox(
            items[nextIdx],
            false,
            direction === 1 ? 'to-right' : 'to-left'
        );
        slideshow.appendChild(nextBox);

        setTimeout(() => {
            box.classList.remove('active');
            box.classList.add(direction === 1 ? 'to-left' : 'to-right');

            nextBox.classList.remove(direction === 1 ? 'to-right' : 'to-left');
            nextBox.classList.add('active');
        }, 20);

        setTimeout(() => {
            current = nextIdx;
            render(current);
        }, 720);
    } else {
        slideshow.appendChild(box);
    }
}

function createBox(data, isActive, className) {
    const div = document.createElement('div');
    div.className = 'option-box' + (isActive ? ' active' : '') + (className ? ' ' + className : '');
    div.innerHTML = `
        <div class="arrow-img-wrapper">
            <button class="arrow prev">&#8592;</button>
            <img class="center-image" src="thumbnails/${data.img}" alt="${data.caption}" />
            <button class="arrow next">&#8594;</button>
            <div class="option-title">${data.title} <br>
                <button class="option-button" onclick="window.open('${data.url}', '_blank')">More →</button>
            </div>
        </div>
    `;
    // Nút prev → chuyển về item trước
    div.querySelector('.arrow.prev').onclick = (e) => {
        e.stopPropagation();
        if (items.length <= 1) return;
        const prevIdx = (current - 1 + items.length) % items.length;
        render(current, prevIdx, -1); // direction: -1 (slide phải)
    };
    // Nút next → chuyển sang item sau
    div.querySelector('.arrow.next').onclick = (e) => {
        e.stopPropagation();
        if (items.length <= 1) return;
        const nextIdx = (current + 1) % items.length;
        render(current, nextIdx, 1); // direction: 1 (slide trái)
    };
    return div;
}

render(0);

function checkScreenAndShowMobile() {
    const smile = document.querySelector('.smile-icon');
    const mainContent = document.querySelector('.container');
    const slideshow = document.querySelector('.slideshow');
    if (window.outerWidth < 300) {
        if (mainContent) mainContent.style.display = '';
        if (slideshow) {
            // Xóa hết slideshow trước
            while (slideshow.firstChild) slideshow.removeChild(slideshow.firstChild);
            // Gắn hết option-box
            items.forEach((item, idx) => {
                const box = createBox(item, false, '');
                // Ẩn arrow
                Array.from(box.querySelectorAll('.arrow')).forEach(btn => btn.style.display = 'none');
                // Bỏ các state động
                box.className = 'option-box';
                // Margin các box
                box.style.margin = '32px 0';
                box.style.transform = '';
                box.style.opacity = '1';
                box.style.width = '100%';
                box.style.height = 'auto';
                box.style.pointerEvents = 'auto';
                box.style.justifyContent = 'flex-start';

                // Chế độ flex column cho wrapper
                const wrapper = box.querySelector('.arrow-img-wrapper');
                wrapper.style.flexDirection = "column";
                wrapper.style.gap = "20px";
                wrapper.style.width = "100%";
                wrapper.style.alignItems = "center";
                wrapper.style.justifyContent = "center";

                // Thay đổi ảnh sang tỷ lệ 4:3, option-title nằm trong ảnh
                const img = box.querySelector('.center-image');
                // Dùng wrapper riêng cho ảnh + overlay
                img.style.width = '100%';
                img.style.height = 'auto';
                img.style.display = 'block';

                // Tạo khung ảnh 4:3 (dùng wrapper: aspect-ratio hoặc padding hack)
                const mobileImgWrapper = document.createElement('div');
                mobileImgWrapper.style.position = 'relative';
                mobileImgWrapper.style.width = '100%';
                // === Thay đổi kích thước ảnh lớn hơn trên mobile ===
                if (window.outerWidth < 500) {
                    mobileImgWrapper.style.maxWidth = '98vw';
                } else if (window.outerWidth < 700) {
                    mobileImgWrapper.style.maxWidth = '94vw';
                } else {
                    mobileImgWrapper.style.maxWidth = '720px';
                }
                mobileImgWrapper.style.aspectRatio = '4 / 3';
                mobileImgWrapper.style.background = 'transparent';
                mobileImgWrapper.style.overflow = 'hidden';
                mobileImgWrapper.style.borderRadius = '14px';
                mobileImgWrapper.appendChild(img);

                // Option-title overlay trên ảnh, absolute dưới đáy ảnh
                const optionTitle = box.querySelector('.option-title');
                optionTitle.style.position = 'absolute';
                optionTitle.style.left = '7vw';
                optionTitle.style.right = '';
                optionTitle.style.bottom = '8vh';
                optionTitle.style.maxWidth = '35vw';
                optionTitle.style.textAlign = 'left';
                optionTitle.style.background = 'unset';
                optionTitle.style.color = '#fff';
                optionTitle.style.padding = '';
                optionTitle.style.margin = '';
                optionTitle.style.borderBottomLeftRadius = '';
                optionTitle.style.borderBottomRightRadius = '';
                optionTitle.style.fontSize = '3em';
                optionTitle.style.fontWeight = 'bold';
                optionTitle.style.textShadow = '0 3px 16px rgba(0,0,0,0.44)';
                optionTitle.style.lineHeight = '1.16';
                // optionTitle.style.fontSize = '1.22em';
                // optionTitle.style.fontWeight = '600';
                // optionTitle.style.lineHeight = '1.21';
                optionTitle.style.boxShadow = '0 0 18px 0 rgba(0,0,0,0.03)';
                optionTitle.style.zIndex = '2';

                // Đặt option-title vào trong mobileImgWrapper
                mobileImgWrapper.appendChild(optionTitle);

                // insert lại vào DOM: wrapper chỉ còn mobileImgWrapper, bỏ các node dư
                // (wrapper.children: mobileImgWrapper, bỏ arrow - đã ẩn, chỉ lấy ảnh + title)
                // Clear wrapper first:
                while(wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
                wrapper.appendChild(mobileImgWrapper);

                // add vào slideshow
                slideshow.appendChild(box);
            });
            // Cho phép scroll dọc
            slideshow.style.overflowY = 'auto';
            slideshow.style.overflowX = 'hidden';
            slideshow.style.display = 'block';
            slideshow.style.height = 'calc(100vh - 56px)';
        }
    } else {
        if (mainContent) mainContent.style.display = '';
        if (slideshow) {
            slideshow.style.overflowY = '';
            slideshow.style.overflowX = '';
            slideshow.style.display = '';
            slideshow.style.height = '';
            render(current);
        }
    }
}

// Khi tài liệu tải xong
window.addEventListener('DOMContentLoaded', checkScreenAndShowMobile);
// Khi thay đổi kích thước cửa sổ
window.addEventListener('resize', checkScreenAndShowMobile);