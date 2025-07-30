const slider = ({
    numberOfSlides,
    slidesPerClick,
    slides
}) => {

    const slider = document.createElement('div'),
        text = document.createElement('div'),
        parent = document.createElement('div'),
        slideInner = document.createElement('div'),
        sliderWraper = document.createElement('div'),
        nextBtn = document.createElement('div'),
        prevBtn = document.createElement('div');

    let width = 0,
        offset = 0;

    const resizeObserver = new ResizeObserver(() => {
        const computedWidth = +window.getComputedStyle(slideInner).width.replace(/\D/g, '');
        width = Math.floor(computedWidth / numberOfSlides);
        slides.forEach(slide => {
            slide.style.width = width + 'px';
        });
        sliderWraper.style.width = (100 * slides.length) / numberOfSlides + '%';
    });

    resizeObserver.observe(slideInner);

    slider.classList.add('slider');
    text.classList.add('text-2xl', 'text-black', 'text-center', 'font-bold', 'p-4');
    text.textContent = 'Latest videos';
    parent.classList.add('relative', 'block', 'w-full');
    slideInner.classList.add('slider-inner', 'h-46', 'w-full', 'relative', 'overflow-x-clip', 'overflow-y-visible');
    sliderWraper.classList.add('slider-wrapper', 'flex', 'transition', 'duration-500', 'h-full');
    nextBtn.classList.add('slider-btn--next');
    prevBtn.classList.add('slider-btn--prev');  
    nextBtn.innerHTML = `<span>&gt;</span>`;
    prevBtn.innerHTML = `<span>&lt;</span>`;

    nextBtn.style.cssText = `
        position: absolute;
        top: 50%;
        right: -50px;
        transform: translateY(-50%);
        z-index: 100;
        width: 50px;
        height: 50px;
        border: 2px solid black;
        color: black;
        opacity: 0.9;
        text-align: center;
        font-size: 30px;
        transition: opacity .15s ease;
        cursor: pointer;
    `;

    prevBtn.style.cssText = `
        position: absolute;
        top: 50%;
        left: -50px;
        transform: translateY(-50%);
        z-index: 100;
        width: 50px;
        height: 50px;
        border: 2px solid black;
        color: black;
        opacity: 0.9;
        text-align: center;
        font-size: 30px;
        transition: opacity .15s ease;
        cursor: pointer;
    `;

    parent.appendChild(nextBtn);
    parent.appendChild(prevBtn);
    parent.appendChild(text);
    parent.appendChild(slideInner);
    sliderWraper.append(...slides);
    slideInner.appendChild(sliderWraper);
    slider.appendChild(parent);
    
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (offset < (slides.length - numberOfSlides) * width) {
            if (offset < (slides.length - (numberOfSlides + (slidesPerClick - 1))) * width) {
                offset += width * slidesPerClick;
            } else {
                offset += (slides.length - numberOfSlides) * width - offset;
            }
            sliderWraper.style.transform = `translateX(-${offset}px)`;
        }
    })

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (offset > 0) {
            if (offset >= width * slidesPerClick) {
                offset -= width * slidesPerClick;
            } else {
                offset = 0;
            }
            sliderWraper.style.transform = `translateX(-${offset}px)`;
        }
    })

    return slider;
}

export default slider;