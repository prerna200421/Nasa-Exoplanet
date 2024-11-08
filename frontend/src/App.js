import StartQuiz from "./pages/StartQuiz";
import QuizLevels from './pages/QuizLevels';
import Home from "./pages/Home.js";
import Quiz from "./components/Quiz";
import AppNavBar from "./components/AppNavBar.js";
import PlayerContextProvider from './providers/PlayerContextProvider';
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import './App.css';
import StoryTelling from "./pages/StoryTelling.js";
import Draw from "./pages/Draw.js";
import GamePage from "./pages/GamePage.js";
import Resource from "./pages/Resource.js";

function App() {
    const location = useLocation();

    return (<>
        <AppNavBar/>
        <Routes>
            <Route path= "/" element= { <Home/> } />
            <Route path= "/storytelling" element= { <StoryTelling/> } />
            <Route path= "/draw" element= { <Draw/> } />
            <Route path= "/game" element= { <GamePage/> } />
            <Route path= "/resources/" element= { <Resource/> } />
            <Route path= "/quiz/" element= { <PlayerContextProvider/> } >
                <Route path= "start" element= { <StartQuiz/> } />
                <Route path= "levels" element= { <QuizLevels/> } />
                <Route path= "play" element= { <Quiz/> } />
            </Route>
    </Routes>
    </> );
}

export default App;
