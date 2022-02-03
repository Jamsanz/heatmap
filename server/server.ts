import express from "express";
import transactionController from './controllers/transaction.controller';
import { connect } from 'mongoose';
import cors from "cors";
require('dotenv').config();

const app = express();

connect(process.env.MONGO_URI!, (error) =>{
    if (error) throw error;
    console.log(`Mongo server started succussfully`);
})
app.use(cors())
app.use(express.json());
app.use('/transactions', transactionController);

app.listen(5000 || process.env.PORT, () =>{
    console.log(`Server Started Sucessfully on port ${process.env.PORT}`);
});