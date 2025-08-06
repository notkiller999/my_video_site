const changeTheme = (toggle) => {
    const html = document.querySelector('html'),
        theme = localStorage.getItem('theme');

    if(toggle === false) {
        if (!theme) {
            localStorage.setItem('theme', 'light');
            html.classList.add('light');
        } else {
            html.classList.remove('dark', 'light');
            html.classList.add(theme);
        }
    } else {
        if (html.classList.contains('light')) {
            html.classList.remove('light');
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            html.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    }
}

export default changeTheme;