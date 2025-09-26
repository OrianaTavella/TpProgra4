document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    if (galleryItems.length === 0) return;

    const imageSources = Array.from(galleryItems).map(item => item.src);
    let currentIndex = 0;

    // Crear elementos del lightbox
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.classList.add('lightbox-overlay');
    
    const lightboxImage = document.createElement('img');
    lightboxImage.classList.add('lightbox-image');

    const closeButton = document.createElement('span');
    closeButton.classList.add('lightbox-close');
    closeButton.innerHTML = '&times;';

    const prevButton = document.createElement('a');
    prevButton.classList.add('lightbox-arrow', 'lightbox-prev');
    prevButton.innerHTML = '&#10094;';

    const nextButton = document.createElement('a');
    nextButton.classList.add('lightbox-arrow', 'lightbox-next');
    nextButton.innerHTML = '&#10095;';

    lightbox.appendChild(lightboxImage);
    lightbox.appendChild(closeButton);
    lightbox.appendChild(prevButton);
    lightbox.appendChild(nextButton);
    document.body.appendChild(lightbox);

    // Botón de slideshow
    let slideInterval = null;
    const slideBtn = document.createElement('button');
    slideBtn.textContent = '▶️ Auto';
    slideBtn.className = 'lightbox-slide';
    lightbox.appendChild(slideBtn);

    const startSlideshow = () => {
        slideInterval = setInterval(() => {
            showImage(currentIndex + 1);
        }, 3000);
        slideBtn.textContent = '⏸️ Stop';
    };

    const stopSlideshow = () => {
        clearInterval(slideInterval);
        slideInterval = null;
        slideBtn.textContent = '▶️ Auto';
    };
    
    slideBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (slideInterval) {
            stopSlideshow();
        } else {
            startSlideshow();
        }
    });

    function showImage(index) {
        currentIndex = (index + imageSources.length) % imageSources.length;
        lightboxImage.src = imageSources[currentIndex];
    }

    function openLightbox(index) {
        currentIndex = index;
        lightboxImage.src = imageSources[currentIndex];
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
        stopSlideshow();
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    closeButton.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex - 1);
    });

    nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex + 1);
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                showImage(currentIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showImage(currentIndex + 1);
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
});