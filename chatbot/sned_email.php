<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if(isset(data["chatLog"])){
        $chatLog = $data["chatLog"];
        $to = "your_email@example.com"; // 收件人
        $subject = "聊天機器人聊天紀錄";
        $headers = "From: no-reply@example.com\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        // 發送郵件
        if(mail($to, $subject, $chatLog, $headers)){
            echo "聊天紀錄已成功寄送!";
        }else{
            echo "無法寄送郵件，請檢察伺服器設定";
        }
    }
        else{
            echo "無效的請求，缺少聊天紀錄";
        }
    }
        else{
            echo "僅支援 POST 請求";
        }
?>