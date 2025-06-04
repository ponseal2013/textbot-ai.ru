<?php

$paymentId = $_GET['paymentId'] ?? '';
$email = $_GET['email'] ?? '';

if ($paymentId && $email) {
    // Логика отправки PDF на email
    $pdfUrl = 'https://textbot-ai.ru/pdf/generate_pdf.php?category=Копирайтинг';

    mail($email, 'Ваш PDF-файл', "Ссылка на подборку: $pdfUrl");
    echo '<p>Оплата прошла успешно! Ссылка на PDF выслана на ваш email.</p>';
} else {
    echo '<p>Ошибка в данных платежа.</p>';
}
