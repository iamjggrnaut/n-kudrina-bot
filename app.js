const { Telegraf } = require("telegraf");
const fs = require("fs");
const path = require("path");
const https = require("https");

// Replace with your bot token
const BOT_TOKEN = "8120180800:AAFRC3tT_71o4bXkwD2Y3MbGjgC4NAn64e8";
const bot = new Telegraf(BOT_TOKEN);

// Temporary data storage
let userData = {};

// Command: Start
bot.start((ctx) => {
  const user = ctx.from;
  const userId = user.id;
  const userName = user.first_name;
  const userLastName = user.last_name || ""; // Если фамилия есть, используем ее, иначе пустая строка
  const userUsername = user.username || ""; // Если username есть, используем его, иначе пустая строка
  const userLanguageCode = user.language_code || ""; // Если language code есть, используем его, иначе пустая строка

  const managerMessage = `Пользователь, контактировавший с ботом:
    Фамилия и имя: ${userLastName} ${userName}
    Никнейм: ${userUsername}
    Ссылка на профиль: ${
      userUsername ? "https://t.me/" + userUsername : "отсутствует"
    }
    `;
  // Replace with manager's chat ID
  const MANAGER_CHAT_ID = "-4607631918";
  bot.telegram.sendMessage(MANAGER_CHAT_ID, managerMessage);

  ctx.reply(
    `
        Здравствуйте! Я бот N-KUDRINA. Я помогу вам узнать о наших курсах и записаться. 
        
        Курсы массажа "Серебряные аржентики" подходят для:

        • Профессионалов: Массажистов и терапевтов, желающих расширить свои знания и навыки, а также освоить новые техники для улучшения качества своих услуг.

        • Любителей: Людей, которые хотят научиться проводить массаж самостоятельно, чтобы заботиться о своем здоровье и благополучии в домашних условиях.

        • Тем, кто ищет расслабление: Всем, кто испытывает стресс и напряжение, и хочет научиться техникам самомассажа для снятия усталости и улучшения самочувствия.

        • Заботящихся о себе: Тем, кто стремится к гармонии и хочет интегрировать массаж в свою повседневную практику ухода за собой.

        Наши курсы доступны для всех уровней подготовки и помогут вам открыть мир массажа, будь вы профессионал или новичок!

        Что вас интересует?
        `,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Каталог курсов", callback_data: "catalog" },
            { text: "Обратный звонок", callback_data: "callback" },
            // { text: 'Записаться на курс', callback_data: 'register' },
          ],
          [
            { text: "Чат-поддержка", callback_data: "support" },
            { text: "Запросить презентацию", callback_data: "presentation" },
          ],
          [
            // { text: 'Отзывы', callback_data: 'reviews' },
          ],
        ],
      },
    }
  );
});

// Handler: Catalog
bot.action("catalog", (ctx) => {
  ctx.reply(
    `Наши курсы:

1. Массаж-скульптор для лица “Серебряные аржентики”
- Длительность: 1 день
- Стоимость в группе: 290,000 руб
- Стоимость индивидуального курса: 490,000 руб

2. Массаж-скульптор для тела “Серебряные аржентики”
- Длительность: 1 день
- Стоимость в группе: 290,000 руб
- Стоимость индивидуального курса: 490,000 руб

На все курсы доспуна рассрочка!


Выберите курс, чтобы узнать больше или записаться.`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Массаж-скульптор для лица “Серебряные аржентики”",
              callback_data: "course_face",
            },
            {
              text: "Массаж-скульптор для тела “Серебряные аржентики”",
              callback_data: "course_body",
            },
          ],
        ],
      },
    }
  );
});

// Course Details Handlers
bot.action("course_face", (ctx) => {
  ctx.reply(
    `Курс: Массаж-скульптор для лица “Серебряные аржентики”
- Практические техники лифтинга и сияния кожи.
- Использование серебряных аржентиков.

Что вы получите?

• Новые навыки: Освойте различные техники массажа, которые помогут вам не только в профессиональной деятельности, но и в повседневной жизни.

• Уверенность: Научитесь уверенно проводить массаж и помогать другим достигать состояния расслабления и гармонии.

• Забота о себе: Узнайте, как самомассаж может стать частью вашего ухода за собой и улучшить ваше физическое и эмоциональное состояние.

Не упустите возможность изменить свою жизнь и жизнь окружающих! Записывайтесь на курсы массажа "Серебряные аржентики" уже сегодня и откройте для себя мир здоровья, гармонии и благополучия!


- Стоимость в группе: 290,000 руб
- Стоимость индивидуального курса: 490,000 руб

Доступна рассрочка на все курсы!

Нажмите, чтобы записаться или узнать даты.`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Записаться", callback_data: "register_face" },
            // { text: 'Узнать даты', callback_data: 'dates_face' },
          ],
        ],
      },
    }
  );
});

