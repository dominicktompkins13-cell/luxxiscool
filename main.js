const categories = ['All', 'Puzzle', 'Action', 'Casual', 'Classic', 'Sandbox'];
let gamesList = [];
let currentCategory = 'All';
let currentSearch = '';

// DOM Elements
const gameGrid = document.getElementById('game-grid');
const searchInput = document.getElementById('search-input');
const categoriesNav = document.getElementById('categories-nav');
const gameCountSpan = document.getElementById('game-count');
const gameModal = document.getElementById('game-modal');
const gameFrame = document.getElementById('game-frame');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');

// Initialize
async function init() {
    renderCategoryFilters();
    await fetchGames();
    renderGames();

    // Event Listeners
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        renderGames();
    });

    document.getElementById('close-modal').onclick = closeModal;
    document.getElementById('exit-modal').onclick = closeModal;
    document.getElementById('reload-game').onclick = () => {
        gameFrame.src = gameFrame.src;
    };
    document.getElementById('fullscreen-game').onclick = () => {
        if (gameFrame.requestFullscreen) gameFrame.requestFullscreen();
    };
}

async function fetchGames() {
    try {
        const response = await fetch('/games.json');
        gamesList = await response.json();
    } catch (err) {
        console.error('Failed to load games:', err);
    }
}

function renderCategoryFilters() {
    categoriesNav.innerHTML = `<div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-4 flex items-center gap-2">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
        Categories
    </div>`;
    
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.onclick = () => {
            currentCategory = cat;
            updateCategoryUI();
            renderGames();
        };
        btn.className = `cat-btn px-4 py-3 rounded-xl flex items-center gap-3 border transition-all text-sm font-medium ${
            currentCategory === cat ? 'bg-white/10 border-white/10 text-white' : 'hover:bg-white/5 border-transparent text-slate-400'
        }`;
        btn.innerHTML = `<div class="w-1.5 h-1.5 rounded-full ${currentCategory === cat ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'bg-slate-600'}"></div> ${cat}`;
        categoriesNav.appendChild(btn);
    });
}

function updateCategoryUI() {
    const btns = document.querySelectorAll('.cat-btn');
    btns.forEach((btn, index) => {
        const cat = categories[index];
        const isActive = currentCategory === cat;
        btn.className = `cat-btn px-4 py-3 rounded-xl flex items-center gap-3 border transition-all text-sm font-medium ${
            isActive ? 'bg-white/10 border-white/10 text-white' : 'hover:bg-white/5 border-transparent text-slate-400'
        }`;
        const dot = btn.querySelector('div');
        dot.className = `w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'bg-slate-600'}`;
    });
}

function renderGames() {
    const filtered = gamesList.filter(game => {
        const matchesCat = currentCategory === 'All' || game.category === currentCategory;
        const matchesSearch = game.title.toLowerCase().includes(currentSearch) || 
                             game.tags.some(t => t.toLowerCase().includes(currentSearch));
        return matchesCat && matchesSearch;
    });

    gameCountSpan.innerText = `${filtered.length} Curated Titles`;
    gameGrid.innerHTML = '';

    if (filtered.length === 0) {
        gameGrid.innerHTML = `
            <div class="col-span-full py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/2">
                <svg class="w-12 h-12 mb-4 opacity-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <p class="text-lg font-medium text-slate-300">No titles found in this realm.</p>
                <button onclick="window.clearFilters()" class="mt-4 text-cyan-400 text-sm font-bold hover:underline">Clear Search Filters</button>
            </div>
        `;
        return;
    }

    filtered.forEach(game => {
        const card = document.createElement('div');
        card.className = 'group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl transition-all hover:shadow-indigo-500/10 hover:-translate-y-2';
        card.onclick = () => openGame(game);
        card.innerHTML = `
            <div class="aspect-[4/3] overflow-hidden relative">
                <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerpolicy="no-referrer">
                <div class="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent group-hover:via-[#020617]/20 transition-all"></div>
                <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div class="bg-white text-slate-900 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Play Now</div>
                </div>
            </div>
            <div class="p-6">
                <div class="flex items-start justify-between mb-2">
                    <h3 class="text-white font-bold text-lg leading-tight group-hover:text-indigo-400 transition-colors uppercase italic tracking-tight">${game.title}</h3>
                    <div class="p-1.5 bg-white/10 rounded-lg opacity-40 group-hover:opacity-100 transition-opacity">
                        <svg class="w-3 h-3 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                    </div>
                </div>
                <p class="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">${game.description}</p>
                <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 bg-white/5 rounded text-[9px] font-bold text-slate-500 uppercase tracking-widest border border-white/5">#${game.tags[0]}</span>
                    <span class="px-2 py-0.5 bg-white/5 rounded text-[9px] font-bold text-slate-500 uppercase tracking-widest border border-white/5">${game.category}</span>
                </div>
            </div>
        `;
        gameGrid.appendChild(card);
    });
}

window.clearFilters = () => {
    currentSearch = '';
    currentCategory = 'All';
    searchInput.value = '';
    updateCategoryUI();
    renderGames();
};

function openGame(game) {
    modalTitle.innerText = game.title;
    modalCategory.innerText = `${game.category} Session`;
    gameFrame.src = game.url;
    gameModal.classList.remove('hidden');
    gameModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    gameModal.classList.add('hidden');
    gameModal.classList.remove('flex');
    gameFrame.src = '';
    document.body.style.overflow = 'auto';
}

init();
