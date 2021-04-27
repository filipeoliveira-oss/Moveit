import { useContext } from "react"
import { challengeContext } from "../contexts/challengeContexts"
import styles from "../styles/components/completedeChallenges.module.css" 

export function CompletedeChallenges(){

    const { challengesCompleted } = useContext(challengeContext);
    return(
        <div className={styles.completedeChallengesContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>

    )

}