const mongoose = require('mongoose');

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
        required: [true, "Password es obligatorio"]
    }
})