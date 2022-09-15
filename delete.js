const { MongoClient } = require('mongodb');

async function main() {
   
    const uri = "mongodb+srv://admin:<password>@cluster0.wf2dyys.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
    
    try {
        // Connect to the MongoDB cluster
        await client.connect();

          
          await printIfBookExists(client, "Divine Comedy");
 
          await deleteListingByName(client, "Divine Comedy");
       
          await printIfBookExists(client, "Divine Comedy");
  
      } finally {
          // Close the connection to the MongoDB cluster
          await client.close();
      }
  }
  
  main().catch(console.error);
  
  /**
   * Delete an book by book title
  **/
  async function deleteListingByName(client, titleOfBook) {
      // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#deleteOne for the deleteOne() docs
      const result = await client.db("bookstore").collection("books").deleteOne({ title: titleOfBook });
      console.log(`${result.deletedCount} document(s) was/were deleted.`);
  }
 
  
  
  async function printIfBookExists(client, titleOfBook) {
      
      const result = await client.db("bookstore").collection("books").findOne({title: titleOfBook});
      if (result) {
          
              console.log(`Found a book in the collection with the title '${titleOfBook}'.`);
          
      } else {
          console.log(`No books found with the title '${titleOfBook}'`);
      }
    }

