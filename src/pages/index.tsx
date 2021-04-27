import {GetServerSideProps} from 'next';

import {CompletedeChallenges} from "../components/completedChallenges"
import { Profile } from "../components/Profile";
import { ExperienceBar } from '../components/experienceBar';
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox"
import { CountdownProvider } from "../contexts/countdownContext"
import styles from "../styles/pages/home.module.css";
import { challengeContext, ChallengesProvider } from "../contexts/challengeContexts";

interface HomeProps{
  level: number;
  currentExpereience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps){
  return (
    <ChallengesProvider 
    level={props.level} 
    currentExpereience={props.currentExpereience}
    challengesCompleted={props.challengesCompleted}>
      <div className={styles.container}>
        <head>
          <title> Início | moveIt</title>
        </head>
        <ExperienceBar /> 
        <CountdownProvider>      <section>
          <div>
            <Profile />
            <CompletedeChallenges/>
            <Countdown/>
          </div>
          <div>
            <ChallengeBox/>
          </div>
        </section>
        </CountdownProvider>

      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>{

    const {level, currentExpereience, challengesCompleted} = ctx.req.cookies;
 

  return{
    props:{
      level: Number(level),
      currentExpereience:Number(currentExpereience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}


 