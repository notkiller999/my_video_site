import renderMainPage from "./renderMainPage";

const headerNav = () => {
    const header = document.createElement('header'),
        navMenu = document.createElement('nav'),
        categoryList = document.createElement('ul');

    const category = [
        "all",
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

    header.classList.add('w-full', 'bg-gray-50', 'text-black', 'p-4', 'text-center');
    header.innerHTML = `
        <div class="relative p-6">
            <img src="./images/logo.png" alt="Logo" class="absolute top-0 left-0 h-20">    
            <h1 class="text-3xl font-bold">My Video Site</h1>
        </div>
    `;

    navMenu.classList.add('mt-4', 'p-2');

    categoryList.classList.add('flex', 'justify-center', 'space-x-4', 'flex-wrap');

    category.forEach(item => {
        const listItem = document.createElement('li');

        listItem.id = item
        listItem.classList.add('p-2', 'cursor-pointer', 'text-black', 'hover:underline');
        listItem.textContent = item.charAt(0).toUpperCase() + item.slice(1);
        categoryList.appendChild(listItem);

    });

    categoryList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI' && e.target.id !== category) {
            renderMainPage({activeCategory: `${e.target.id}`});
        } 
    });

    navMenu.appendChild(categoryList);
    header.appendChild(navMenu);

    return {header};
}

export default headerNav;