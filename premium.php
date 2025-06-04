<?php include 'includes/header.php'; ?>
<main class="container" style="display: flex; flex-direction: column; align-items: center;">
    <h2 style="text-align: center;">Премиум-промпты</h2>
    <p style="text-align: center;">Для доступа введите свой email и пароль:</p>
    <form id="premium-form" style="max-width: 400px; width: 100%;">
        <label for="email">Email:</label>
        <input type="email" id="email" placeholder="Ваш email" required>
        <label for="premium-password">Пароль:</label>
        <input type="password" id="premium-password" placeholder="Пароль" required>
        <button type="submit" style="margin: 15px auto;">Открыть доступ</button>
    </form>
    <div id="premium-content" style="display: none; text-align: center;">
        <p>Здесь будет премиум-контент.</p>
    </div>
</main>
<?php include 'includes/footer.php'; ?>