"use strict";

import renderMainPage from './modules/renderMainPage';
import renderVideoPage from './modules/renderVideoPage';

import '../style/style.css';

window.addEventListener('DOMContentLoaded', () => {  

    if (history.state === null) {
        renderMainPage();
    } else {
        renderVideoPage(history.state.id);

        window.addEventListener('popstate', (e) => {
            if (e.state === null) {
                renderMainPage();
            } else {
                renderVideoPage(e.state.id);
            }
        });
    }
});


