import mongoose from "mongoose";

const transationSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:true
    },
    plan: {
        type:String,
        required:true
    },
    amount: {
        type:Number,
        required:true
    },
    credits: {
        type:Number,
        required:true
    },
    payment: {
        type:Boolean,
        default:false
    },
    date: {
        type:Number
    },

});

const transationData = mongoose.models.transation || mongoose.model("transaction", transationSchema);

export default transationData;
