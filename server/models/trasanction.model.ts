import { Schema, model } from 'mongoose'

const transactionSchema = new Schema({
    transactionType: {
        type: String,
        enum: ['credit', 'debit'],
    },
    amount: {
        type: Number
    },
    date: {
        type: String
    },
});

export default model('Transaction', transactionSchema);