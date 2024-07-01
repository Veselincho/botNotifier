import cheerio from 'cheerio';
import fetch from 'node-fetch';
import notifier from 'node-notifier';
import dotenv from 'dotenv';
dotenv.config();

// Access the link variable from process.env
const tokenUrl = process.env.url;

async function tokenPrice() {
    const response = await fetch(tokenUrl);
    const body = await response.text();
    const $ = cheerio.load(body);
    const titleElement = $('head > title').text();
    const priceMatch = titleElement.match(/^(\d+\.\d+)/);
    

    if (priceMatch != null) {
      notifier.notify({
          title: 'TOKEN RELEASED',
          message: 'Perform goBuy',
      });

      console.log('Notification sent');
      setTimeout(() => {
          process.exit(); // Terminate the Node.js process
      }, 100);
  } else {
      console.log(priceMatch);
  }
}

setInterval(() => {
    tokenPrice();

}, 2000);
