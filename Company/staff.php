<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "staff";

// 建立連線
//$conn = new mysql($servername, $username, $password, $database);

// 檢查連線
/*
if($conn->connect-error){
    die("連線失敗:".$conn->connect-error);
    }
    echo "成功連線 MySQL!";
    // 關閉連線
    $conn->close();
    ?>
    */
try{        
    $conn = new PDO("mysql:host=$severname;dbname=$database;charset=utf8mb4", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "成功連線 MySQL!";
}
catch(PDOException $e){
    die("連線失敗:" .$e->getMessage());
}
?>