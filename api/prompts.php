<?php

require_once __DIR__.'/../includes/config.php';

$category = $_GET['category'] ?? '';
$difficulty = $_GET['difficulty'] ?? '';
$search = $_GET['search'] ?? '';

$sql = 'SELECT * FROM prompts WHERE 1=1';
$params = [];

if ($category) {
    $sql .= ' AND category = ?';
    $params[] = $category;
}

if ($difficulty) {
    $sql .= ' AND difficulty = ?';
    $params[] = $difficulty;
}

$stmt = $conn->prepare($sql);

if ($params) {
    $stmt->bind_param(str_repeat('s', count($params)), ...$params);
}

$stmt->execute();
$result = $stmt->get_result();
$prompts = [];

while ($row = $result->fetch_assoc()) {
    $prompts[] = $row;
}

echo json_encode($prompts);
