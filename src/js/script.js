"use strict";
    import '../style/style.css'


document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    

    const body = document.querySelector('body');
    const h1 = document.createElement('h1');
    h1.textContent = 'Hello, World!';
    h1.classList.add('text-3xl', 'font-bold', 'text-center', 'mt-10', 'text-green-500');

    body.appendChild(h1);
});

