const slider = ({
    slidesCount,
    slidesChanged,
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
        offset = 0,
        numberOfSlides = slidesCount,
        slidesPerClick = slidesChanged;  

    const resizeObserver = new ResizeObserver(() => {  //observing changing display size for correct working slider
        const computedWidth = Math.floor(+window.getComputedStyle(slideInner).width.replace(/px/g, ''));
        width = Math.floor(computedWidth / numberOfSlides);
        slides.forEach(slide => {
            slide.style.width = width + 'px';
        });
        sliderWraper.style.width = (100 * slides.length) / numberOfSlides + '%';
    });

    resizeObserver.observe(slideInner);

    //add style and classes

    slider.classList.add('slider');
    text.classList.add('text-2xl', 'text-black', 'text-center', 'font-bold', 'p-4', 'dark:text-white');
    text.textContent = 'Latest videos';
    parent.classList.add('relative', 'block', 'w-full');
    slideInner.classList.add('slider-inner', 'h-46', 'w-full', 'relative', 'overflow-x-clip', 'overflow-y-visible', 'lg:h-35', 'md:h-40', 'sm:h-35');
    sliderWraper.classList.add('slider-wrapper', 'flex', 'transition', 'duration-500', 'h-full');
    nextBtn.classList.add('slider-btn--next');
    prevBtn.classList.add('slider-btn--prev');  
    nextBtn.innerHTML = `<span>&gt;</span>`;
    prevBtn.innerHTML = `<span>&lt;</span>`;

    nextBtn.style.cssText = `
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 100;
        width: 50px;
        height: 50px;
        border: 2px solid black;
        color: white;
        opacity: 0.9;
        text-align: center;
        font-size: 30px;
        transition: opacity .15s ease;
        cursor: pointer;
    `;

    prevBtn.style.cssText = `
        position: absolute;
        top: 50%;
        
        transform: translateY(-50%);
        z-index: 100;
        width: 50px;
        height: 50px;
        border: 2px solid black;
        color: white;
        opacity: 0.9;
        text-align: center;
        font-size: 30px;
        transition: opacity .15s ease;
        cursor: pointer;
    `;

    prevBtn.classList.add('bg-gray-600/50','md:left-[-50px]','sm:left-[-10px]', 'rounded');
    nextBtn.classList.add('bg-gray-600/50', 'md:right-[-50px]', 'sm:right-[-10px]', 'right-[-10px]', 'rounded');

    // add elements to a page

    parent.appendChild(nextBtn);
    parent.appendChild(prevBtn);
    parent.appendChild(text);
    parent.appendChild(slideInner);
    sliderWraper.append(...slides);
    slideInner.appendChild(sliderWraper);
    slider.appendChild(parent);

    changeSlidesCount();  

    window.addEventListener('resize', () => {
      changeSlidesCount();
    });
    
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
    });

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
    });

    function changeSlidesCount() { //change count of visiple cards in slider depend of screen size
        if(window.innerWidth >=1024 && numberOfSlides !== 5 ) {
            numberOfSlides = 5;
            slidesPerClick = 4;
            offset = 0;
            sliderWraper.style.transform = `translateX(-${offset}px)`;         
        } else if(window.innerWidth <=1024 && window.innerWidth >=640 && numberOfSlides !== 3 ) {
            numberOfSlides = 3;
            slidesPerClick = 2; 
            offset = 0;
            sliderWraper.style.transform = `translateX(-${offset}px)`;
        } else if (window.innerWidth <=639 && numberOfSlides !== 1 ) {
            
            numberOfSlides = 1;
            slidesPerClick = 1;
            offset = 0;
            sliderWraper.style.transform = `translateX(-${offset}px)`; 
        }
    }

    return slider;
}

export default slider;