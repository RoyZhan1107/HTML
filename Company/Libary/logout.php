<?php
session_start();
session_destroy(); // 清除 Session
header("Location: login.php"); // 轉跳回登入頁面
exit();
?>
