"use strict";

import renderMainPage from './modules/renderMainPage';
import renderVideoPage from './modules/renderVideoPage';

import '../style/style.css';
import changeTheme from './modules/changeTheme';

window.addEventListener('DOMContentLoaded', () => {  

    changeTheme(false);

    if (!window.location.hash) {
        renderMainPage();
    } else {
        renderVideoPage(window.location.hash.replace(/\D/g, ''));
    }
});


