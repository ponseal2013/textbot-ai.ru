<?php

// Настройки базы данных
define('DB_HOST', 'localhost');
define('DB_USER', 'textbot');
define('DB_PASS', 'password');
define('DB_NAME', 'textbot_ai');

// Подключение
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if ($conn->connect_error) {
    exit('Ошибка подключения: '.$conn->connect_error);
}
