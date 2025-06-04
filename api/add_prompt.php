<?php

require_once __DIR__.'/../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        echo json_encode(['status' => 'error', 'message' => 'Неверный формат данных']);
        exit;
    }

    $stmt = $conn->prepare('INSERT INTO prompts (id, task, category, difficulty, prompt, prompt_en) VALUES (?, ?, ?, ?, ?, ?)');
    $stmt->bind_param('ssssss', $data['id'], $data['task'], $data['category'], $data['difficulty'], $data['prompt'], $data['prompt_en']);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Промпт добавлен']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Ошибка добавления']);
    }
}
