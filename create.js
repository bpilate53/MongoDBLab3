const { MongoClient } = require('mongodb');

async function main() {
   
    const uri = "mongodb+srv://admin:<password>@cluster0.wf2dyys.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
    
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        await createBookItem(client,
            {
                "title": "Convivo",
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

async function createBookItem(client, createBookItem) {
    const result = await client.db("bookstore").collection("books").insertOne(createBookItem);
    console.log(`Book item created with the following id: ${result.insertedId}`);
}

