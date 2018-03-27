var TelegramBot = require('node-telegram-bot-api'); 
// Устанавливаем токен, который выдавал нам бот. 
var token = '520730300:AAEjZVCamCgGcuwqJSn_tZIH_SvrxINibrg'; 
// Включить опрос сервера 
var bot = new TelegramBot(token, {polling: true}); 

// Написать мне ... (/echo Hello World! - пришлет сообщение с этим приветствием.) 
/*var notes = [];
bot.onText(/напомни (.+) в (.+)/, function (msg, match) {
    var userId = msg.from.id;
    var text = match[1];
    var time = match[2];
    var curDate = new Date().getHours() + ':' + new Date().getMinutes();

    notes.push( { 'uid':userId, 'time':time, 'text':text } );

    bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не сдохну :) ' + curDate);
});
setInterval(function(){
    for (var i = 0; i < notes.length; i++){
        var curDate = new Date().getHours() + ':' + new Date().getMinutes();
            if ( notes[i]['time'] == curDate ) {
                bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
                notes.splice(i,1);
            }
        }
},1000);*/

////////////////////////////////////////////////////////////
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

///////////////////////////////////////////////////////////////////

/*var questions = [
  {
    title:'Сколько параметров можно передать функции ?',
    buttons: [
        [{ text: 'Ровно столько, сколько указано в определении функции.', callback_data: '0_1' }],
        [{ text: 'Сколько указано в определении функции или меньше.', callback_data: '0_2' }],
        [{ text: 'Сколько указано в определении функции или больше.', callback_data: '0_3' }],
        [{ text: 'Любое количество.', callback_data: '0_4' }]
      ],
    right_answer: 4
  },
  {
    title:'Чему равна переменная name?\nvar name = "пупкин".replace("п", "д")',
    buttons: [
        [{ text: 'дудкин', callback_data: '1_1' }],
        [{ text: 'дупкин', callback_data: '1_2' }],
        [{ text: 'пупкин', callback_data: '1_3' }],
        [{ text: 'ляпкин-тяпкин', callback_data: '1_4' }]
      ],
    right_answer: 2
  },
  {
    title:'Чему равно 0 || "" || 2 || true ?',
    buttons: [
        [{ text: '0', callback_data: '2_1' }],
        [{ text: '""', callback_data: '2_2' }],
        [{ text: '2', callback_data: '2_3' }],
        [{ text: 'true', callback_data: '2_4' }]
      ],
    right_answer: 3
  },
];

function getRandomQuestion(){
  return questions[Math.floor(Math.random()*questions.length)];
}

function newQuestion(msg){
  var arr = getRandomQuestion();
  var text = arr.title;
  var options = {
    reply_markup: JSON.stringify({
      inline_keyboard: arr.buttons,
      parse_mode: 'Markdown'
    })
  };
  chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
  bot.sendMessage(chat, text, options);
}

bot.onText(/\/start_test/, function (msg, match) {
  newQuestion(msg);
});

bot.on('callback_query', function (msg) {
  var answer = msg.data.split('_');
  var index = answer[0];
  var button = answer[1];

  if (questions[index].right_answer==button) {
    bot.sendMessage(msg.from.id, 'Ответ верный ✅');
  } else {
    bot.sendMessage(msg.from.id, 'Ответ неверный ❌');
  }

  bot.answerCallbackQuery(msg.id, 'Вы выбрали: '+ msg.data, true);
  newQuestion(msg);
});*/