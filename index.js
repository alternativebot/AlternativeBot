const Telegraf = require("telegraf");
const Brain = new (require("./lib/Brain"))();
const translit = require("./translit");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.on("message", (ctx) => {
	let message = ctx.message.text;
	message = translit(message);
	let replyMessage = (ctx.message.reply_to_message !== undefined ? ctx.message.reply_to_message.text : false);
	if (replyMessage !== false) replyMessage = translit(replyMessage);
	console.log(replyMessage);
	let out = Brain.run(message);
	if (replyMessage !== false) { Brain.Memory.addTrainingData(replyMessage, message); Brain.train(); return ctx.replyWithHTML("<b>Обучился</b>"); }
	else {
		if (out !== "") return ctx.reply(translit(out, true), Telegraf.Extra.inReplyTo(ctx.message.reply_to_message.message_id));
	}
});

bot.launch();