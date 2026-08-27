const mongoose = require("mongoose");

const noteSchems = new mongoose.Schema(
    {
        title:{
            type : String,
            required : true,
            trim : true
        },
        content:{
            type : String,
            required : true 
        },
        category:{
            type : String,
            default : 'General'
        },
    },

    {
        timestamps : true
    }
);


// module.exports = mongoose.model("Note", noteSchems);             

                // or
                
const Note = mongoose.model("Note", noteSchems);
module.exports = Note;