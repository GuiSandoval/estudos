import Queue from 'bull';
import redisConfig from '../../config/redis';

import * as jobs from '../jobs';

// console.log(redisConfig)

const queues = Object.values(jobs).map(job => (
    {
    bull: new Queue(job.key, {
        redisConfig,
        limiter: {
            max: 2,
            duration: 5000
        },
        teste: 100000
    }),
    name: job.key,
    handle: job.handle,
    options: job.options,
}))

console.log(queues)

export default {
    queues,

    add(name, data) {
        const queue = this.queues.find(queue => queue.name === name);
        console.log('Queue Abaixo')
        console.log(queue)
        return queue.bull.add(data, queue.options);
    },

    process() {
        return this.queues.forEach(queue => {
            queue.bull.process(queue.handle);

            queue.bull.on('failed', (job, err) => {
                console.log('Job Failed', queue.key, job.data);
                console.log(err);
            });

        })
    }
}