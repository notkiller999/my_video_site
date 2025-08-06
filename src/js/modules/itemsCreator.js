import renderVideoPage from "./renderVideoPage";

const itemCreator = () => {

    const createSlideItem = (data) => {

        const items = [];

        data.forEach(video => {
            const item = document.createElement('div');

            item.id =video.id;
            item.classList.add('slider-item', 'max-h-full', 'ml-2', 'mr-2', 'transition-all', 'hover:scale-110', 'max-h-full', 'cursor-pointer');
            item.innerHTML = `
                <div>
                    <div class="overflow-hidden relative object-fit-cover rounded xl:h-28 lg:h-21 md:h-25 sm:h-19 max-h-25">
                        <img class="max-w-full" src=${video.videos.tiny.thumbnail} alt=${video.tags}>
                    </div>
                    <div>
                        <h2 class="text-xl font-semibold mt-2">${video.user}</h2>
                    </div>
                </div>
            `;

            item.addEventListener('click', () => {
                history.pushState({id: video.id}, '', `#${video.id}`);
                renderVideoPage(video.id);
            });
            items.push(item);
        });

        return items;
    };

    const createVideoItem = (data) => {
        let videoDescription = '';

        if (data.tags.length > 60) {
            videoDescription = data.tags.slice(0, 60) + '...';
        } else {
            videoDescription = data.tags;
        }

        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item', 'bg-white', 'p-2', 'rounded', 'shadow', 'cursor-pointer', 'hover:shadow-lg', 'transition-shadow', 'dark:bg-slate-800');
        videoItem.id = data.id;
        
        videoItem.innerHTML = `
            <div>
                <div class="max-h-65 overflow-hidden object-fit-cover relative rounded xl:max-h-36 lg:max-h-27 md:max-h-25 sm:max-h-39">
                    <video poster=${data.videos.tiny.thumbnail} alt=${data.tags} class="w-full h-full">
                        <source src=${data.videos.tiny.url}>
                    </video>
                    
                </div>
                <h2 class="text-xl font-semibold mt-2">${data.user}</h2>
                <p class="text-gray-600 dark:text-gray-400">${videoDescription}</p>
            </div>
        `;

        
        videoItem.addEventListener('mouseenter', () => {
            const video = videoItem.querySelector('video');
            video.muted = true;
            if (video.readyState >= 3) {
                video.play();
            } else {
                video.addEventListener('canplay', () => {
                video.play();
                }, { once: true })
            }
        });     

        videoItem.addEventListener('mouseleave', () => {
            const video = videoItem.querySelector('video');
            video.currentTime = 0;
            video.pause();
        });

        videoItem.addEventListener('click', () => {
            history.pushState({id: data.id}, '', `#${data.id}`);
            renderVideoPage(data.id);
        });

        return videoItem;
    } 

    return { createSlideItem, createVideoItem };
}

export default itemCreator;