<?php

// ЮKassa API
require_once __DIR__.'/../vendor/autoload.php';
use YooKassa\Client;

$client = new Client();
$client->setAuth('ВАШ_SHOP_ID', 'ВАШ_SECRET_KEY');

$payment = $client->createPayment([
    'amount' => ['value' => '199.00', 'currency' => 'RUB'],
    'confirmation' => ['type' => 'redirect', 'return_url' => 'https://textbot-ai.ru/payment/success.php'],
    'description' => 'PDF-подборка промптов',
    'metadata' => ['email' => $_POST['email']],
], uniqid());

header('Location: '.$payment->getConfirmation()->getConfirmationUrl());
exit;
