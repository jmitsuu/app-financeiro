import {Client, Databases} from "node-appwrite";

// export default defineEventHandler((event, keyid, arrayTitle)=>{



// })
export default function createCategory(keyid, arrayTitle){

  const runtimeConfig = useAppConfig();
const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('64f9e6d9333f28581642')
.setKey(runtimeConfig.appwriteApiKey);

const databases = new Databases(client);
return  databases.createDocument('64f9eb519eef094aed8d', '64f9eb70084eb657537e',`${keyid}`, `${arrayTitle}` );
}