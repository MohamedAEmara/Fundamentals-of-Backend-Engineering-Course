const amqp = require('amqplib');

connect();
async function connect() {
    try {
        const amqpServer = 'amqps://xzsghvcx:hT1hbcjx8kw1zcvLf1BezYdmRRzXL0hi@horse.lmq.cloudamqp.com/xzsghvcx';
        const connection = await amqp.connect(amqpServer);
        const channel = await connection.createChannel();
        await channel.assertQueue('jobs');

        channel.consume('jobs', message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recieved job with input ${input.number}`); 

            if(input.number == 7) {
                channel.ack(message);
            }
        })

        console.log('Waiting for messages...');
    } catch (e) {
        console.error(e);
    }
}