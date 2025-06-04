<?php include '../includes/header.php'; ?>
<main class="container">
    <h2>Панель управления</h2>
    <div class="admin-section">
        <h3>Добавить промпт</h3>
        <form id="prompt-form" action="/api/add_prompt.php" method="POST">
            <label for="prompt-id">ID:</label>
            <input type="text" id="prompt-id" name="id" required>
            <label for="prompt-task">Задача:</label>
            <input type="text" id="prompt-task" name="task" required>
            <label for="prompt-category">Категория:</label>
            <select id="prompt-category" name="category" required>
                <option value="Копирайтинг">Копирайтинг</option>
                <option value="Продажи">Продажи</option>
                <option value="HR">HR</option>
                <option value="Блоггинг">Блоггинг</option>
                <option value="YouTube">YouTube</option>
                <option value="Маркетинг">Маркетинг</option>
                <option value="SMM">SMM</option>
                <option value="SEO">SEO</option>
                <option value="Аналитика">Аналитика</option>
                <option value="Личный брендинг">Личный брендинг</option>
                <option value="Email-маркетинг">Email-маркетинг</option>
                <option value="Интернет-магазины">Интернет-магазины</option>
                <option value="Креативное письмо">Креативное письмо</option>
                <option value="Видеомонтаж">Видеомонтаж</option>
                <option value="Управление проектами">Управление проектами</option>
                <option value="Контент-стратегия">Контент-стратегия</option>
                <option value="Поддержка клиентов">Поддержка клиентов</option>
                <option value="Дизайн">Дизайн</option>
                <option value="Программирование">Программирование</option>
                <option value="Образование">Образование</option>
                <option value="UX/UI">UX/UI</option>
                <option value="Генерация идей">Генерация идей</option>
                <option value="Переводы">Переводы</option>
                <option value="Контент-стратегия">Контент-стратегия</option>
                <option value="Исследование рынка">Исследование рынка</option>
                <option value="Поддержка клиентов">Поддержка клиентов</option>
                <option value="Геймификация">Геймификация</option>
            </select>
            <label for="prompt-difficulty">Сложность:</label>
            <select id="prompt-difficulty" name="difficulty" required>
                <option value="Новичок">Новичок</option>
                <option value="Средний">Средний</option>
                <option value="Продвинутый">Продвинутый</option>
            </select>
            <label for="prompt-prompt">Промпт:</label>
            <textarea id="prompt-prompt" name="prompt" rows="5" required></textarea>
            <label for="prompt-prompt-en">Промпт (англ.):</label>
            <textarea id="prompt-prompt-en" name="prompt_en" rows="5"></textarea>
            <button type="submit">Сохранить</button>
        </form>
    </div>
</main>
<?php include '../includes/footer.php'; ?>