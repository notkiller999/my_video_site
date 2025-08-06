import renderMainPage from "./renderMainPage";

const headerNav = (activeCategory) => {
    const header = document.createElement('header'),
        navMenu = document.createElement('nav'),
        categoryList = document.createElement('ul'),
        showCategory = document.createElement('div');

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

    navMenu.classList.add('mt-4', 'p-2');

    categoryList.classList.add('justify-center', 'space-x-4', 'flex-wrap', 'hidden', 'md:flex');
    header.classList.add('dark:bg-slate-900', 'dark:text-white')

    showCategory.classList.add('block', 'block', 'md:hidden', 'transition', 'hover:bg-gray-500', 'load-more', 'bg-gray-300', 'text-white', 'px-4', 'py-2', 'rounded', 'mt-4', 'cursor-pointer');
    showCategory.textContent = 'Show categoryes';

    header.innerHTML = `
        <div class="relative p-6">
            <div class="icon absolute top-0 left-0 h-20 text-black w-[80px] cursor-pointer dark:text-white">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
            </div>
            <h1 class="text-3xl font-bold sm:text-center text-right">My Video Site</h1>
        </div>
    `;

    

    header.addEventListener('click', (e) => {        
        if (e.target.classList.contains('icon')) {
            document.querySelector('html').classList.toggle('dark');
        }
    });

    header.insertAdjacentElement('beforeend',showCategory);

    showCategory.addEventListener('click', () => {
        categoryList.classList.toggle('hidden');
    })

    category.forEach(item => {
        const listItem = document.createElement('li');

        listItem.id = item
        listItem.classList.add('p-2', 'cursor-pointer', 'text-black', 'hover:underline', 'dark:text-white');
        listItem.textContent = item.charAt(0).toUpperCase() + item.slice(1);
        categoryList.append(listItem);

    });

    categoryList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI' && e.target.id !== activeCategory) {
            renderMainPage({activeCategory: `${e.target.id}`});            
            history.pushState({}, '', '/');
        } 
    });

    navMenu.append(categoryList);
    header.append(navMenu);

    return {header};
}

export default headerNav;