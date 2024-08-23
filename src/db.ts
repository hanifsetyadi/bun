import Database from "bun:sqlite";

export class productDatabase{
    private db: Database;

    constructor(){
        this.db = new Database("Products.sqlite");
        this.createTable();
    }

    createTable(){
        return this.db.run("CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price NUM, image TEXT)")
    }
}