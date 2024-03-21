require("dotenv").config()
const express = require("express")
const app = express()
const helmet= require("helmet")
const routes = require("./routes")
const path = require('path')
const cookieParser = require('cookie-parser')
const {meumiddleware, csrfToken} = require("./src/middleware/middleware")

app.use(routes)
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname,"public")))
app.set("views", path.resolve(__dirname, "src", "views"))
app.set("view engine", "ejs" )

app.listen(3003, console.log('127.0.0.1:3003/index/'))


