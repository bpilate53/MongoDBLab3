const { MongoClient } = require('mongodb');

async function main() {
   
    const uri = "mongodb+srv://admin:<password>@cluster0.wf2dyys.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
    
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        await findBookByAuthor(client, "Dante Alighieri");
        
        await updateBookByAuthor(client, "Dante Alighieri", { title: "Divine Comedy"});

        await findBookByAuthor(client, "Dante Alighieri");

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);


async function updateBookByAuthor(client, nameOfBook, updatedBook) {
    const result = await client.db("bookstore").collection("books").updateOne({ author: nameOfBook }, { $set: updatedBook });

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}


async function findBookByAuthor(client, nameOfBook) {
    const result = await client.db("bookstore").collection("books").findOne({ author: nameOfBook });

    if (result) {
        console.log(`Found a listing in the db with the name '${nameOfBook}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfBook}'`);
    }
}