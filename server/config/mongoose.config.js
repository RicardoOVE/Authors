const mongoose = require("mongoose");

mongoose.connect("mongoose://localhost/autores", {
    useNewUrlParser : true,
    useUnifiedTopology : true
})