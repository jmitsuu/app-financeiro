
import {Client, Databases ,ID} from "node-appwrite";
export default defineEventHandler(async (event, keyid, arrayTitle)=>{

const body = await readBody(event)
const runtimeConfig = useAppConfig();
const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('64f9e6d9333f28581642')
.setKey(runtimeConfig.appwriteApiKey);
const databases = new Databases(client);
return  databases.createDocument('64f9eb519eef094aed8d', '6500795d63b9f4681f29', ID.unique(), body);


})