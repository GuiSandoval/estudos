import 'dotenv/config';
import express from 'express';
import UserController from './app/controllers/UserController';
import Queue from './app/lib/Queue';

const { setQueues, BullMQAdapter, BullAdapter, router } = require('bull-board')

const app = express();

setQueues(Queue.queues.map(queue => new BullAdapter(queue.bull)))
// BullBoard.setQueues(Queue.queues.map(queue => queue.bull));

app.use(express.json());
app.post('/users', UserController.store);

// app.use('/admin/queues', BullBoard.UI);
app.use('/admin/queues', router);

app.listen(3333, () => {
  console.log('Server running on localhost:3333');
});