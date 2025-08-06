import headerNav from './header.js';
import slider from './slider.js';
import services from '../services/services.js';
import itemCreator from './itemsCreator.js';

const renderMainPage = ({activeCategory = 'all'} = {}) => {

    const { getData} = services(), 
        { createSlideItem, createVideoItem } = itemCreator(),
        {header} = headerNav(activeCategory),
        main = document.querySelector('#main');

    let pageNumber = 1,
        slidesCount = 5,
        slidesChanged = 4;

    main.innerHTML = '';   

    const videoCategory = document.createElement('div'),
        videoSection = document.createElement('div'),
        btnLoadMore = document.createElement('button');

    videoCategory.classList.add('text-2xl', 'text-black', 'text-center', 'font-bold', 'p-4');
    videoSection.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-2', 'py-4'); 
    btnLoadMore.classList.add('transition', 'hover:bg-gray-500', 'load-more', 'bg-gray-300', 'text-white', 'px-4', 'py-2', 'rounded', 'mt-4', 'cursor-pointer');
    btnLoadMore.textContent = 'Load More';

    main.insertAdjacentElement('beforeend', videoCategory);
    main.insertAdjacentElement('beforeend', videoSection);
    main.insertAdjacentElement('beforeend', btnLoadMore);
    main.insertAdjacentElement('afterbegin', header);  
    
    loadItems(activeCategory, true);

    loadSliderItems();

    function loadSliderItems() { 
        getData(`&order=latest&per_page=20`) 
        .then(data => {

            const slides = createSlideItem(data.hits);

            return slides;
        })
        .then((slides) => {   
            header.insertAdjacentElement('afterend', slider({
                slidesCount,
                controls: true,
                slidesChanged,
                slides
            }));
        })
    }

    function loadItems(id, reset) { 
        let category = id;
        let url = '';

        reset ? videoSection.innerHTML = '' : null;
        videoCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1) + ' videos';

        if (category === 'all') {
            url = `&page=${pageNumber}`;
        } else {
            url = `&category=${category}&page=${pageNumber}`;
        }
        getData(url)
            .then(data => {
                data.hits.forEach(video => {
                    videoSection.appendChild(createVideoItem(video));
                });
            });
    };  

    btnLoadMore.addEventListener('click', () => {
        ++pageNumber;
        loadItems(activeCategory, false);
    });

};

export default renderMainPage;

