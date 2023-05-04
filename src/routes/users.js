const express = require('express'); // se inyecta la dependencia de express
const router = express.Router(); // Se genera la instancia del router
const mongoose = require('mongoose') // se inyecta dependecia de mongoose
let User = require('../models/users'); // Se inyecta la dependencia del modelo ya creado

// Se agrega la primera ruta llamada gente con el metodo GET
router.get('/usuarios',async (req, res)=>{
    const Users = await User.find({}); 
    res.render('index.ejs',{Users}); //renderiza la vista index.ejs
});

//Endpoint para renderizar el formulario de agregar alumnos
router.get('/addUser', function(req,res){
    res.render('addUser');
});

//Endpoint con metodo POST para agregar un nuevo registro a la bd de MONGO DB Atlas
router.post('/addUser', function(req,res){
    const newUser = User ({
        name: req.body.name, 
        email: req.body.email,
        password: req.body.password
    }); 

    newUser
    .save()
    .then ((data)=>{res.redirect('/usuarios')})
    .catch((error)=> {res.json({message:error})});
});

module.exports = router; //Se exporta el routeador