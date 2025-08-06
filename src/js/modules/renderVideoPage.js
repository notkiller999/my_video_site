import renderMainPage from './renderMainPage.js';
import getResource from '../services/services.js';
import headerNav from './header.js';
import changeVideoPlayer from './changeVideoPlayer.js';


const renderVideoPage = (id) => { 
    if (!id) {
        renderMainPage()
        return;
    }
    
    const main = document.querySelector('#main'),
        {header} = headerNav();

    main.innerHTML = ''; 

    main.appendChild(header)

    window.addEventListener('popstate', (e) => {
        
        if (e.state === null) {
            renderMainPage();
        } 
    });

    const { getData } = getResource();
    
    getData(`&id=${id}`)
        .then(data => {
            renderVideoPage(data.hits[0]);                        
            return data.hits[0];
        })
        .then((data) => {            
            changeVideoPlayer(data);
        })

    function renderVideoPage(data) {
    
        const div = `
            <div class="grid grid-cols-1 xl:grid-cols-[auto_1fr] gap-4">
                <div id="video-wrapper" class=" flex mx-auto lg:w-177 max-h-[480px] relative">
                    <video poster=${data.videos.medium.thumbnail} id=${data.id} data-quality="medium" class="w-full rounded">
                        <source src=${data.videos.medium.url} type="video/mp4">
                    </video>
                </div>
                <div>
                    <div class="flex items-center">
                        <img src=${data.userImageURL} class="object-cover rounded-full w-30 p-2 pt-0">
                        <div class="p-2 text-2xl font-bold text-black dark:text-white">${data.user}</div>
                    </div>
                    <div class="text-l font-bold text-left">
                        <div class="p-2">Likes: ${data.likes}</div>
                        <div class="p-2">Views: ${data.views}</div>
                        <div class="p-2">Tags: <span class="font-normal dark:text-gray-400">${data.tags}</span></div>
                    </div>
                    
                </div>
            </div>
        `;

        main.insertAdjacentHTML('beforeend', div)
    };
};

export default renderVideoPage;
