import dotenv from 'dotenv'
dotenv.config()

import { GraphQLServer } from 'graphql-yoga'
import bodyParser from 'body-parser'
import { createGraphQlSchema } from 'oasgraph'
import config from './config'

async function start() {
    console.log('Starting server...')
    
    const oas = config.oas
    
    console.log('OAS config: ')
    console.log(oas)
    
    const headers = {}
    config.creds.forEach(element => {
        headers[element.header] = element.value
    })

    console.log('Headers: ')
    console.log(headers)

    const { schema } = await createGraphQlSchema(oas,{ headers })

    console.log('Resulting schema')
    console.log(schema)

    const options = {
        port: process.env.PORT || 3000,
        endpoint: "/graphql",
        subscriptions: "/subscriptions",
        playground: "/playground"
    }
    
    const server = new GraphQLServer({ schema })
    server.express.use(bodyParser.json())
  
    try {
        server.start(options, () => {
            console.log(`Server started, listening on port 3000 for incoming requests.`);
        });
    
    } catch (e) {
        console.log(e);
    }
}

start();