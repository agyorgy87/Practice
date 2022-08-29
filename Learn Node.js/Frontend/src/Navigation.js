import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import App from "./App";
import Game from "./Game";


const Navigation = () => (
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<App/>} exact />
            <Route path={"/get-game/:name"} element={<Game/>} />
        </Routes>
    </BrowserRouter>
);

export default Navigation;