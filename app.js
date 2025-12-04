const items = [
    {
        img: "kyyeu.jpg",
        title: "Kỷ Yếu 2020",
        caption: "Thư mục kỷ yếu",
        url: "https://drive.google.com/drive/folders/1Zu5DIQGuDSyoDyyaBmgzfPG7eoxSBBNr?usp=sharing",
    },
    {
        img: "kyyeu.jpg",
        title: "Videos",
        caption: "Thư mục tổng hợp videos",
        url: "https://drive.google.com/drive/folders/1Zu5DIQGuDSyoDyyaBmgzfPG7eoxSBBNr?usp=sharing",
    },
    {
        img: "kyyeu.jpg",
        title: "Moments",
        caption: "Thư mục tổng hợp chung các ảnh",
        url: "https://drive.google.com/drive/folders/1Zu5DIQGuDSyoDyyaBmgzfPG7eoxSBBNr?usp=sharing",
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
            <img class="center-image" src="${data.img}" alt="${data.caption}" />
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