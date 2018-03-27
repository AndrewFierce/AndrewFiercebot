var TelegramBot = require('node-telegram-bot-api'); 
// Устанавливаем токен, который выдавал нам бот. 
var token = '520730300:AAEjZVCamCgGcuwqJSn_tZIH_SvrxINibrg'; 
// Включить опрос сервера 
var bot = new TelegramBot(token, {polling: true}); 

var number1 = '';
var number2 = '';
var operand = '';

var options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'AC', callback_data: 'reset' }, { text: '+', callback_data: '+' }, { text: '-', callback_data: '-' }],
      [{ text: '7', callback_data: 7 }, { text: '8', callback_data: 8 }, { text: '9', callback_data: 9 }],
      [{ text: '4', callback_data: 4 }, { text: '5', callback_data: 5 }, { text: '6', callback_data: 6 }],
      [{ text: '1', callback_data: 1 }, { text: '2', callback_data: 2 }, { text: '3', callback_data: 3 }],
      [{ text: '', callback_data: 'null' }, { text: '0', callback_data: 0 }, { text: '=', callback_data: '=' }]
    ]
  })
};

bot.onText(/start_test/, function (msg, match) {
  bot.sendMessage(msg.chat.id, '0', options);
  bot.editMessageText('123', { chat_id: msg.chat.id, message_id: msg.id });
});

bot.on('callback_query', function (msg) {
  if (msg.data == '+') {
    operand = '+';
    number2 = number1;
    number1 = '';
  }
  else if (msg.data == '-') {
    operand = '-';
    number2 = number1;
    number1 = '';
  }
  else if (msg.data == '=') {
    if (operand == '+') {
      bot.sendMessage(msg.from.id, parseInt(number1)+parseInt(number2));
    }
    else if (operand == '-') {
      bot.sendMessage(msg.from.id, parseInt(number2)-parseInt(number1));
    }
    number1 = 0;
    number2 = 0;
    operand = '';
  }
  else if (msg.data == 'reset') {
    number1 = 0;
    number2 = 0;
    operand = '';
  }
  else {
    number1 = number1 + msg.data;
  }
  
});
