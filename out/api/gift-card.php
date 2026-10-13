<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $status, string $message): never
{
    http_response_code($status);
    echo json_encode(['message' => $message], JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, 'Method not allowed.');
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 8192) {
    respond(413, 'Request is too large.');
}

$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody ?: '', true);
if (!is_array($data)) {
    respond(400, 'Invalid request.');
}

// Quietly accept bot submissions caught by the hidden field.
if (trim((string) ($data['website'] ?? '')) !== '') {
    respond(200, 'Request sent successfully.');
}

function clean_field(array $data, string $key, int $maxLength): string
{
    $value = trim((string) ($data[$key] ?? ''));
    if ($value === '' || strlen($value) > $maxLength) {
        respond(422, 'Please check all required fields.');
    }
    return $value;
}

$firstName = clean_field($data, 'firstName', 60);
$lastName = clean_field($data, 'lastName', 60);
$email = clean_field($data, 'email', 160);
$phone = clean_field($data, 'phone', 40);
$purchaseDate = clean_field($data, 'purchaseDate', 10);
$amount = (int) ($data['amount'] ?? 0);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, 'Please enter a valid email address.');
}
if (!preg_match('/^[0-9+().\-\s]{7,40}$/', $phone)) {
    respond(422, 'Please enter a valid phone number.');
}
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $purchaseDate)) {
    respond(422, 'Please enter a valid purchase date.');
}
if (!in_array($amount, [50, 100, 150, 200, 250], true)) {
    respond(422, 'Please choose a valid gift card amount.');
}

// Lightweight protection against repeated submissions from the same IP.
$rateKey = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . '|miumiu-gift-card');
$rateFile = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $rateKey;
if (is_file($rateFile) && (time() - (int) filemtime($rateFile)) < 10) {
    respond(429, 'Please wait a moment before sending another request.');
}
$botToken = (string) (getenv('TELEGRAM_BOT_TOKEN') ?: '');
$chatId = (string) (getenv('TELEGRAM_CHAT_ID') ?: '');
$configPath = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'telegram-config.php';

if (($botToken === '' || $chatId === '') && is_file($configPath)) {
    $config = require $configPath;
    if (is_array($config)) {
        $botToken = $botToken ?: (string) ($config['bot_token'] ?? '');
        $chatId = $chatId ?: (string) ($config['chat_id'] ?? '');
    }
}

if ($botToken === '' || $chatId === '') {
    error_log('Miu Miu gift card: Telegram credentials are not configured.');
    respond(503, 'Gift card notifications are being configured. Please call the salon for now.');
}

@touch($rateFile);

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

$fullName = strtoupper($firstName . ' ' . $lastName);
$message = implode("\n", [
    '🎁 <b>NEW GIFT CARD REQUEST</b>',
    '',
    '💵 <b>Amount:</b> $' . $amount,
    '👤 <b>Name:</b> ' . escape_html($fullName),
    '✉️ <b>Email:</b> ' . escape_html($email),
    '📞 <b>Phone:</b> ' . escape_html($phone),
    '📅 <b>Purchase date:</b> ' . escape_html($purchaseDate),
    '',
    'Submitted: ' . gmdate('M j, Y g:i A') . ' UTC',
]);

$telegramUrl = 'https://api.telegram.org/bot' . rawurlencode($botToken) . '/sendMessage';
$payload = json_encode([
    'chat_id' => $chatId,
    'text' => $message,
    'parse_mode' => 'HTML',
    'disable_web_page_preview' => true,
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

if (function_exists('curl_init')) {
    $curl = curl_init($telegramUrl);
    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_TIMEOUT => 12,
    ]);
    $telegramResponse = curl_exec($curl);
    $httpStatus = (int) curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    $curlError = curl_error($curl);
    curl_close($curl);
} else {
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\n",
            'content' => $payload,
            'timeout' => 12,
            'ignore_errors' => true,
        ],
    ]);
    $telegramResponse = @file_get_contents($telegramUrl, false, $context);
    $statusLine = $http_response_header[0] ?? '';
    preg_match('/\s(\d{3})\s/', $statusLine, $statusMatch);
    $httpStatus = isset($statusMatch[1]) ? (int) $statusMatch[1] : 0;
    $curlError = $telegramResponse === false ? 'HTTP request failed' : '';
}

$telegramResult = is_string($telegramResponse) ? json_decode($telegramResponse, true) : null;
if ($curlError !== '' || $httpStatus < 200 || $httpStatus >= 300 || !is_array($telegramResult) || ($telegramResult['ok'] ?? false) !== true) {
    error_log('Miu Miu gift card Telegram error: HTTP ' . $httpStatus . ' ' . $curlError);
    respond(502, 'We could not notify the salon. Please call us or try again.');
}

respond(200, 'Request sent successfully.');
