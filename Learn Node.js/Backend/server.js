const express = require("express");

let cors = require("cors")

let fileSystem = require("fs")

const app = express();

const path = require("path");

app.use(express.static("assets"));

app.use(cors());

app.use(express.json());

app.set("port", 4005);


app.get("/", (request,response) => {
    const responseObject = {
        text: "HELLO WORLD!"
    }
    response.end(JSON.stringify(responseObject));
});

app.get("/all-games", (request, response) => {
    fileSystem.readFile("games.json", "utf8", (error, data) => {
        if(error) {
            let errorResponse = { error: "A fájl olvasása közben hiba történt."}
            response.end(JSON.stringify(errorResponse));
        } else {
            response.end(data);
        }
    })

})

app.post("/new-game", (request, response) => {
    fileSystem.readFile("games.json", "utf8", (error, data) => {
        const games = JSON.parse(data);
        games.push(request.body);
        const gameString = JSON.stringify(games);
        fileSystem.writeFile("games.json",  gameString, () => {
            const responseBody = {successful: true};
            response.end(JSON.stringify(responseBody));
        })
    
    })
})

app.get("/game-by-genre/:genre", (request, response) => {
    fileSystem.readFile("games.json", "utf8", (error, data) => {
        const games = JSON.parse(data);
        const filteredGames = games.filter(game => game.genre === request.params.genre);
        const stringifiedGames = JSON.stringify(filteredGames)
        response.end(stringifiedGames);
    })
})

app.get("/get-game-by-name/:name", (request, response) => {

    fileSystem.readFile("games.json", "utf8", (error, data) => {
        const games = JSON.parse(data);
        const filteredGames = games.filter(game => game.name === request.params.name);

        if(filteredGames.length > 0) {
            const stringifiedGames = JSON.stringify(filteredGames[0]);
            response.end(stringifiedGames);
        }else{
            const responseString = JSON.stringify({error: "Nincs ilyen játék"});
            response.end(responseString);
        }
    })
})

app.get("/img/:filename", function (req, res) {
    res.sendFile(path.join(__dirname, "img/" + req.params.filename));
})

const server = app.listen(app.get("port"), function() {
    let host = server.address().address
    let port = server.address().port
    console.log("Node.js API app listening at http://%s:%s", host, port)
})