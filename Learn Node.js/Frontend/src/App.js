import './App.css';
import { useState, useEffect, useRef} from "react";
import { useParams, Link} from "react-router-dom";

function App(props) {
    const params = useParams();

    console.log(params);

    const games = useRef([]);
    const [visibleGames, setVisibleGames] = useState([]);
    const [actionGames, setActionGames] = useState([]);
    const [genre, setGenre] = useState("");
    const [title, setTitle] = useState("");


    useEffect(() => {
        fetch("http://localhost:4005/all-games")
            .then(data => data.json())
            .then(parsedData => {
                games.current = parsedData;
                setVisibleGames(parsedData)
            });

        fetch("http://localhost:4005/game-by-genre/action")
            .then(data => data.json())
            .then(parsedData => {
                games.current = parsedData;
                setActionGames(parsedData);
            });
    }, [])


    const filterByGenre = () => {
        fetch("http://localhost:4005/game-by-genre/" + genre)
            .then(data => data.json())
            .then(parsedData => {
                setVisibleGames(parsedData)
            });
    }

   
    const filterByTitle = () => {
        const filtered = games.current.filter(game => game.name.includes(title));

        setVisibleGames(filtered);
    }


    return (
        <div className="App">
            {games.length === 0 ? "loading..." : null}

            <div>
                <p>filter by genre</p>
                <input onChange={(e) => setGenre(e.target.value)} values={genre} />
                <button onClick={filterByGenre}>Filter</button>
            </div>


            <div>
                <p>filter by title</p>
                <input onChange={(e) => setTitle(e.target.value)} values={title} />
                <button onClick={filterByTitle}>Filter</button>
            </div>


            {
                visibleGames.map(game => (
                    <div>
                        <span>{game.name}</span> - <span>{game.date}</span> - <span>{game.genre}</span> <br />
                        <img src={"http://localhost:4005/img/" + game.img} style={{width: "200px"}} alt="jatekkep" />
                    </div>
                ))
            }

            <h1>Action</h1>
            {
                actionGames.map(game => (
                    <div>
                        <span>{game.name}</span> - <span>{game.date}</span> - <span>{game.genre}</span> <br />
                        <Link to={"/get-game/" + game.name}><img src={"http://localhost:4005/img/" + game.img} style={{width: "200px"}} alt="jatekkep" /></Link>
                    </div>
                ))
            }
        </div>
  );
}

export default App;

//redux

