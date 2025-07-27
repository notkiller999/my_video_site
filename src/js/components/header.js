const headerNav = (selector) => {
    const navMenu = document.createElement('nav');
    const category = [
        "backgrounds",
        "fashion",
        "nature",
        "science",
        "education",
        "feelings",
        "health",
        "people",
        "religion",
        "places",
        "animals",
        "industry",
        "computer",
        "food",
        "sports",
        "transportation",
        "travel",
        "buildings",
        "business",
        "music"
    ];

    navMenu.classList.add('mt-4', 'p-2');

    const categoryList = document.createElement('ul');
    categoryList.classList.add('flex', 'justify-center', 'space-x-4', 'flex-wrap');

    category.forEach(cat => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');

        listItem.classList.add('p-2');
        link.href = `${cat}`;
        link.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        link.classList.add('text-black', 'hover:underline');
        listItem.appendChild(link);
        categoryList.appendChild(listItem);
    });

    navMenu.appendChild(categoryList);

    document.querySelector(selector).appendChild(navMenu);
}

export default headerNav;