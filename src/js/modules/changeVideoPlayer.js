const changeVideoPlayer = (data) => {

    const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
        `,
        bigPlayIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-full h-full" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
        `,
        pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>
        `,
        volumeIcon = `<svg class="shrink-0 h-[24px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
        `,
        muteIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
        `,
        settingsIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
        `,
        fullscreenIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
        `;

    const wrapper = document.querySelector('#video-wrapper'),
        video = document.querySelector('video'),
        videoPanelWrapper = document.createElement('div'),
        videoFullTimline = document.createElement('div'),
        videoRealtimeTimline = document.createElement('div'),
        videoDraggableTimline = document.createElement('div'),
        videoPanel = document.createElement('div'),
        videoLeftPanel = document.createElement('div'),
        videoPlay = document.createElement('div'),
        videoVolume = document.createElement('div'),
        videoTimer = document.createElement('div'),
        videoRightPanel = document.createElement('div'),
        videoSettings = document.createElement('div'),
        videoFullScreen = document.createElement('div'),
        videoSettingsMenu = document.createElement('div'),
        videoVolumeMenu = document.createElement('div'),
        videoVolumeRange = document.createElement('div'),
        videoVolumeChange = document.createElement('div'),
        videoVolumeDraggable = document.createElement('div'),
        videoQualityList = document.createElement('ul'),
        videoPlayButton = document.createElement('div'),
        videoContinue = document.createElement('div'),
        totalMinutes = addZero(Math.floor(data.duration / 60)),
        totalSeconds = addZero(Math.floor(data.duration % 60)),
        savedVolume = localStorage.getItem('volume') ? +localStorage.getItem('volume') : localStorage.setItem('volume', 0.5),
        savedTime = localStorage.getItem(video.getAttribute('id'));

    let currentMinutes = addZero(0),
        currentSeconds = addZero(0),
        hideVolumeTimeoute,
        isDragging = false,
        hideMouseTimout,
        hideCanceled = false;

    //set visual, adding classes

    videoPanelWrapper.classList.add('text-white', 'absolute', 'w-full', 'h-15', 'bottom-0', 'bg-gradient-to-t', 
    'from-gray-900/90', 'to-gray-900/0', 'hover:opacity-100', 'transition', 'duration-400', 'panel');
    videoFullTimline.classList.add('absolute', 'bottom-12', 'w-[97%]', 'left-1/2', 'transform', '-translate-x-1/2', 'h-[3px]', 'bg-white/40', 'cursor-pointer');
    videoRealtimeTimline.classList.add('h-[4px]', 'bg-red-500','transition-[width]', 'duration-300', 'w-0', 'ease-linear');
    videoDraggableTimline.classList.add('bg-red-500', 'rounded-full', 'h-[10px]', 'w-[10px]', 'absolute', 'bottom-[-5px]', 'hover:scale-130', 'transition-[left,transform]', 'duration-300', 'ease-linear');
    videoPanel.classList.add('flex', 'justify-between', 'relative', 'bottom-[-25px]');
    videoLeftPanel.classList.add('flex', 'justify-between', 'w-40', 'ml-4');
    videoPlay.classList.add('cursor-pointer');
    videoVolume.classList.add('cursor-pointer');
    videoTimer.classList.add('cursor-default');
    videoRightPanel.classList.add('flex', 'justify-between', 'mr-4', 'w-15');
    videoSettings.classList.add('cursor-pointer');
    videoFullScreen.classList.add('cursor-pointer');
    videoSettingsMenu.classList.add('hidden', 'rounded', 'bg-gray-900/60', 'w-20', 'absolute', 'right-8', 'bottom-15', 'p-2');
    videoVolumeMenu.classList.add('hidden','absolute', 'bg-gray-900/60', 'w-10', 'h-30', 'bottom-15', 'left-12', 'rounded', 'transition', 'duration-400', 'opacity-0');
    videoVolumeRange.classList.add('absolute', 'h-[80%]', 'top-1/2', 'transform', '-translate-y-1/2', 'left-1/2', '-translate-x-1/2', 'w-[5px]', 'pl-[1px]', 'pr-[1px]', 'bg-white/40', 'cursor-pointer');
    videoVolumeChange.classList.add('absolute', 'w-[4px]', 'bg-red-500', 'bottom-0');
    videoVolumeDraggable.classList.add('bg-red-500', 'rounded-full', 'h-[10px]', 'w-[10px]', 'absolute', 'left-[-3px]', 'hover:scale-130', 'transition-[left,transform]', 'duration-300', 'ease-linear');
    videoPlayButton.classList.add('absolute', 'w-[70px]', 'h-[70px]', 'top-1/2', 'transform', '-translate-y-1/2', 'left-1/2', '-translate-x-1/2', 'text-white', 'hover:scale-120', 'duration-300', 'cursor-pointer');
    videoContinue.classList.add('absolute', 'left-1/2', '-translate-x-1/2', 'bg-gray-900/60', 'text-white', 'bottom-20', 'px-4','py-2', 'rounded', 'cursor-pointer');

    videoPlayButton.innerHTML = bigPlayIcon;
    videoPlay.innerHTML = playIcon;
    videoVolume.innerHTML = volumeIcon;
    videoSettings.innerHTML = settingsIcon;
    videoFullScreen.innerHTML = fullscreenIcon;

    videoTimer.textContent = `${currentMinutes}:${currentSeconds}/${totalMinutes}:${totalSeconds}`;

    //adding elements to a page

    videoPanelWrapper.append(videoFullTimline, videoPanel, videoSettingsMenu, videoVolumeMenu);
    videoFullTimline.append(videoRealtimeTimline);
    videoRealtimeTimline.append(videoDraggableTimline);
    videoPanel.append(videoLeftPanel, videoRightPanel);
    videoLeftPanel.append(videoPlay, videoVolume, videoTimer);
    videoRightPanel.append(videoSettings, videoFullScreen);    
    videoVolumeMenu.append(videoVolumeRange);
    videoVolumeRange.append(videoVolumeChange);
    videoSettingsMenu.append(videoQualityList);
    videoVolumeChange.append(videoVolumeDraggable);

    changeVolume();
    createQualityMenu(data.videos, videoQualityList);

    if (savedTime > 1) {  // check if video was watching add button for continue watching from paused time
        wrapper.append(videoContinue);
        videoContinue.textContent = `Continue watching from ${addZero(Math.floor(savedTime / 60))}:${addZero(Math.floor(savedTime % 60))}`;
        videoContinue.addEventListener('click', () => {
            video.currentTime = savedTime;
            playPause();
            videoContinue.remove();
        });
    };

    //add events 

    videoPlayButton.addEventListener('click', playPause);
    video.addEventListener('click', playPause);
    videoPlay.addEventListener('click', playPause);
    videoVolume.addEventListener('click', changeMute);
    video.addEventListener('timeupdate', timeUpdate);
    videoFullScreen.addEventListener('click', fullscreenToggle);
    videoSettings.addEventListener('click', () => videoSettingsMenu.classList.toggle('hidden'));

    wrapper.addEventListener('mouseover', (e) => {
        if(!video.paused) {
            hideShowPanel('show');
            e.target.addEventListener('mousemove', () => {
                clearTimeout(hideMouseTimout);
                hideShowPanel('show');
                hideMouseTimout = setTimeout(() => {                    
                    hideShowPanel('hide')
                }, 6000);
            })
            hideMouseTimout = setTimeout(() => {
                hideShowPanel('hide')
            }, 6000);
        };
    });

    wrapper.addEventListener('mouseleave', () => {
        if(video.paused) {
            clearTimeout(hideMouseTimout);
            hideShowPanel('show');
        } else {
            hideMouseTimout = setTimeout(() => {
                hideShowPanel('hide')
            }, 6000);
        };
    });

    videoVolume.addEventListener('mouseenter', () => {
        videoVolumeMenu.classList.remove('hidden');
        setTimeout(() => {
            videoVolumeMenu.classList.add('opacity-100');
        }, 10)
        clearTimeout(hideVolumeTimeoute);
    });

    videoVolume.addEventListener('mouseleave', () => {
        hideVolumeTimeoute = setTimeout(() => {
            videoVolumeMenu.classList.remove('opacity-100');
            videoVolumeMenu.classList.add('opacity-0');
            setTimeout(() => {
                videoVolumeMenu.classList.add('hidden');
            }, 400)
        }, 3000);
    });

    videoVolumeMenu.addEventListener('mouseenter', () => {
        clearTimeout(hideVolumeTimeoute);
    });

    videoVolumeMenu.addEventListener('mouseleave', () => {
        hideVolumeTimeoute = setTimeout(() => {
            videoVolumeMenu.classList.add('hidden');
        }, 3000);
    });

    videoFullTimline.addEventListener('click', (e) => rewinding(e));

    videoDraggableTimline.addEventListener('mousedown', (e) => {
        isDragging = 'timline';
        videoRealtimeTimline.classList.remove('duration-300', 'transition-[width]');
        videoDraggableTimline.classList.remove('duration-300', 'transition-[left,transform]');
        onDragging(e);
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.userSelect = '';
        videoRealtimeTimline.classList.add('duration-300', 'transition-[width]');
        videoDraggableTimline.classList.add('duration-300', 'transition-[left,transform]');
    });

    videoVolumeDraggable.addEventListener('mousedown', (e) => {
        onDragging(e);
        isDragging = 'volume';        
    });

    videoVolumeRange.addEventListener('click', (e) => changeVolume(e));

    document.body.addEventListener('keydown', (e) => {
        
        switch (e.key.toLowerCase()) {
            case ' ':
                e.preventDefault();
                playPause();
                break;
        
            case 'm':
                changeMute();
                break;

            case 'escape':
                videoSettingsMenu.classList.add('hidden');
                break;

            case 'f':
                fullscreenToggle();
                break;

            case 'arrowup':
                e.preventDefault();
                changeVolume(0.05);
                break;

            case 'arrowdown':
                changeVolume(-0.05);
                e.preventDefault();
                break;
        }        
    });

    //functions section

    function playPause() { //play/pause function
        console.log(`play: ${hideMouseTimout}`);
        
        clearTimeout(hideMouseTimout);
        if(videoContinue) videoContinue.remove();
        
        if (video.paused) {
            hideCanceled = false;
            video.play();
            hideShowPanel('hide');
            videoPlay.innerHTML = pauseIcon;
            videoPlayButton.classList.add('hidden');
                
        } else {
            hideCanceled = true;
            video.pause();
            hideShowPanel('show');
            videoPlay.innerHTML = playIcon;
            videoPlayButton.classList.remove('hidden');
        }
    };

    function changeMute() { //toggl mute function
        if (video.muted) {
            video.muted = false;
            videoVolume.innerHTML = volumeIcon;
        } else {
            video.muted = true;
            videoVolume.innerHTML = muteIcon;
        };
    };

    function addZero(num) { // function for adding zero before number for better visual
        return +num < 10 ? "0" + num : num;
    };

    function timeUpdate() { // update time on video and recording it to localStorage
        const percent = Math.min((video.currentTime / data.duration) * 100, 100);

        currentMinutes = addZero(Math.floor(video.currentTime / 60));
        currentSeconds = addZero(Math.floor(video.currentTime % 60));
        videoTimer.textContent = `${currentMinutes}:${currentSeconds}/${totalMinutes}:${totalSeconds}`;
        videoRealtimeTimline.style.width = `${percent}%`;
        videoDraggableTimline.style.left = `calc(${percent}% - 5px)`;

        localStorage.setItem(video.getAttribute('id'), video.currentTime.toFixed(2));
        
        if (video.currentTime >= data.duration) {
            video.pause();
            video.currentTime = 0;
            hideShowPanel('show');
            videoPlay.innerHTML = playIcon;
            videoPlayButton.classList.remove('hidden');
        }
    };

    function fullscreenToggle() { //toggle fullscreen mode video

        if (!wrapper || !wrapper.isConnected) {
            console.warn('wrapper not connected');
            return
        }

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            wrapper.requestFullscreen();
        }
    };

    function changeQuality(e, url) { //changing quality video
        const paused = video.paused,
            time = video.currentTime;

        videoQualityList.querySelectorAll('li').forEach(item => item.classList.remove('bg-red-700'));
        e.target.classList.add('bg-red-700');        
        video.src = url;  
        video.addEventListener('loadedmetadata', () => { //check video is ready for play
            video.currentTime = time;
            paused ? video.pause() : video.play();
        });
                 
    };

    function createQualityMenu(data, elem) {  //creating menu with list of quality video
        
        const quality = video.getAttribute('data-quality');

        Object.keys(data).forEach(item => {
            
            const li = document.createElement('li');
            li.classList.add('cursor-pointer', 'rounded');
            if (item === quality) {
                li.classList.add('bg-red-700');
            }
            li.textContent = `${data[item].width}`;     
            li.addEventListener('click', (e) => changeQuality(e, data[item].url));
            elem.append(li)
        });
    };

    function rewinding(e) { // function for rewindin video and stilisate timline
        const elem = videoFullTimline.getBoundingClientRect(),
            width = elem.width,
            clickX = e.clientX - elem.left,
            percent = ((clickX / width) * 100).toFixed(2),
            time = (data.duration * (percent / 100)).toFixed(2);        
        
        videoRealtimeTimline.style.width = `${percent}%`;
        videoDraggableTimline.style.left = `calc(${percent}% - 5px)`;
        video.currentTime = video.currentTime + (time - video.currentTime);
    };

    async function changeVolume(e) { // control volume of video

        if(!e && savedVolume) {
           videoVolumeChange.style.height = `${savedVolume * 100}%`;
            video.volume = savedVolume;
            return; 
        } else {
            videoVolumeChange.style.height = '50%';
            video.volume = 0.5;
        }

        if (typeof e === 'number') {
            const vol = Math.min(Math.max(+localStorage.getItem('volume') + e, 0), 1);

            localStorage.setItem('volume', vol);
        
            videoVolumeChange.style.height = `${vol * 100}%`;
            video.volume = vol;

            return;
        }

        try {
            const elem = videoVolumeRange.getBoundingClientRect(),
            height = elem.height,
            clickY = elem.top - e.clientY,
            percent = Math.min(Math.max((1 + ((clickY / height))).toFixed(2), 0), 1);

            localStorage.setItem('volume', percent);
            
            videoVolumeChange.style.height = `${percent * 100}%`;
            video.volume = percent;
        } catch (error) {
            console.error(error.message);
            
        }
    };

    function onDragging(e) { // for possibility change time or volume by draggin 
        e.preventDefault();
        document.body.style.userSelect = 'none';          
        document.addEventListener('mousemove', (e) => onDraggingListener(e));
    };

    function onDraggingListener(e) { // check target and decide what change 

        switch (isDragging) {
            case false:
                return;
        
            case 'timline':
                rewinding(e);
                break;
            
            case 'volume':
                changeVolume(e);
                break;
        }
    };

    function hideShowPanel(action) { // hide/show video panel and cursor
        if (action === 'hide' && !hideCanceled) {
            videoPanelWrapper.classList.add('opacity-0');
            videoPanelWrapper.classList.remove('opacity-100');
            wrapper.classList.add('cursor-none');
        } else {
            videoPanelWrapper.classList.add('opacity-100');
            videoPanelWrapper.classList.remove('opacity-0');
            wrapper.classList.remove('cursor-none');
        }
    };

    wrapper.append(videoPanelWrapper, videoPlayButton);
};

export default changeVideoPlayer;