document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('premium-form');
    const content = document.getElementById('premium-content');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('premium-password').value;
            
            // Пример проверки пароля (заменить на реальную логику)
            if (password === 'premium123') {
                content.style.display = 'block';
                alert('Доступ разрешён!');
            } else {
                alert('Неверный пароль');
            }
        });
    }
});