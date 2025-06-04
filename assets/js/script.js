document.addEventListener('DOMContentLoaded', () => {
    const categoryFilter = document.getElementById('category-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const searchInput = document.getElementById('search-input');
    const promptsContainer = document.getElementById('prompts-container');
    const paginationTop = document.getElementById('pagination-top');
    const paginationBottom = document.getElementById('pagination-bottom');
    const basicCountElement = document.getElementById('basic-prompt-count');
    const premiumCountElement = document.getElementById('premium-prompt-count');

    let prompts = [];
    let filteredPrompts = [];
    let currentPage = 1;
    const promptsPerPage = 20;

    async function loadPrompts() {
        try {
            const response = await fetch('/assets/data/prompts.json');
            if (!response.ok) throw new Error('Ошибка загрузки промптов');
            const data = await response.json();
            prompts = data.prompts || [];
            filteredPrompts = [...prompts];
            displayPrompts(filteredPrompts);
            updateStats();
            populateFilters();
        } catch (error) {
            console.error('Ошибка:', error);
            promptsContainer.innerHTML = '<p>Ошибка загрузки данных</p>';
        }
    }

    function updateStats() {
        if (basicCountElement) basicCountElement.textContent = prompts.length;
        if (premiumCountElement) premiumCountElement.textContent = 0;
    }

    function displayPrompts(list) {
        promptsContainer.innerHTML = '';
        const start = (currentPage - 1) * promptsPerPage;
        const paginatedPrompts = list.slice(start, start + promptsPerPage);

        paginatedPrompts.forEach(prompt => {
            const card = document.createElement('div');
            card.className = 'prompt-card';
            card.innerHTML = `
                <h3>${prompt.task}</h3>
                <p><strong>Категория:</strong> ${prompt.category}</p>
                <p><strong>Сложность:</strong> ${prompt.difficulty}</p>
                <p>${prompt.prompt}</p>
                <button class="copy-btn">Копировать</button>
            `;
            promptsContainer.appendChild(card);
        });

        setupCopyButtons();
        setupPagination(list.length, paginationTop);
        setupPagination(list.length, paginationBottom);
    }

    function setupPagination(totalItems, paginationElement) {
        paginationElement.innerHTML = '';
        const totalPages = Math.ceil(totalItems / promptsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = i === currentPage ? 'active' : '';
            btn.onclick = () => {
                currentPage = i;
                displayPrompts(filteredPrompts);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
            paginationElement.appendChild(btn);
        }
    }

    function setupCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach(button => {
            button.addEventListener('click', () => {
                const promptText = button.previousElementSibling.textContent;
                navigator.clipboard.writeText(promptText).then(() => {
                    const notification = document.createElement('div');
                    notification.className = 'notification';
                    notification.textContent = 'Промпт скопирован!';
                    document.body.appendChild(notification);
                    setTimeout(() => notification.remove(), 2000);
                });
            });
        });
    }

    function populateFilters() {
        const categories = [...new Set(prompts.map(p => p.category).filter(Boolean))];
        const difficulties = [...new Set(prompts.map(p => p.difficulty).filter(Boolean))];

        categoryFilter.innerHTML = '<option value="all">Все категории</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categoryFilter.appendChild(option);
        });

        difficultyFilter.innerHTML = '<option value="all">Все уровни</option>';
        difficulties.forEach(diff => {
            const option = document.createElement('option');
            option.value = diff;
            option.textContent = diff;
            difficultyFilter.appendChild(option);
        });
    }

    function filterPrompts() {
        let filtered = [...prompts];

        const category = categoryFilter?.value;
        const difficulty = difficultyFilter?.value;
        const search = searchInput?.value.toLowerCase();

        if (category && category !== 'all') {
            filtered = filtered.filter(p => p.category === category);
        }

        if (difficulty && difficulty !== 'all') {
            filtered = filtered.filter(p => p.difficulty === difficulty);
        }

        if (search) {
            filtered = filtered.filter(p => 
                p.task.toLowerCase().includes(search) || 
                p.prompt.toLowerCase().includes(search)
            );
        }

        currentPage = 1;
        filteredPrompts = filtered;
        displayPrompts(filteredPrompts);
    }

    loadPrompts();

    if (categoryFilter) categoryFilter.addEventListener('change', filterPrompts);
    if (difficultyFilter) difficultyFilter.addEventListener('change', filterPrompts);
    if (searchInput) searchInput.addEventListener('input', filterPrompts);

    // Highlight active menu item
    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href').includes(currentPath)) {
            link.classList.add('active');
        }
    });

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.style.display = (window.scrollY > 300) ? 'block' : 'none';
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = `2025${new Date().getFullYear() > 2025 ? `-${new Date().getFullYear()}` : ''}`;
    }
});