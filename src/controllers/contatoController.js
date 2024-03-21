
const importacontato = require("../models/contatoModel")

exports.paginaInicial=(req , res )=>{
 res.render("contato",{contato:{}})
}
exports.register= async (req , res )=>{
   
   try {
    
    const Contato = new importacontato(req.body)
    await Contato.register()
    
     if(Contato.errors.length >0){
         req.flash("errors", Contato.errors)
         req.session.save(()=>{
         res.redirect("back")
     })
     return
    
 }
 req.flash("success", "Contato registrado com sucesso")
 req.session.save(()=>{
 res.redirect(`/contato/index/${Contato.contato._id}`)
 })
 return

   } catch (error) {
    console.log(error)
    res.render("404")
    console.log(typeof req.body._id)
   }

   
}

exports.editIndex = async function(req, res){
    const contato = await importacontato.buscaPorId(req.params.id)

    if(!req.params.id) {return res.render("404")}
    
    if(!contato) {return res.render("404")}
    res.render("contato", {contato})
}

exports.edit= async function(req, res){
   
    try {
        
    if(!req.params.id) {return res.render("404")}
    const contato = new importacontato(req.body)
    await contato.edit(req.params.id)

    if(contato.errors.length >0){
        req.flash("errors", contato.errors)
        req.session.save(()=>{
        res.redirect("back")
    })
    return
   
}
req.flash("success", "Contato editado com sucesso")
req.session.save(()=>{
res.redirect(`/contato/index/${contato.contato._id}`)
})
return

    } catch (error) {
        res.render(error)
    }
   
}

exports.del = async function(req,res){
    const contato = await importacontato.delete(req.params.id)
   

   // if(!req.params.id) {return res.render("404")}
    
    if(!contato) {return res.render("404")}
    req.flash("success", "Contato apagado com sucesso")
    req.session.save(()=>{
    res.redirect("back")
})
return
}

