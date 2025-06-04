# TextBot-AI

**Цель проекта:**  
Создать платформу с бесплатными промптами для ИИ, премиум-контентом, PDF-подборками, админкой и SEO-оптимизацией.

---

## 📁 Структура проекта
textbot-ai.ru/
├── admin/ # Панель управления
│ ├── login.php # Форма входа
│ └── dashboard.php # Добавление промптов
├── assets/ # Статика
│ ├── data/ # JSON с промптами
│ ├── css/ # Стили
│ └── js/ # Скрипты
├── includes/ # PHP-включения
│ ├── config.php # Конфигурация БД
│ ├── header.php # Шапка сайта
│ └── footer.php # Подвал сайта
├── index.php # Главная
├── premium.php # Премиум-раздел
├── .htaccess # Правила перезаписи
├── site.webmanifest # PWA-конфигурация
└── README.md # Документация

---

## 🧪 Установка

1. **Установите LAMP-стек:**
   ```bash
   sudo apt install apache2 mysql-server php php-cli php-mysql php-curl php-gd php-mbstring php-xml php-zip

2. Создайте базу данных:
  sudo mysql -u root -p -e "CREATE DATABASE textbot_ai; CREATE USER 'textbot'@'localhost' IDENTIFIED BY 'password'; GRANT ALL PRIVILEGES ON textbot_ai.* TO 'textbot'@'localhost'; FLUSH PRIVILEGES;"

3. Запустите миграции (вручную или через SQL):
  CREATE TABLE prompts (
  id VARCHAR(50) PRIMARY KEY,
  task TEXT,
  category VARCHAR(50),
  difficulty VARCHAR(20),
  prompt TEXT,
  prompt_en TEXT
);

4. Перенесите проект:
  sudo cp -r /home/sergey/MyProject/2025/Qwen/textbot-ai.ru/* /var/www/html/
  sudo chown -R www-data:www-data /var/www/html
  sudo chmod -R 755 /var/www/html

5. Активируйте перезапись URL:
  sudo a2enmod rewrite
  sudo systemctl restart apache2

6. Подключите шрифты:
  Скачайте Inter и Roboto и положите в /assets/fonts/


🛠 Технологии
HTML / CSS / JS — клиентская часть
PHP / MySQL — серверная логика
Apache / FastPanel — сервер
dompdf — генерация PDF
Netlify CMS / GitLab — управление контентом (опционально)

📌 Установка зависимостей
1. Установите Composer
  curl -sS https://getcomposer.org/installer  | php
  sudo mv composer.phar /usr/local/bin/composer

2. Установите dompdf
  cd /var/www/html/pdf
  composer require dompdf/dompdf