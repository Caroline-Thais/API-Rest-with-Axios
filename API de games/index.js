const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//"banco de dados"
var DB = {
    games: [

        {
            id: 23,
            title: "Call of duty MW",
            year: 2019,
            price: 60
        },
        {
            id: 65,
            title: "Sea of thieves",
            year: 2018,
            price: 40
        },
        {
            id: 2,
            title: "Minecraft",
            year: 2012,
            price: 20
        }
    ],
    users: [
        {
            id: 1,
            name: "Victor",
            email: "123@123.com",
            password: "123"
        },
        {
            id: 2,
            name: "Guilherme",
            email: "g@gmail.com",
            password: "1234"
        }
    ]
}

//Endpoints
app.get("/games", (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

app.get("/game/:id", (req, res) => {

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{

        var id = parseInt(req.params.id);
        var game = DB.games.find(games => games.id == id);
        
        if(game != undefined){
            res.statusCode = 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }
});

app.post("/game", (req, res) => {
    
    var { title, price, year } = req.body;

    DB.games.push({
        id: 34,
        title,
        price,
        year
    });

    res.sendStatus(200);
});

app.delete("/game/:id", (req, res) => {

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{

        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(games => games.id == id);

        if(index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }     
    }
});

app.put("/game/:id", (req, res) => {

    if(isNaN(req.params.id)){
        res.sendStatus(400);
        }else{

    var id = parseInt(req.params.id);
    var game = DB.games.find(games => games.id == id);
    
    if(game != undefined){
      
        var {title, price, year} = req.body;
        
        if(title != undefined){
            game.title = title;
        }

        if (price != undefined){
            game.price = price;
        }

        if(year != undefined){
            game.year = year;
        }
        res.sendStatus(200);
        
    }else{
        res.sendStatus(404);
        }
    }
});

app.post("/auth", (req, res) => {
    var { email, password } = req.body;
    if (email != undefined){
        var user = DB.users.find(u => u.email ==email);
        if (user != undefined){

            if(user.password == password){
                res.status(200);
                res.json({token: "Token falso!"})
            }else{
                res.status(401);
                res.json({err: "Credenciais inválidas"});
            }
        }else{
            res.status(400);
            res.json({err: "O email enviado não existe na base de dados"})
        }
    }else{
        res.status(400);
        res.json({err: "O email enviado é inválido"})
    }
});

//Porta
app.listen(8085, () => {
    console.log("Api rodando!");
});