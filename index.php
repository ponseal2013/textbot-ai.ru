<?php include 'includes/header.php'; ?>
<main class="container">
    <h1>TextBot-AI: Промпты для ИИ от профессионалов</h1>
    <p class="subtitle">База промптов для ChatGPT, Google Bard и других ИИ. Создавайте тексты, статьи, скрипты за минуты.</p>
    <div class="filters" style="justify-content: center;">
        <select id="category-filter">
            <option value="all">Все категории</option>
            <option value="Копирайтинг">Копирайтинг</option>
            <option value="Продажи">Продажи</option>
            <option value="HR">HR</option>
            <option value="Блоггинг">Блоггинг</option>
            <option value="YouTube">YouTube</option>
            <option value="Маркетинг">Маркетинг</option>
        </select>
        <select id="difficulty-filter">
            <option value="all">Все уровни</option>
            <option value="Новичок">Новичок</option>
            <option value="Средний">Средний</option>
            <option value="Продвинутый">Продвинутый</option>
        </select>
        <input type="text" id="search-input" placeholder="Поиск...">
    </div>
    <div id="pagination-top" class="pagination"></div>
    <div id="prompts-container"></div>
    <div id="pagination-bottom" class="pagination"></div>
</main>
<?php include 'includes/footer.php'; ?>