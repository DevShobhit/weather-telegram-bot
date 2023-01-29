# Telegram Bot

Simple Telegram Bot to fetch weather details

# Local Environment Setup

- Clone Repo using `git clone `
- Install necessary dependencies using `npm install`
- Generate BOT TOKEN using BOTFATHER
- Set the generated token in the `.env` file
- Also set the Api key for the weather api in `.env` file
- Start the app using `npm start`

# Features

- Bot can tell current weather in predefined format using latitude and longitude provided in the code
- Bot can show available commands to user
- Bot can remind weather after a fixed duration of time
- User can stop the reminder

# Tech Stack Used

- NodeJS
- Azure (For Hosting)

# Others

After Hosting the app set webhook using the `https://api.telegram.org/bot<your-bot-token>/setWebhook?url=<your-deployed-site-url>`
