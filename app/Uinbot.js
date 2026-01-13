const TelegramBot = require("node-telegram-bot-api");
const commands = require("../libs/commands");
const { helpText, invalidCommand } = require("../libs/constant");

class Uinbot extends TelegramBot {
  constructor(token, options) {
    super(token, options);
    this.on("message", (data) => {
      // validasi command!
      const isInCommand = Object.values(commands).some((keyword) =>
        keyword.test(data.text)
      );
      if (!isInCommand) {
        console.log(
          `Invalid Command Executed By ${data.from.username} => ${data.text}`
        );
        this.sendMessage(data.from.id, invalidCommand, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Panduan pengguna",
                  callback_data: "go_help",
                },
              ],
            ],
          },
        });
      }
    });
    this.on("callback_query", (callback) => {
      const callbackName = callback.data;
      if (callbackName == "go_help") {
        this.sendMessage(callback.from.id, helpText);
      }
    });
  }
  // sticker command
  getSticker() {
    this.on("sticker", (data) => {
      console.log("getSticker Executed By " + data.from.username);
      this.sendMessage(data.from.id, data.sticker.emoji);
    });
  }
  // command untuk mengikuti kata kata
  getFollow() {
    this.onText(commands.follow, (data, after) => {
      console.log(
        "getFollow Executed By: " + data.from.username + "\nsaid:" + after[1]
      );
      this.sendMessage(data.from.id, `kata katamu${after[1]}`);
    });
  }
  // command untuk quote
  getQuote() {
    this.onText(commands.quote, async (data) => {
      console.log("getQuote Executed By " + data.from.username);
      const quoteEndpoint = "https://api.kanye.rest/";
      try {
        const apiCall = await fetch(quoteEndpoint);
        const { quote } = await apiCall.json();

        this.sendMessage(data.from.id, quote);
      } catch (error) {
        this.sendMessage(data.from.id, `Sorry, try again later`);
      }
    });
  }
  // command untuk info kucing
  getCatInfo() {
    this.onText(commands.cat, async (data) => {
      console.log("getCatInfo Executed By " + data.from.username);
      const catEndpoint = "https://catfact.ninja/fact";
      try {
        const apiCall = await fetch(catEndpoint);
        const { fact } = await apiCall.json();

        this.sendMessage(data.from.id, fact);
      } catch (error) {
        this.sendMessage(data.from.id, "Sorry, try again later");
      }
    });
  }
  // command nasihat
  getAdvice() {
    this.onText(commands.advice, async (data) => {
      console.log("getAdvice Executed By " + data.from.username);
      const adviceEndpoint = "https://api.adviceslip.com/advice";
      try {
        const apiCall = await fetch(adviceEndpoint);
        const response = await apiCall.json();

        this.sendMessage(data.from.id, response.slip.advice);
      } catch (error) {
        this.sendMessage(data.from.id, "Sorry, try again later");
      }
    });
  }
  // command kabar terbaru
  getNews() {
    this.onText(commands.news, async (data) => {
      console.log("getNews Executed By " + data.from.username);
      const newsEndpoint = "https://jakpost.vercel.app/api/category/indonesia";
      this.sendMessage(data.from.id, "Please wait...");
      try {
        const apiCall = await fetch(newsEndpoint);
        const response = await apiCall.json();
        const showNews = 2;

        for (let i = 0; i < showNews; i++) {
          const news = response.posts[i];
          const { title, image, headline } = news;
          this.sendPhoto(data.from.id, image, {
            caption: `${title}\n\nHeadline:\n${headline}`,
          });
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
  // command kabar gempa
  getQuake() {
    const quakeEndpoint = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";
    try {
      this.onText(commands.quake, async (data) => {
        console.log("getQuake Executed By " + data.from.username);
        const apiCall = await fetch(quakeEndpoint);
        const response = await apiCall.json();
        const { gempa } = response.Infogempa;
        const { Tanggal, Jam, Magnitude, Wilayah, Kedalaman } = gempa;

        this.sendMessage(
          data.from.id,
          `Pada tanggal ${Tanggal}\npukul ${Jam}\nterjadi gempa berkekuatan ${Magnitude} SR\n${Wilayah} dengan kedalaman ${Kedalaman} `
        );
      });
    } catch (error) {
      console.error(error);
      this.sendMessage(data.from.id, "Sorry, try again later");
    }
  }
  getHelp() {
    this.onText(commands.help, async (data) => {
      const botProfile = await this.getMe();
      console.log("getHelp Executed By " + data.from.username);
      this.sendMessage(data.from.id, helpText);
    });
  }
}

module.exports = Uinbot;
