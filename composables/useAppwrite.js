
import { Client, Account } from "appwrite";
    const client = new Client()
    const account = new Account(client)
    client
    .setEndpoint('https://cloud.appwrite.io/v1').setProject('64f9e6d9333f28581642')
export default account


// export default ()=>{
 
//     const client = new Client()
//     const account = new Account(client)
//     client
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject('64f9e6d9333f28581642')
//     return account
//   }