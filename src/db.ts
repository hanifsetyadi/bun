import Database from "bun:sqlite";

export interface Product{
    id?: number,
    name: string,
    price: number,
    image: string

}

export class productDatabase{
    private db: Database;

    constructor(){
        this.db = new Database("Products.sqlite");
        this.createTable();
    }

    async addProduct(product: Product){
        return this.db.query(`INSERT INTO products(name, price, image) VALUES (?,?,?) RETURNING id`).get(product.name, product.price, product.image) as Product;
    }

    createTable(){
        return this.db.run("CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price NUM, image TEXT)")
    }
}