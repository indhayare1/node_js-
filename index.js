import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import ejs from 'ejs';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

function IDgenerator() {
    return Math.random().toString(36);
}
function IDgeneratorr() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

console.log(IDgeneratorr());

let products = [
    {
        name: "bur",
        price: 100,
        description: "bur is a type of food...",
        ID: IDgenerator(),
        image: "https://www.usarice.com/images/default-source/think-rice/blog/rice-flour-blog-800.jpg?sfvrsn=754aa48d_4"
    },
    // ... other products
];

let users = {
    "abdalla": {
        "name": "abdalla",
        "username": "abdallaBoss",
        "age": 25,
        "email": "cllahiindhayare213@gmail.com",
        "password": "12345"
    },
    // ... other users
};

// ✅ Home page - List all products
app.get("/", (req, res) => {
    res.render("index", { products });
});

// ✅ Product details
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const product = products.find(p => p.ID === id);
