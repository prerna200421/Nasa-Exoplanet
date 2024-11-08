import { createContext, useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
export const PlayerContext = createContext();

export default function PlayerContextProvider({children}){
    const [ guess, setGuess ] = useState(null);
    const [ level, setLevel ] = useState(null);
    const score = useRef(0);

    console.log(level, "provider");

    return <PlayerContext.Provider value= { {level, setLevel, guess, setGuess, score} }>
        {children}
        <Outlet/>
    </PlayerContext.Provider>
}