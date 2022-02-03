import express, { Router} from 'express';
import Transaction from '../models/trasanction.model'

const router = Router();

router.get('/', (req: express.Request, res: express.Response) => {
    Transaction.find({}, (error, transactions) =>{
        res.status(200).json(transactions);
    });
});

router.post('/', (req: express.Request, res: express.Response) => {
    const transaction = new Transaction({...req.body});

    transaction.save((error, transaction)=>{
        if (error) throw error;
        res.status(201).json({data: transaction})
    })
})


export default router;