"use strict";

import headerNav from './components/header.js';
import slider from './components/slider.js';
import services from './services/srvices.js';

import '../style/style.css'


document.addEventListener("DOMContentLoaded", () => {
    headerNav('header');

    const { getData, createSlide } = services();

    getData('https://pixabay.com/api/videos/?key=51491907-60b56695abcda45f567adef59&order=latest&per_page=20')
        .then(data => {

            const sliderWrapper = document.querySelector('.slider-wrapper');

            createSlide(data, sliderWrapper);
        })
        .then(() => {
            slider({
                sliderInner: '.slider-inner',
                sliderItems: '.slider-item',
                sliderWrapper: '.slider-wrapper',
                container: '.slider',
                numberOfSlides: 6,
                controls: true,
                slidesPerClick: 4,
            });
        });

});

