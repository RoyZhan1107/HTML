<?php
session_start(); // 啟動 Session

$servername = "sql207.infinityfree.com";
$username = "if0_38225053";
$password = "nvGsFNwP4ITGL";
$database = "staff";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database;charset=utf8mb4", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $input_username = $_POST['username'];
        $input_password = $_POST['password'];

        // 檢查帳號是否存在
        $stmt = $conn->prepare("SELECT * FROM username WHERE username = :username");
        $stmt->bindParam(':username', $input_username);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($input_password, $user['password'])) {
            // 登入成功
            $_SESSION['username'] = $user['username'];
            header("Location: welcome.php"); // 轉跳到歡迎頁面
            exit();
        } else {
            echo "帳號或密碼錯誤！";
        }
    }
} catch (PDOException $e) {
    die("錯誤：" . $e->getMessage());
}
?>
