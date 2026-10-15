const Uinbot = require("./app/Uinbot");
require("dotenv").config();

const token = process.env.TOKEN;
const options = {
  polling: true,
};
console.log("starting uinbot...");
const uinbot = new Uinbot(token, options);

const main = () => {
  console.log("checking feature...");
  uinbot.getSticker();
  uinbot.getFollow();
  uinbot.getQuote();
  uinbot.getCatInfo();
  uinbot.getAdvice();
  uinbot.getNews();
  uinbot.getQuake();
  uinbot.getHelp();
  console.log("feature ready...");
};
main();
console.log("bot is ready now!");
