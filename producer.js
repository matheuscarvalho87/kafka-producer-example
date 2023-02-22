import { Kafka } from "kafkajs";
import { randomUUID} from 'node:crypto'

async function bootstrap(){
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['bold-sunfish-10627-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: 'Ym9sZC1zdW5maXNoLTEwNjI3JMgJBaFOr4xAq1lX9MmJGoBLcyU6kJ56rkWFKQY',
      password: 'a2011aa8e4644d559f5677c0e2ec7be8'
    },
    ssl: true,
  })
  const producer = kafka.producer()

  await producer.connect()
  await producer.send({
    // registra o topico da mensagem
    topic:'notification-send-notification',
    //póde ser enviado uma ou mais mensagens
    messages: [
      {
        value: JSON.stringify({
          content: 'Adquira esse novo produto!!!',
          category: 'marketing',
          recipientId: 'usuarioTeste'
          // recipientId: randomUUID()
        })
      }
    ]
  })

  await producer.disconnect()
}

bootstrap()
