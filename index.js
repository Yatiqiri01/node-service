var express = require("express");
var bodyParser = require("body-parser");
var User = require("./Models/user").User;
var usrCtrl = require('./controllers/userCtrl');
var auth = require('./middlewares/auth');
var router_user = require('./routes-user');
var cors = require('cors')
var app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())

app.get('/user/all',usrCtrl.buscarUsuarios);
app.post("/user/insert", usrCtrl.insertarUsuario)
app.get("/user/:nombre", usrCtrl.buscarNombre)
app.put("/user/update", usrCtrl.actualizarUsuario)
app.delete("/user/delete/:nombre", usrCtrl.eliminarUsuario)
app.get("/", usrCtrl.mensaje)
app.get("/saludo", usrCtrl.primerMensaje)
app.post("/saludo", usrCtrl.mensajePost)
app.get("/params/:nombre/:apellido",usrCtrl.mensajeParam)
app.post('/logueo', usrCtrl.login);


app.get('/invocar',auth, usrCtrl.invoca)


app.get('/invocar',auth, (req,res)=>{
    User.find({},(err,crud)=>{
        if(!err){
            res.send(crud)
        }else {
            res.send(err)
        }
    })
})
app.use("/ejemplo",router_user)
app.listen(PORT, ()=>{
    console.log("Servidor Inicializado en :" + PORT)
})