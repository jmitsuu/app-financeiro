
import {Client, Databases ,ID} from "node-appwrite";
export default defineEventHandler(async (event)=>{
const {id} = getQuery(event)
const runtimeConfig = useAppConfig();
const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('64f9e6d9333f28581642')
.setKey(runtimeConfig.appwriteApiKey);
const databases = new Databases(client);
return databases.deleteDocument('64f9eb519eef094aed8d', '64f9eb70084eb657537e', id);
})