const path = require("path")
const express = require("express")
const route = express.Router()
const homeController = require("./src/controllers/homeController")
const {index, registers,login,logout } = require("./src/controllers/loginController")
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
let {paginaInicial,register,editIndex,edit,del} = require("./src/controllers/contatoController")

const mongoose = require("mongoose")
const csrf_Protect = require("./server.js")
const {csrfToken,csrfTokenErr,flashErrors,loginRequired} = require("./src/middleware/middleware.js")

mongoose.connect(process.env.connectData ).then(()=>{console.log("conectado ao bd")})
.catch(err=>console.log(err))
const csrf = require('csurf');

//app.use(helmet)

route.use(express.urlencoded({ extended: true }))

const sessionOptions= session({
    secret: 'ABC123DEF789ABC',
    store: MongoStore.create({
        mongoUrl: process.env.connectData,
        mongooseConnection: mongoose.connection,}),
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000*60*60*24*7,
        httpOnly: true

    }
})

route.use(sessionOptions)
route.use(flash())
route.use(csrf());
route.use(csrfTokenErr)
route.use(csrfToken)
route.use(flashErrors)
route.get("/index/", homeController.index)

//rotas de login


route.get("/login/home",index)
route.post("/login/register", registers)
route.post("/login/login", login)
route.get("/login/logout", logout)

//rotas de contato

route.get("/contato/index",loginRequired ,paginaInicial)
route.post("/contato/register", loginRequired,register )
route.get("/contato/index/:id",loginRequired ,editIndex)
route.post("/contato/edit/:id",loginRequired ,edit)
route.get("/contato/delete/:id",loginRequired ,del)

module.exports= route


