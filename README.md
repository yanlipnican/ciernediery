# Ciernediery bot

Bot that handles [ciernediery.sk](https://eshop.ciernediery.sk). Webapp is currently running at [ciernediery-bot.herokuapp.com](https://ciernediery-bot.herokuapp.com/).

## Features

- [x] Notify users when new product is available
- [ ] Subscribe to emails

## Development

Add following env variables from heroku to `.env` file or copy `.env.template`

- `GMAIL_USER`
- `GMAIL_PASSWORD`
- `REDISTOGO_URL`

### Web

Simple express app `web.js` is hosted on heroku.

### Check

`check.js` will retrieve new products and send emails. Both lists are in redis database. Check is executed periodically from heroku scheduler.

### Show products

```
node show_products.js
```