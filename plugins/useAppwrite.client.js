import { Client, Account } from "appwrite";
export default defineNuxtPlugin(nuxtApp => {

    const client = new Client()
    const account = new Account(client)
    client
    .setEndpoint('https://cloud.appwrite.io/v1').setProject('64f9e6d9333f28581642')
    return account
  })