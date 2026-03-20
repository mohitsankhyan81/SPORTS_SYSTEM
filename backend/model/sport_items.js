import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    game: {
        type: String,
        required: true
    },
    totalcount: {
        type: Number,
        required: true
    },
    photo: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    isavilable: {
        type: Boolean,
        default: false
    },
    issuedto: {
        type: [String],
        default: []
    },
    textarea: {
        type: String,
    }
});

export const sport=mongoose.model("sport",itemsSchema);