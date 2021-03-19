import 'dotenv/config';
import express from 'express';
import UserController from './app/controllers/UserController';
import Queue from './app/lib/Queue';

import { setQueues, BullAdapter, router } from 'bull-board';
const app = express();

setQueues(Queue.queues.map(queue => new BullAdapter(queue.bull)))

app.use(express.json());

app.get('/teste', (req, res) => {
  // console.log(Queue.queues)
  return res.json("Ok");
});

app.post('/users', UserController.store);

// app.use('/admin/queues', BullBoard.UI);
app.use('/admin/queues', router);


app.listen(3333, () => {
  console.log('Server running on localhost:3333');
});