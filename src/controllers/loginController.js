const Login = require("../models/loginModel")


exports.index = (req, res, next) => {
    if(req.session.user) return res.render("login-logado")
    res.render("login")
}

exports.registers = async (req, res) => {
    try {
        const login = new Login.Login(req.body)

        await login.register()

        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(() => {
                return res.redirect('back')
            })
            return
        }
        if (login.user !== null) {
            req.flash('success', "seu usuario já foi criado")
            req.session.save(() => {

                return res.redirect('back')
            })
        }

        // await res.send(login.user)

    } catch (error) {
        console.log(error)
        return res.render('404')
    }


}


exports.login = async (req, res) => {
    try {
        const login = new Login.Login(req.body)

        await login.login()

        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(() => {
                return res.redirect('back')
            })
            return
        }
        if (login.user !== null) {
            req.flash('success', "esta logado")
            req.session.user = login.user
            
            req.session.save(() => {

                return res.redirect('/login/home')
            })
        }

        // await res.send(login.user)

    } catch (error) {
        console.log(error)
        return res.render('404')
    }


}

exports.logout =(req, res)=>{
req.session.destroy()
res.redirect("/login/home")

}