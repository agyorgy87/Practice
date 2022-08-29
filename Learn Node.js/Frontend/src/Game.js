import './App.css';
import { useState, useEffect, useRef} from "react";
import { useParams } from "react-router-dom";

function Game(props) {
    const params = useParams();

    console.log(params);

    const [visibleGame, setVisibleGame] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4005/get-game-by-name/" + params.name)
            .then(data => data.json())
            .then(parsedData => {
                setVisibleGame(parsedData);
            })
    }, [])

    console.log(visibleGame);

    return (
        <div className="App">
            <div>
                {visibleGame.error}
            </div>
            <div>
                {visibleGame.name}
                {visibleGame.genre}
                {visibleGame.date}
            </div>
        </div>
  );
}

export default Game;