//스크롤 이벤트를 쌓아서 페이지 이동
let scrollThreshold = 1000; // 사용자가 스크롤해야 하는 거리
let accumulatedScroll = 0; // 스크롤을 누적시킬 변수

window.addEventListener('wheel', (event) => {
    // passive 옵션을 false로 설정하여 preventDefault()를 사용할 수 있게 함
    event.preventDefault(); // 기본 스크롤을 방지
    const delta = event.deltaY; // 스크롤 변화량을 변수에 저장

    // 스크롤 누적
    accumulatedScroll += delta;

    // 설정한 스크롤 양에 도달했을 때만 페이지를 이동
    if (Math.abs(accumulatedScroll) >= scrollThreshold) {
        window.scrollBy({
            top: accumulatedScroll, // 누적된 스크롤 양만큼 이동
            behavior: 'smooth'
        });

        // 스크롤 누적 초기화
        accumulatedScroll = 0;
    }
}, { passive: false });

// 스크롤에 따라 특정 요소를 이동시키는 코드 (scroll 이벤트 사용)
window.addEventListener('scroll', function() {
    const scrollPos = window.scrollY;
    const windowHeight = window.innerHeight;

    const page2 = document.querySelector('.page2');
   // const page3 = document.querySelector('.page3');

    // 스크롤에 따라 페이지 덮는 효과 적용
    if (scrollPos >= windowHeight && scrollPos < 2 * windowHeight) {
        page2.style.transform = `translateY(${scrollPos - windowHeight}px)`;
    } else if (scrollPos >= 2 * windowHeight) {
        page3.style.transform = `translateY(${scrollPos - 2 * windowHeight}px)`;
    }
});

const fixedBox = document.querySelector('.fixed-box');
const page2 = document.querySelector('.page2');

// 현재 페이지 상태를 확인하는 변수
let isOnPage2 = false;

// Intersection Observer 설정
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 두 번째 페이지에 진입할 때
      fixedBox.style.transition = 'color 1s ease'; // 색상이 1초 동안 변경
      fixedBox.style.color = 'black';
      isOnPage2 = true;
    } else if (isOnPage2) {
      // 첫 번째 페이지로 돌아갈 때만
      fixedBox.style.transition = 'color 2s ease';
      fixedBox.style.color = 'white';
      isOnPage2 = false;
    }
  });
}, {
  rootMargin: '-50% 0px' // 루트 마진 설정
});

// page2 요소 관찰 시작
observer.observe(page2);


function cardClick(cardNumber) {
    const targetModal = document.querySelector(`.card[data-target="#modal${cardNumber}"]`).getAttribute('data-target');
    const modal = document.querySelector(targetModal);
    modal.style.display = 'block';
}

function closeModal(modalId) {
    const modal = document.querySelector(modalId);
    modal.style.display = 'none';
}

// 팝업창 이외의 빈 공간을 클릭하면 팝업이 꺼지도록 설정
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

document.querySelectorAll('.card').forEach((card, index) => {
    const imageUrl = card.getAttribute('data-image');
    card.style.backgroundImage = `url(${imageUrl})`;
    card.addEventListener('click', () => cardClick(index + 1));
});

function showPage(modalId, pageNum) {
  const pages = document.querySelectorAll(`${modalId} .modal-page`);
  pages.forEach((page, index) => {
    page.style.display = (index === pageNum - 1) ? 'block' : 'none';
  });
}

function scrollCarousel(modalId, direction) {
  const carousel = document.querySelector(`${modalId} .carousel-inner`);
  const items = carousel.querySelectorAll('.card');
  currentIndex = (currentIndex + direction + items.length) % items.length;
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

let currentIndex = 0;