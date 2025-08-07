const changeTheme = (toggle) => {
    const html = document.querySelector('html'),
        theme = localStorage.getItem('theme');

    if(toggle === false) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches && !theme) {
            setDark();
        } else if (localStorage.getItem('theme')){
            html.classList.remove('dark', 'light');
            html.classList.add(theme);
        } else {
            setLight();
        }
    } else {
       toggleTheme();
    };

    function toggleTheme() {
        if (html.classList.contains('light')) {
            setDark();
        } else {
            setLight();
        }
    };

    function setDark() {
        html.classList.remove('light');
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    };

    function setLight() {
        html.classList.remove('dark');
        html.classList.add('light');
        localStorage.setItem('theme', 'light');
    };
}

export default changeTheme;