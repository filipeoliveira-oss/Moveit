import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { challengeContext } from "./challengeContexts";


interface CountDownContextData{
    minutes:number;
    seconds:number
    hasFinished: boolean;
    isActive:boolean;
    startCountdown: ()=> void;
    resetCountdown: ()=> void;

}
interface CountDownProviderProps{
    children: ReactNode;
}

export const CountDownContext = createContext({} as CountDownContextData)

let countdownTimeout : NodeJS.Timeout;

export function CountdownProvider({ children }: CountDownProviderProps){
    const { startNewChallenge } = useContext(challengeContext)

    const[time, setTime] = useState(25 * 60);
    const[isActive, setIsActive] = useState(false);
    const[hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown(){
        setIsActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
        setHasFinished(false)
    }

    useEffect(()=>{
        if(isActive && time > 0){
            countdownTimeout =  setTimeout(()=>{
                setTime(time-1);
            }, 1000)
        } else if(isActive && time === 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])



    return(
        <CountDownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown

        }}>
            {children}
        </CountDownContext.Provider>

    )

}
