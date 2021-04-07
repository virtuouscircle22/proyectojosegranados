import MongoClient from "mongodb";

var db = null
export async function connectHistoricos() {
    if (db == null) {
        try {
            const client = await MongoClient.connect('mongodb+srv://aire:aire@cluster0-sentg.mongodb.net/test?retryWrites=true&w=majority',{useUnifiedTopology: true});
            const db = client.db('test');
            console.log('DB aireHistoricos is connected')
            return db;
        } catch(e){
            console.log(e);
        }
    }

}