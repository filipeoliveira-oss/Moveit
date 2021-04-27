import { useContext } from "react"
import { challengeContext } from "../contexts/challengeContexts"
import styles from "../styles/components/experienceBar.module.css"

export function ExperienceBar(){

    const { currentExpereience, experienceToNextLevel } = useContext(challengeContext)

    const percentToNextLevel = Math.round(currentExpereience * 100) / experienceToNextLevel;

    return(

        <header className={styles.experienceBar}>
            <span> 0xp </span>
            <div>
                <div style={{width: `${percentToNextLevel}%`}} />

                <span className={styles.currentExperience} style={{left: `${percentToNextLevel}%`}}>
                    {currentExpereience}XP
                </span>
            </div>
            <span> {experienceToNextLevel}XP </span>    
        </header>
    )
}