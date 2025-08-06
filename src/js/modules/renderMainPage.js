import headerNav from './header.js';
import slider from './slider.js';
import services from '../services/services.js';
import itemCreator from './itemsCreator.js';

const renderMainPage = ({activeCategory = 'all'} = {}) => {

    const { getData} = services(), 
        { createSlideItem, createVideoItem } = itemCreator(),
        {header} = headerNav(activeCategory),
        main = document.querySelector('#main'),
        videoCategory = document.createElement('div'),
        videoSection = document.createElement('div'),
        btnLoadMore = document.createElement('button');

    let pageNumber = 1,
        slidesCount = 5,
        slidesChanged = 4;

    main.innerHTML = '';


    
    // stylisation and adding classes

    videoCategory.classList.add('text-2xl', 'text-black', 'text-center', 'font-bold', 'p-4', 'dark:text-white');
    videoSection.classList.add('grid', 'grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4', 'gap-2', 'py-4'); 
    btnLoadMore.classList.add('transition', 'hover:bg-gray-500', 'load-more', 'bg-gray-300', 'text-white', 'px-4', 'py-2', 'rounded', 'mt-4', 'cursor-pointer', 
        'dark:bg-sky-900', 'dark:text-sky-200', 'dark:hover:text-white', 'dark:hover:bg-sky-700');
    btnLoadMore.textContent = 'Load More';

    // add elements to page

    main.insertAdjacentElement('beforeend', videoCategory);
    main.insertAdjacentElement('beforeend', videoSection);
    main.insertAdjacentElement('beforeend', btnLoadMore);
    main.insertAdjacentElement('afterbegin', header);  
    
    loadItems(activeCategory, true);

    loadSliderItems();

    function loadSliderItems() { //get data create cards for slider
        getData(`&order=latest&per_page=20`) 
        .then(data => {

            const slides = createSlideItem(data.hits);

            return slides;
        })
        .then((slides) => {   
            header.insertAdjacentElement('afterend', slider({
                slidesCount,
                slidesChanged,
                slides
            }));
        })
    }

    function loadItems(id, reset) { // get data and create main cards 
        let category = id;
        let url = '';

        reset ? videoSection.innerHTML = '' : null; // chekc if need to load more cards or replace cards
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

    btnLoadMore.addEventListener('click', () => { //load more cards
        ++pageNumber;
        loadItems(activeCategory, false);
    });

};

export default renderMainPage;

