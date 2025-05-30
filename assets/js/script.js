function initializeTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.textContent = '🌙';
  } else {
    themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = document.body.classList.contains('dark-theme') ? '🌙' : '☀️';
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
  });
}

initializeTheme();

Promise.all([
  fetch('assets/data/prompts.json').then(res => {
    if (!res.ok) throw new Error('Ошибка загрузки prompts.json');
    return res.json();
  }),
  fetch('assets/data/premium_prompts.json').then(res => {
    if (!res.ok) throw new Error('Ошибка загрузки premium_prompts.json');
    return res.json();
  })
])
  .then(([basicData, premiumData]) => {
    const prompts = basicData.prompts || [];
    const premiumPrompts = premiumData.prompts || [];
    let filteredPrompts = prompts;
    let currentPage = 1;
    const promptsPerPage = 20;

    function displayPromptCount() {
      const basicCount = prompts.length;
      const premiumCount = premiumPrompts.length;
      const basicCountElement = document.getElementById('basic-prompt-count');
      const premiumCountElement = document.getElementById('premium-prompt-count');
      if (basicCountElement) basicCountElement.textContent = basicCount;
      if (premiumCountElement) premiumCountElement.textContent = premiumCount;
    }

    const translations = {
      category: {
        copywriting: 'Копирайтинг',
        sales: 'Продажи',
        hr: 'HR',
        blogging: 'Блоггинг',
        youtube: 'YouTube',
        marketing: 'Маркетинг',
        design: 'Дизайн',
        programming: 'Программирование',
        education: 'Образование',
        smm: 'SMM',
        analytics: 'Аналитика',
        idea_generation: 'Генерация идей',
        translations: 'Переводы',
        content_strategy: 'Контент-стратегия',
        support: 'Поддержка клиентов',
        ecommerce: 'Интернет-магазины',
        seo: 'SEO',
        data_analysis: 'Анализ данных',
        creative_writing: 'Креативное письмо',
        video_editing: 'Видеомонтаж',
        project_management: 'Управление проектами',
        personal_branding: 'Личный брендинг',
        gamification: 'Геймификация',
        email_marketing: 'Email-маркетинг',
        ux_ui: 'UX/UI',
        market_research: 'Исследование рынка',
        presentation_design: 'Дизайн презентаций',
        chatbot_development: 'Разработка чат-ботов',
        content_curation: 'Кураторство контента',
        business_strategy: 'Бизнес-стратегия'
      },
      difficulty: {
        beginner: 'Новичок',
        intermediate: 'Средний',
        advanced: 'Продвинутый'
      }
    };

    const difficultyMapping = {
      beginner: 'Новичок',
      intermediate: 'Средний',
      advanced: 'Продвинутый'
    };

    function populateCategories() {
      const categoryFilter = document.getElementById('category-filter');
      if (!categoryFilter) return;

      const categories = [...new Set(prompts.map(p => p.category).filter(c => c))].sort();
      categoryFilter.innerHTML = '<option value="all">Все</option>';
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = translations.category[category] || category;
        categoryFilter.appendChild(option);
      });
    }

    function displayPrompts(promptsToShow) {
      const container = document.getElementById('prompts-container');
      if (!container) return;

      container.innerHTML = '';

      if (promptsToShow.length === 0) {
        container.innerHTML = '<p>Промпты не найдены</p>';
        return;
      }

      const start = (currentPage - 1) * promptsPerPage;
      const end = start + promptsPerPage;
      const paginatedPrompts = promptsToShow.slice(start, end);

      paginatedPrompts.forEach(prompt => {
        const card = document.createElement('div');
        card.className = 'prompt-card';
        card.innerHTML = `
          <h3>${prompt.task || 'Без названия'}</h3>
          <p><strong>Категория:</strong> ${translations.category[prompt.category] || prompt.category}</p>
          <p><strong>Сложность:</strong> ${translations.difficulty[prompt.difficulty] || prompt.difficulty}</p>
          <p><strong>Промпт (русский):</strong> ${prompt.prompt || 'Описание отсутствует'}</p>
          <p><strong>Промпт (английский):</strong> ${prompt.prompt_en || 'Перевод отсутствует'}</p>
          <button class="copy-btn" data-prompt-id="${prompt.id}">Копировать</button>
        `;
        container.appendChild(card);
      });

      document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {
          const promptText = button.parentElement.querySelector('p:nth-child(4)').textContent.replace('Промпт (русский): ', '');
          navigator.clipboard.writeText(promptText).then(() => {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = 'Промпт скопирован!';
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 2000);
          });
          console.log(`Скопирован промпт ID: ${button.dataset.promptId}`);
        });
      });

      displayPagination(promptsToShow);
    }

    function displayPagination(promptsToShow) {
      const paginationTop = document.getElementById('pagination-top');
      const paginationBottom = document.getElementById('pagination');
      if (!paginationTop || !paginationBottom) return;

      paginationTop.innerHTML = '';
      paginationBottom.innerHTML = '';
      const pageCount = Math.ceil(promptsToShow.length / promptsPerPage);

      for (let i = 1; i <= pageCount; i++) {
        [paginationTop, paginationBottom].forEach(pagination => {
          const button = document.createElement('button');
          button.textContent = i;
          button.className = i === currentPage ? 'pagination-btn active' : 'pagination-btn';
          button.addEventListener('click', () => {
            currentPage = i;
            displayPrompts(promptsToShow);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
          pagination.appendChild(button);
        });
      }
    }

    function filterPrompts() {
      const category = document.getElementById('category-filter');
      const difficulty = document.getElementById('difficulty-filter');
      const search = document.getElementById('search-input');

      if (!category || !difficulty || !search) return;

      filteredPrompts = prompts.filter(prompt => {
        const matchesCategory = category.value === 'all' || prompt.category === category.value;
        const matchesDifficulty = difficulty.value === 'all' || 
                                 (difficultyMapping[difficulty.value] && prompt.difficulty === difficultyMapping[difficulty.value]);
        const matchesSearch = search.value === '' || 
                             (prompt.task && prompt.task.toLowerCase().includes(search.value.toLowerCase())) || 
                             (prompt.prompt && prompt.prompt.toLowerCase().includes(search.value.toLowerCase()));
        return matchesCategory && matchesDifficulty && matchesSearch;
      });

      currentPage = 1;
      displayPrompts(filteredPrompts);
    }

    displayPromptCount();
    populateCategories();

    const categoryFilter = document.getElementById('category-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const searchInput = document.getElementById('search-input');

    if (categoryFilter) categoryFilter.addEventListener('change', () => {
      currentPage = 1;
      filterPrompts();
    });
    if (difficultyFilter) difficultyFilter.addEventListener('change', () => {
      currentPage = 1;
      filterPrompts();
    });
    if (searchInput) searchInput.addEventListener('input', () => {
      currentPage = 1;
      filterPrompts();
    });

    if (document.getElementById('prompts-container')) {
      displayPrompts(prompts);
    }

    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
      window.addEventListener('scroll', () => {
        scrollTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
      });
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = `2025${new Date().getFullYear() > 2025 ? `-${new Date().getFullYear()}` : ''}`;
    }
  })
  .catch(error => {
    console.error('Ошибка:', error);
    const container = document.getElementById('prompts-container');
    if (container) container.innerHTML = '<p>Ошибка загрузки данных.</p>';
  });