bot.action("course_body", (ctx) => {
  ctx.reply(
    `Курс: Массаж-скульптор для тела “Серебряные аржентики”
- Расслабляющие и тонизирующие техники.
- Уникальные методики с аржентиками.

Что вы получите?

• Новые навыки: Освойте различные техники массажа, которые помогут вам не только в профессиональной деятельности, но и в повседневной жизни.

• Уверенность: Научитесь уверенно проводить массаж и помогать другим достигать состояния расслабления и гармонии.

• Забота о себе: Узнайте, как самомассаж может стать частью вашего ухода за собой и улучшить ваше физическое и эмоциональное состояние.

Не упустите возможность изменить свою жизнь и жизнь окружающих! Записывайтесь на курсы массажа "Серебряные аржентики" уже сегодня и откройте для себя мир здоровья, гармонии и благополучия!


- Стоимость в группе: 290,000 руб
- Стоимость индивидуального курса: 490,000 руб

Доступна рассрочка на все курсы!

Нажмите, чтобы записаться или узнать даты.`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Записаться", callback_data: "register_body" },
            // { text: 'Узнать даты', callback_data: 'dates_body' },
          ],
        ],
      },
    }
  );
});

// Registration Handler
bot.action(/register_(.+)/, (ctx) => {
  const course = ctx.match[1];
  userData[ctx.from.id] = { course, step: "name" };
  ctx.reply("Пожалуйста, напишите ваше имя:");
});

bot.on("text", (ctx) => {
  const user = userData[ctx.from.id];
  if (user && user.step === "name") {
    user.name = ctx.message.text;
    user.step = "phone";
    ctx.reply("Укажите ваш номер телефона:");
  } else if (user && user.step === "phone") {
    user.phone = ctx.message.text;
    user.step = null;

    // Send data to manager
    const managerMessage = `Новая заявка:
Имя: ${user.name}
Телефон: ${user.phone}
Курс: ${user.course}`;
    // Replace with manager's chat ID
    const MANAGER_CHAT_ID = "-4607631918";
    bot.telegram.sendMessage(MANAGER_CHAT_ID, managerMessage);

    ctx.reply(
      "Спасибо! Ваши данные отправлены менеджеру. Мы скоро свяжемся с вами."
    );
  }
  if (user && user.step === "callback") {
    // Находим номер телефона
    const phoneNumber = ctx.message.text;
    console.log(
      `Получен номер телефона от пользователя ${ctx.from.id}: ${phoneNumber}`
    );

    // Отправка номера телефона в группу
    const MANAGER_CHAT_ID = -4607631918; // Ваш `chat_id`
    const messageToManager = `Запрос на обратный звонок:\nИмя пользователя: ${ctx.from.first_name}\nНомер телефона: ${phoneNumber}`;

    // Логируем попытку отправки сообщения
    console.log(
      `Попытка отправки сообщения в группу менеджера: ${MANAGER_CHAT_ID}`
    );

    bot.telegram
      .sendMessage(MANAGER_CHAT_ID, messageToManager)
      .then(() => {
        console.log(
          `Сообщение отправлено в группу менеджера: ${MANAGER_CHAT_ID}`
        );
        ctx.reply(
          "Спасибо! Мы получили ваш номер телефона. Наш менеджер свяжется с вами в ближайшее время."
        );
      })
      .catch((err) => {
        console.error("Ошибка при отправке сообщения:", err);
        ctx.reply(
          "Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова."
        );
      });

    // Сброс состояния пользователя
    console.log(`Состояние пользователя ${ctx.from.id} сброшено.`);
    delete userData[ctx.from.id];
  }
  if (user && user.step === "ask_question") {
    // Получаем вопрос пользователя
    const question = ctx.message.text;
    console.log(`Пользователь ${ctx.from.id} задал вопрос: ${question}`);

    // Сохраняем вопрос и переходим к следующему шагу
    user.question = question;
    user.step = "ask_phone"; // Переходим к запросу номера телефона

    // Запрашиваем номер телефона с помощью клавиатуры с кнопкой для отправки контакта
    const phoneKeyboard = {
      reply_markup: {
        keyboard: [
          [
            {
              text: "Отправить номер телефона",
              request_contact: true, // Эта кнопка позволит отправить номер телефона
            },
          ],
        ],
        one_time_keyboard: true, // Закрыть клавиатуру после нажатия
        resize_keyboard: true, // Подстроить клавиатуру под экран
      },
    };

    ctx.reply(
      "Пожалуйста, отправьте ваш номер телефона, чтобы мы могли ответить на ваш вопрос.",
      phoneKeyboard
    );
  }
});

