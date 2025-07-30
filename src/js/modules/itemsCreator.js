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
                    <div class="max-h-34 overflow-hidden relative object-fit-cover rounded">
                        <img class="max-w-full max-h-full" src=${video.videos.large.thumbnail} alt=${video.tags}>
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
        videoItem.classList.add('video-item', 'bg-white', 'p-4', 'rounded', 'shadow', 'cursor-pointer', 'hover:shadow-lg', 'transition-shadow');
        videoItem.id = data.id;
        videoItem.innerHTML = `
            <div>
                <div class="max-h-32 overflow-hidden object-fit-cover relative">
                    <img src=${data.videos.large.thumbnail} alt=${data.tags} class="w-full h-full rounded">
                </div>
                <h2 class="text-xl font-semibold mt-2">${data.user}</h2>
                <p class="text-gray-600">${videoDescription}</p>
            </div>
        `;

        // const videoItem = `
        //     <div id=${data.id} class="video-item bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition-shadow">
        //         <div class="max-h-32 overflow-hidden object-fit-cover relative">
        //             <img src=${data.videos.large.thumbnail} alt=${data.tags} class=" w-full h-full rounded">
        //         </div>
        //         <h2 class="text-xl font-semibold mt-2">${data.user}</h2>
        //         <p class="text-gray-600">${videoDescription}</p>
        //     </div>
        // `;

        videoItem.addEventListener('click', () => {
            history.pushState({id: data.id}, '', `#${data.id}`);
            renderVideoPage(data.id);
        });

        return videoItem;
    } 

    return { createSlideItem, createVideoItem };
}

export default itemCreator;