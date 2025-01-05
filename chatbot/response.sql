CREATE DATABASE chatbot;

USE chatbot;

CREATE TABLE responses(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_input VARCHAR(255) NOT NULL,
    bot_response TEXT NOT  NULL
);

INSERT INTO response (user_input, bot_response) VALUES
("你好": "您好!有什麼可以幫助您的嗎?",)
("你是誰": "我是您的聊天機器人!",)
("天氣如何": "您可以查詢當地的天氣網站，我建議使用 windy，<a href='https://www.windy.com/24.999/121.499?24.858,121.499,10/' target='_blank'>點擊這裡查看天氣</a>");