bot.on("contact", (ctx) => {
  const user = userData[ctx.from.id];

  if (user && user.step === "ask_phone") {
    // Получаем номер телефона пользователя
    const phoneNumber = ctx.message.contact.phone_number;
    console.log(
      `Пользователь ${ctx.from.id} указал номер телефона: ${phoneNumber}`
    );

    // Сохраняем номер телефона
    user.phone = phoneNumber;
    user.step = null; // Завершаем процесс

    // Отправка данных в группу
    const MANAGER_CHAT_ID = -4607631918; // Ваш chat_id
    const messageToManager = `Запрос от пользователя:
Имя: ${ctx.from.first_name}
Номер телефона: ${user.phone}
Вопрос: ${user.question}`;

    // Логируем отправку сообщения
    console.log(
      `Попытка отправки сообщения в группу менеджера: ${MANAGER_CHAT_ID}`
    );

    bot.telegram
      .sendMessage(MANAGER_CHAT_ID, messageToManager)
      .then(() => {
        console.log(
          `Сообщение отправлено в группу менеджера: ${MANAGER_CHAT_ID}`
        );
        ctx.reply("Спасибо за ваш вопрос! Мы скоро с вами свяжемся.");
      })
      .catch((err) => {
        console.error("Ошибка при отправке сообщения:", err);
        ctx.reply(
          "Произошла ошибка при отправке вашего вопроса. Пожалуйста, попробуйте снова."
        );
      });

    // Сброс состояния пользователя
    console.log(`Состояние пользователя ${ctx.from.id} сброшено.`);
    delete userData[ctx.from.id];
  }
});

// Обработка нажатия кнопки "callback"
bot.action("callback", (ctx) => {
  console.log(`Пользователь ${ctx.from.id} нажал на кнопку "Обратный звонок".`);

  // Сохраняем состояние пользователя
  userData[ctx.from.id] = { step: "callback" };
  console.log(
    `Сохранено состояние пользователя ${ctx.from.id}:`,
    userData[ctx.from.id]
  );

  ctx.reply("Напишите ваш номер телефона, чтобы мы могли перезвонить.");
});

// Support Handler
bot.action("support", (ctx) => {
  userData[ctx.from.id] = { step: "ask_question" };

  ctx.reply(
    `Часто задаваемые вопросы:
1. Как проходит курс? — Полностью практическое обучение.
2. Какие материалы мне понадобятся? — Только желание учиться, всё остальное предоставим мы.
3. Что я получу по окончании? — Сертификат и уникальные навыки.

Если у вас есть другой вопрос, напишите его, и мы ответим.`
  );
});

// Reviews Handler
bot.action("reviews", (ctx) => {
  ctx.reply(`Отзывы наших учеников:
- "Прекрасный курс, клиентам понравились новые техники!" — Анна
- "Эффективное обучение, уже применяю навыки." — Иван`);
});

// Presentation Handler
bot.action("presentation", async (ctx) => {
  const fileUrl = "https://arcanedevlab.ru/static/N-KUDRINA-presentation.pdf";
  const filePath = path.join(__dirname, "N-KUDRINA-presentation.pdf");

  ctx.reply("Производится отправка файла. Ожидайте, пожалуйста");

  https
    .get(fileUrl, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(filePath);
        res.pipe(fileStream);

        fileStream.on("finish", async () => {
          try {
            // Отправляем файл в Telegram
            await ctx.replyWithDocument({
              source: filePath,
              filename: "N-KUDRINA Presentation.pdf",
            });

            // Удаляем файл после отправки, если он не нужен
            fs.unlinkSync(filePath);
          } catch (err) {
            console.error("Ошибка при отправке файла:", err);
            ctx.reply(
              "Произошла ошибка при отправке файла. Пожалуйста, попробуйте позже."
            );
          }
        });
      } else {
        console.error("Ошибка при загрузке файла:", res.statusCode);
        ctx.reply("Не удалось загрузить файл. Пожалуйста, попробуйте позже.");
      }
    })
    .on("error", (err) => {
      console.error("Ошибка при скачивании файла:", err);
      ctx.reply(
        "Произошла ошибка при скачивании файла. Пожалуйста, попробуйте позже."
      );
    });
});

// Reminder Functionality Placeholder
// Add cron jobs or scheduled messages for reminders based on registrations

bot.launch();

console.log("Bot is running...");
