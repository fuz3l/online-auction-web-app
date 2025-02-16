import { Client, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your endpoint
  .setProject("67ac626f00217bbaa36b"); // Replace with your project ID

const storage = new Storage(client);

export { storage };
