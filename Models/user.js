var mongoose = require("mongoose")

var Schema = mongoose.Schema;
var email_regx = [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Coloca un email valido"]
mongoose.connect("mongodb://localhost/subsidio")
/*
String
Number
Date
Buffer
Boolean
Mixed
ObjectId
Array
*/
var posbiles_valores = ['M','F'];
var tipos_beneficiarios = ['tutor','madre'];
var password_validation = {
    validator: (p)=>{
        return this.password_confirmation === p;
    },
    message: "Las contraseñas no coinciden"
}
var user_schema = new Schema({
    tipo: {
        type: String,
        enum: {
            values:tipos_beneficiarios,
            message: "Opciones no validas"}
    },
    nombre:String,
    apellidos:String,
    fechaHabilitacion: {
        type: Date,
        required:"El campo Fecha s requerido"
    },
    edad: {
        type: Number,
        max:[100, "La edad no puede ser mayor a 100"],
        min:[18, "La edad minima es de 18 años"]
    },
    "corresp.estado": String,
    "corresp.paquetes": Array,
    "corresp.paquetes[0].Paquete": Number,  
    "corresp.paquetes[0].fechaPaquete": Date,  
    "corresp.paquetes[0].estadoPaquete": String,
    /*"corresp.paquetes[1].Paquete": Number,  
    "corresp.paquetes[1].fechaPaquete": Date,  
    "corresp.paquetes[1].estadoPaquete": String,  
    "corresp.paquetes[2].Paquete": Number,  
    "corresp.paquetes[2].fechaPaquete": Date,  
    "corresp.paquetes[2].estadoPaquete": String,
    "corresp.paquetes[3].Paquete": Number,  
    "corresp.paquetes[3].fechaPaquete": Date,  
    "corresp.paquetes[3].estadoPaquete": String,
    /*,
    email:{type: String,
        required: "El campo es obligatorio",
        match: email_regx},
    edad: {
        type: Number,
        max:[100, "La edad no puede ser mayor a 100"],
        min:[18, "La edad minima es de 18 años"]
    },
    genero: {
        type: String,
        enum: {
            values:posbiles_valores,
            message: "Opciones no validas"}
    },
    password:{
        type: String,
        min: [5, "El password es muy corto"],
        validate: password_validation
    }*/
});
user_schema.virtual("password_confirmation").get(()=>{
    return this.p_c
}).set((password)=>{
    this.p_c = password;
})
var User = mongoose.model("Beneficiario", user_schema);

module.exports.User = User;
