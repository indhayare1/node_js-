import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import ejs from 'ejs';
// import { use } from "react";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // optional for images/css

// Fake product data
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
        description: "bur is a type of food that is made from wheat and is commonly eaten in Somalia.",
        ID: IDgenerator(),
        image: "https://www.usarice.com/images/default-source/think-rice/blog/rice-flour-blog-800.jpg?sfvrsn=754aa48d_4"
    },
    {
        name: "bariis",
        price: 150,
        description: "bariis is a type of rice that is commonly eaten in Somalia.",
        ID: IDgenerator(),
        image: "https://cdn.prod.website-files.com/66e9e86e939e026869639119/66fc4e47b5d69fb0deb88654_iStock-153737841-scaled.jpeg"
    },
    {
        name: "saliid",
        price: 50,
        description: "saliid is a type of oil that is commonly used in Somali cooking.",
        ID: IDgenerator(),
        image: "https://assets.clevelandclinic.org/transform/LargeFeatureImage/c6b5baaf-81cc-418d-9b58-f8ecc8c003df/Cooking-Oils-518792803-770x533-1_jpg"
    },    {
        name: "saliid",
        price: 90,
        description: "saliid is a type of oil that is commonly used in Somali cooking.",
        ID: IDgenerator(),
        image: "https://i5.walmartimages.com/seo/Great-Value-Vegetable-Oil-48-fl-oz_16c0b5fb-8784-4dce-8f99-ffa356e22bd0.7b4c3302ebad6add2d02589306a0e555.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF"
    },
    {
        name: "qudaar",
        price: 30,
        description: "qudaar is a type of vegetable that is commonly eaten in Somalia.",
        ID: IDgenerator(),
        image: "https://howdyhealth.tamu.edu/wp-content/uploads/2023/11/3-easy-ways-to-eat-more-vegetables.jpg"
    },
    {
        name: "hilib",
        price: 20,
        description: "hilib is a type of meat that is commonly eaten in Somalia.",
        ID: IDgenerator(),
        image: "https://media.istockphoto.com/id/505207430/photo/fresh-raw-beef-steak.jpg?s=612x612&w=0&k=20&c=QxOege3Io4h1TNJLtGYh71rxb29p1BfFcZvCipz4WVY="
    },
    {
        name: "hilib",
        price: 200,
        description: "hilib is a type of meat that is commonly eaten in Somalia.",
        ID: IDgenerator(),
        image: "https://media.istockphoto.com/id/505207430/photo/fresh-raw-beef-steak.jpg?s=612x612&w=0&k=20&c=QxOege3Io4h1TNJLtGYh71rxb29p1BfFcZvCipz4WVY="
    }
];
let users = {
    "abdalla": {
        "name": "abdalla",
        "username": "abdallaBoss",
        "age": 25,
        "email": "cllahiindhayare213@gmail.com",
        "password": "12345"
    },
    "axmed": {
        "name": "axmed",
        "username": "axmedemaan",
        "age": 30,
        "email": "email2@gmail.com",
        "password": "12345"
    },
    "daahir": {
        "name": "daahir",
        "username": "daahirdayax",
        "age": 28,
        "email": "email3@gmail.com",
        "password": "12345"
    },

}




// ✅ Home page - List all products
app.get("/", (req, res) => {
    res.render("index", { products ,login });
});

// ✅ Product details by ID
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const product = products.find(p => p.ID === id);
    if (product) {
        res.render("products", { product });
    } else {
        res.status(404).send("Product not found");
    }
});

// ✅ Search by name (GET form)
// app.get("/search", (req, res) => {
//     const { name } = req.query;
//     const result = products.filter(p => p.name.toLowerCase().includes(name?.toLowerCase()));
//     res.render("search", { result, query: name });
// });
app.get("/search", (req, res) => {
    const { name } = req.query;
    const result = products.filter(p => p.name.toLowerCase().includes(name?.toLowerCase()));

    if (result.length === 1) {
        // Haddii 1 product la helay, si toos ah ugu dir /products/:id
        return res.redirect(`/products/${result[0].ID}`);
    }

    res.render("search", { result, query: name });
});

let login = (req,res,next)=>{
    let user = req.body.username;
    let pass = req.body.password;

    if(users[user] && users[user].password === pass){
        console.log("Login successful for user:", user);
        next(); // Proceed to the next middleware or route handler
    } else {
        console.log("Login failed for user:", user);
        res.status(401).send("Invalid username or password");
    }

    
}

app.post('/check',login,(req,res)=>{
    res.render("index.ejs",{
        users: users[req.body.username] ,
        
    });
    console.log("User logged in:", users[req.body.username].name);
})

// ✅ Login page
app.get('/login', (req, res) => {
    res.render("login", { users });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
