import renderMainPage from "./renderMainPage";

const headerNav = (activeCategory) => {
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
            <h1 class="text-3xl font-bold sm:text-center text-right">My Video Site</h1>
        </div>
    `;

    navMenu.classList.add('mt-4', 'p-2');

    categoryList.classList.add('justify-center', 'space-x-4', 'flex-wrap', 'hidden', 'md:flex');

    const showCategory = document.createElement('div');
    showCategory.classList.add('block', 'block', 'md:hidden', 'transition', 'hover:bg-gray-500', 'load-more', 'bg-gray-300', 'text-white', 'px-4', 'py-2', 'rounded', 'mt-4', 'cursor-pointer');
    showCategory.textContent = 'Show categoryes';

    header.insertAdjacentElement('beforeend',showCategory);

    showCategory.addEventListener('click', () => {
        categoryList.classList.toggle('hidden');
    })

    category.forEach(item => {
        const listItem = document.createElement('li');

        listItem.id = item
        listItem.classList.add('p-2', 'cursor-pointer', 'text-black', 'hover:underline');
        listItem.textContent = item.charAt(0).toUpperCase() + item.slice(1);
        categoryList.append(listItem);

    });

    categoryList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI' && e.target.id !== activeCategory) {
            renderMainPage({activeCategory: `${e.target.id}`});            
            history.pushState({}, '', '/');
        } 
    });

    navMenu.appendChild(categoryList);
    header.appendChild(navMenu);

    return {header};
}

export default headerNav;