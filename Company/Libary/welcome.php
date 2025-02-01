<?php
session_start();
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <title>歡迎頁面</title>
</head>
<body>
    <h2>歡迎, <?php echo htmlspecialchars($_SESSION['username']); ?>！</h2>
    <a href="logout.php">登出</a>
</body>
</html>
