import oas from './SentralAPI.json'
import dotenv from 'dotenv'
dotenv.config()

export default {
    oas: oas,
    creds: [
        {
            header: 'X-API-KEY',
            value: `${process.env.KEY}`
        }, 
        {
            header: 'X-API-TENANT',
            value: `${process.env.TENANT}`
        }
    ]
}