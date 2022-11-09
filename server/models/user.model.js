const mongoose = require('mongoose');
const bcrypt = require('bcrypt') //Importación de bcrypt -> npm install bcrypt

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Nombre es obligatorio"]
    },
    lastName: {
        type: String,
        required: [true, "Apellido es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "email es obligatorio"],
        vaidate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Ingrese un email válido"
        },
        unique: true //Unique no nos va a guardar cuando un email se repite pero no es un validador!
    },
    password: {
        type: String,
        required: [true, "Password es obligatorio"],
        minlenght: [8, "Password debe de tener al menos 8 caracteres"]
    }
}, {timestamps: true, versionKey: false})

//Virtual permite crear un atributo temporal
UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword) // el _ es porque es una variable virtual
    .set( value => this._confirmPassword = value);

//Middleware: Se hace antes de validar el esquema de usuario
UserSchema.pre('validate', function(next){
    if(this.password != this.confirmPassword) {
        this.invalidate('confirmPassword', 'Las contraseñas no coinciden')
    }
    next();
})

//Antes de guardar el suariok, encriptamos al contraseña
// 10 => Salt: cantidad que se encripta la contraseña
UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const Usuario = mongoose.model("usuarios", UserSchema);
module.exports = Usuario;
