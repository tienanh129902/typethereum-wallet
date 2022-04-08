import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    txHash: {
        type: String,
        required: true
    },
    senderID:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Users'
    },
    receiverID:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Users'
    },
    contractID:{
        type: String,
        required: true,
        ref: 'Contracts'
    },
    value: {
        type: Number
    },
    gasUsed: {
        type: Number,

    },
    gasPrice:{
        type: Number

    },
    gasLimit:{
        type: Number

    },
    minedInBLock:{
        type: Number

    },
    txData:{
        type: String
    }
},{
    timestamps: true
})
const Transaction = mongoose.model('Transactions',transactionSchema);

export {Transaction};