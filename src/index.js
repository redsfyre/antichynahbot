const TelegramBot = require('node-telegram-bot-api');
const token = 'BOT_TOKEN';
const bot = new TelegramBot(token, {polling: true});
const containsChinese = require('contains-chinese');
const express = require('express');
const app     = express();
require('dotenv').config();

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

bot.onText(/\/start/, (msg) => {
	bot.sendMessage(msg.chat.id, "Sen yeter ki başlamak iste :)");
});


bot.onText(/\/help/, (msg) => {
	bot.sendMessage(msg.chat.id, "Çok detaylandırılacak bi özelliğim yok. Kullanmayı bilmiyorsanız kullanmayın.");
});


bot.on("message", (msg) => {

    if(containsChinese(msg.text) === true){
        bot.sendMessage(msg.chat.id, 
                        "Kurallarımız var ve sen bazılarına uymamış gibi görünüyorsun." + 
                        " Bu yüzden seninle yollarımızı ayırıyoruz." + 
                        " Güle güle " + msg.from.first_name);
        bot.kickChatMember(msg.chat.id, msg.from.id);
        bot.deleteMessage(msg.chat.id, msg.message_id);
    
    }
});


bot.on("message", (msg) => {

    if(containsChinese(msg.from.first_name&&msg.from.last_name) === true){
        bot.sendMessage(msg.chat.id, 
                        "Kurallarımız var ve sen bazılarına uymamış gibi görünüyorsun." + 
                        " Bu yüzden seninle yollarımızı ayırıyoruz." + 
                        " Güle güle " + msg.from.first_name);
        bot.kickChatMember(msg.chat.id, msg.from.id);
        bot.deleteMessage(msg.chat.id, msg.message_id);
    
    }
});





// ------------------Error Handling----------------------
bot.on('polling_error', (err)=>{
	console.log(err); // =>'EFATAL'
});

bot.on('uncaughtException', (error) => {
		console.log("NODE_CODE:",error.code);
		console.log("MSG:",error.message);
		console.log("STACK:",error.stack);	
});
 
