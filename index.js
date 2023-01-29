const express = require('express')
const axios = require('axios')
const TelegramBot = require('node-telegram-bot-api')
require('dotenv').config()

const appID = process.env.APPID
const token = process.env.BOTTOKEN
let lat = 28.7041
let long = 77.1025
let interval = ''
const HELP =
  '/help : Shows commands related to the bot \n /weather: Shows current weather in Delhi \n /remind: Tells weather every hour \n  /stop:Stops the reminder'

const bot = new TelegramBot(token, { polling: true })
function fetchWeatherData() {
  return axios.get(
    `http://api.weatherapi.com/v1/current.json?q=${lat},${long}&key=${appID}`
  )
}

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, HELP)
})

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, HELP)
})

bot.onText(/\/weather/, async (msg) => {
  const res = await fetchWeatherData()
  const data = `condition: ${res.data.current.condition.text} \n
  Temp: ${res.data.current.temp_c} C \n
  WindSpeed: ${res.data.current.wind_kph} km/hr \n
Humidity: ${res.data.current.humidity} \n
Cloud: ${res.data.current.cloud} \n
FeelsLike:${res.data.current.feelslike_c} C`
  bot.sendMessage(msg.chat.id, data)
})

bot.onText(/\/remind/, (msg) => {
  interval = setInterval(async () => {
    const res = await fetchWeatherData()
    const data = `condition: ${res.data.current.condition.text} \n
    Temp: ${res.data.current.temp_c} C \n
    WindSpeed: ${res.data.current.wind_kph} km/hr \n
    Humidity: ${res.data.current.humidity} \n
    Cloud: ${res.data.current.cloud} \n
    FeelsLike:${res.data.current.feelslike_c} C`
    bot.sendMessage(msg.chat.id, data)
  }, 3600000)
  bot.sendMessage(msg.chat.id, 'Cool, Will remind you after every hour')
})

bot.onText(/\/stop/, (msg) => {
  clearInterval(interval)
  bot.sendMessage(msg.chat.id, 'Stopped the reminder')
})
