import { createContext, useState, ReactNode, useEffect} from 'react';
import Cookies from 'js-cookie'
import challenges from "../../challenges.json"
import { LevelUpModal } from '../components/LevelUpModal';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

interface challenge{
    type: 'body'|'eye';
    description: string;
    amount: number;

}

interface challengesContextData{
    level: number;
    currentExpereience: number;
    challengesCompleted: number; 
    activeChallenge:challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge:() => void;
    completedeChallenge:() => void;
    closeLevelUpModal:() => void;
    
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    currentExpereience: number;
    challengesCompleted: number;
}

export const challengeContext = createContext({} as challengesContextData);

export function ChallengesProvider({ 
    children, 
    ...rest
} : ChallengesProviderProps){
    const [level, setlevel] = useState(rest.level ?? 1);
    const [currentExpereience, setCurrentExperience] = useState(rest.currentExpereience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const[activeChallenge, setActiveChallenge] = useState(null)
    const[isLevelUpModalOpen, setIsLevelModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level+1) * 4, 2)

    useEffect(()=> {
        Notification.requestPermission();

    }, [])

    useEffect(()=>{
        Cookies.set('level', String(level));
        Cookies.set('currentExpereience', String(currentExpereience));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    }, [level, currentExpereience, challengesCompleted])

    function levelUp(){
        setlevel(level+1);
        setIsLevelModalOpen(true)
    }

    function closeLevelUpModal(){
        setIsLevelModalOpen(false)
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if(Notification.permission === 'granted'){
            new Notification("Novo desafio 🎉", {
                body: `Valendo ${challenge.amount} XP`
            })
        }
    }

        function resetChallenge(){
            setActiveChallenge(null)
        }
    
        function completedeChallenge(){
            if (!activeChallenge){
                return;
            }

            const {amount} = activeChallenge;

            let finalExperience = currentExpereience + amount;

            if(finalExperience >= experienceToNextLevel){
                finalExperience = finalExperience - experienceToNextLevel;
                levelUp();

            }

            setCurrentExperience(finalExperience);
            setActiveChallenge(null);
            setChallengesCompleted(challengesCompleted + 1);
        }

    return(
        <challengeContext.Provider value={{
            level,
            currentExpereience, 
            challengesCompleted, 
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completedeChallenge,
            closeLevelUpModal,
        }}
            >
            {children}

            {isLevelUpModalOpen && <LevelUpModal/>}
        </challengeContext.Provider>
    )
}