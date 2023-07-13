//importamos express e iniciamos variable
var express = require('express');
var app = express ();

//importamos las librerias mysql
var mysql = require ('mysql');
var cors = require ('cors')
var bodyParser = require('body-parser');

//indicamos el uso de cors
app.use(cors())

//indicamos el json y url
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
//indicamos que aceptamos peticiones del puerto 3000
//set port
app.listen(3000,function (){
    console.log('Node app is running on port 3000');
});
module.exports=app;

//establecemos la conexion con la BD
var dbConn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'super3',
    database:'breaky1'
});
app.get('/', function (req,res){
    return res.send({error:true, message:'hello'})
});
// APP LOGIN
app.post('/loginUser', function (req,res){
    let nom = req.body.nom;
    let password = req.body.password;

    dbConn.query ('SELECT * FROM users where nom=? and password=?', [nom, password], function (error, results, fields){
        if (error) throw error;
        if(results.length>0){
            return res.send({error: false, data: results, message: "Login incorrecto."});
        }else{
            return res.send({error: false, data: results, message: "Login Correcto."});
        }
    });
});

//APP REGISTRO USUARIO
app.post ('/registrarUsuario', function (req,res){
    let name  = req.body.nombre;
    let surname  = req.body.apellido;
    let phone   = req.body.telefono;
    let email   = req.body.mail;
    let pass   = req.body.contrasena;
    let address   = req.body.direccion;
    let postal = req.body.codigo_postal;
    //EN VIOLETA ABAJO SON LOS ID DE LA BASE DE DATOS
    dbConn.query('SELECT * FROM usuarios WHERE mail=?', [email], function (error,results, fields){
        if(error)throw error;
        if(results.length>0){
            return res.send({error:true, message:'ERROR, Este email ya esta registrado'});
        }else {
            dbConn.query('INSERT INTO usuarios set?', {nombre: name, apellido:surname, telefono :phone,mail:email, contrasena: pass,
                direccion:address,codigo_postal:postal}, function (error, results, fields) {
                if (error) throw error;
                return res.send({error: false, data: results, message: 'REGISTRO CORRECTO.'});
            });
        }
    });
});
