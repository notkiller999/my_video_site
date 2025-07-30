import renderMainPage from './renderMainPage.js';
import getResource from '../services/services.js';
import headerNav from './header.js';


const renderVideoPage = (id) => {
    const main = document.querySelector('#main'),
        some = document.createElement('h1'),
        {header} = headerNav();

    main.innerHTML = ''; 

    main.insertAdjacentElement('afterbegin', header);

    some.textContent = `Video Page for ${id}`;
    some.classList.add('text-center', 'text-2xl', 'font-bold', 'mt-4');
    main.appendChild(some);
    window.addEventListener('popstate', (e) => {
        if (e.state === null) {
            renderMainPage();
        } 
    });

    const player = document.createElement('video'),
        { getData } = getResource();
    console.log(id);
    
    getData(`&id=${id}`)
        .then(data => {
            console.log(data);
            
            player.src = data.hits[0].videos.large.url;
            player.controls = true;
            player.classList.add('w-full', 'h-100', 'rounded');
            main.appendChild(player);
        })
};

export default renderVideoPage;
