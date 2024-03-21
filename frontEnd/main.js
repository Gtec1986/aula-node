import Validator from 'validator'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './assets/css/style.css'
let erro = false
let mensagemAlerta = document.querySelector(".mensagem")
function validaCadastro(form) {
    this.form = document.querySelector(form)





    this.form.addEventListener("submit", e => {
        e.preventDefault()
        let el = e.target

        let inputEmail = el.querySelector(".email").value
        let inputPassword = el.querySelector(".password").value
        let mensagemAlerta = el.querySelector(".mensagem")
        if (Validator.isEmail(inputEmail) === false) {

            mensagemAlerta.innerText = "este seu email é invalido"
            erro = true
            setTimeout(redireciona, 3000)

        }
        if (inputPassword.length < 3 || inputPassword.length > 30) {
            mensagemAlerta.innerText = "a senha tem de ter entre 3 e 30 caracteres"; erro = true

            setTimeout(redireciona, 3000)
        }

        if (erro === false) { el.submit() }

    })




}
function redireciona() {
    erro = false
    let formLogin = new validaCadastro(".form-login")
    let formCadastro = new validaCadastro(".form-register")
}

redireciona()





//alert(inputEmail.value)






