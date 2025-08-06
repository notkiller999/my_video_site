"use strict";

import renderMainPage from './modules/renderMainPage';
import renderVideoPage from './modules/renderVideoPage';

import '../style/style.css';

window.addEventListener('DOMContentLoaded', () => {  

    if (!window.location.hash) {
        renderMainPage();
    } else {
        renderVideoPage(window.location.hash.replace(/\D/g, ''));
    }
});


