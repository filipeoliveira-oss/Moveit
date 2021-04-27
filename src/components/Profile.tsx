import { useContext } from "react";
import { challengeContext } from "../contexts/challengeContexts";
import styles from "../styles/components/profile.module.css";

export function Profile(){
    const {level} = useContext(challengeContext)

    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/filipeoliveira-oss.png" alt="Filipe Oliveira"/>
            <div>
                <strong>Filipe Oliveira</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}</p>
            </div>
        </div>


    )

}