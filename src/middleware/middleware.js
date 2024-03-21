const Login = require("../models/loginModel")

exports.flashErrors = (req, res, next) => {

    res.locals.errors = (req.flash("errors"))

    res.locals.success = (req.flash("success"))

    res.locals.user = req.session.user

    next()
}

exports.csrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()

}

exports.csrfTokenErr = (err, req, res, next) => {
    if (err) {
        res.render("404")
    }
    next()
}

exports.loginRequired= (req,res,next)=>{
if(!req.session.user){
req.flash("errors", "você precisa fazer login.")
req.session.save(()=>{
    res.redirect("/index")
})
return
}
next()
}