<?php include '../includes/header.php'; ?>
<main class="container">
    <h2>Вход в админку</h2>
    <form action="dashboard.php" method="POST">
        <label for="username">Логин:</label>
        <input type="text" id="username" name="username" required>
        <label for="password">Пароль:</label>
        <input type="password" id="password" name="password" required>
        <button type="submit">Войти</button>
    </form>
</main>
<?php include '../includes/footer.php'; ?>