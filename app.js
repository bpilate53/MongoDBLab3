const { MongoClient } = require('mongodb');

async function main() {
    /**
    * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
    * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
    */
    const uri = "mongodb+srv://admin:<password>@cluster0.wf2dyys.mongodb.net/?retryWrites=true&w=majority";


    const client = new MongoClient(uri);
    
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);


        await createBookItem(client,
            {
                "title": "The Banquet New",
                "author": "Dante",
                "copies": 3,
                "pages": 50,
                "rating": 1,
                "genres": [
                    "fantasy",
                    "dystopian"
                ]
            }
        );

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function createBookItem(client, createBookItem) {
    const result = await client.db("bookstore").collection("books").insertOne(createBookItem);
    console.log(`Book item created with the following id: ${result.insertedId}`);
}

