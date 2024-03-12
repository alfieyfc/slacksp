if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const fs = require('fs');

const { WebClient } = require('@slack/web-api');
const slack_web_client = new WebClient(process.env.SLACK_TOKEN)
// console.log(slack_web_client)
const slack_channel = process.env.SLACK_CHANNEL
console.log(slack_channel)

var message
try {
  message = fs.readFileSync('./message.md', 'utf8');
} catch (err) {
  console.log(err)
  console.log(`\nNo message.md provided. Trying example.md...\n`)
  try {
    message = fs.readFileSync('./example.md', 'utf8');
  } catch (err)  {
    console.log(err)
    console.log(`\nCannot find example.md. Aborting...`)
    process.exit(1)
  }
}

slack_web_client.chat.postMessage({
  channel: slack_channel,
  text: `${message}`,
}, (err) => {
  console.log(err);
});
