import { useContext } from "react"
import { challengeContext } from "../contexts/challengeContexts"
import { CountDownContext } from "../contexts/countdownContext"
import styles from "../styles/components/challengeBox.module.css"

export function ChallengeBox(){

    const { activeChallenge, resetChallenge, completedeChallenge } = useContext(challengeContext)
    const {resetCountdown} = useContext(CountDownContext)

    function handleChallengeSucceeded(){
        completedeChallenge();
        resetCountdown();

    }

    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();

    }

    return(
        <div className={styles.challengeBoxContainer}>
            {activeChallenge? (
                <div className ={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount}</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button 
                        type="button"
                        className ={styles.challengeFailledButton}
                        onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>

                        <button 
                        type='button'
                        className ={styles.challengeSucceededButton}
                        onClick={handleChallengeSucceeded}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                <strong> Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level up"/>
                    Avance de level completando desafios
                </p>

            </div>)}
        </div>
        
    )

}