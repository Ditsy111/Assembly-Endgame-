import './App.css'
import React from "react"
import {useState, useEffect} from "react"
import { languages } from './languages'

export default function AssemblyEndgame() {

    const [newLetter, setNewLetter]=useState("react")

    const[guessedLetter, setGuessedletter]=useState([])
    console.log(guessedLetter)

    const letterElements=newLetter.split("").map((letter, index)=>(
        <span key={index}>{letter.toUpperCase()}</span>
    ))

    const alphabet="abcdefghijklmnopqrstuvwxyz"

    const keyBoardElements=alphabet.split("").map(element=>(
        <button 
        key={element}
        onClick={()=>letterClick(element)}>{element}
        </button>
    ))

    function letterClick(element){
        setGuessedletter(prevLetter=>(
            prevLetter.includes(element)?
            prevLetter:
            [...prevLetter, element]
        ))

    
    }

    const languageChips=languages.map(lang=>{
        const styles={
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        return(
            <span
            className="chip" 
            style={styles}
            key={lang.name}>{lang.name}
            </span>
        )
    })


    
    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the 
                programming world safe from Assembly!</p>
            </header>
            <section className="game-status">
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </section>
            <section className="language-chips">
                {languageChips}
            </section>
            <section className="word">
                {letterElements}
            </section>
            <section className="keyboard">
                {keyBoardElements}
            </section>
            <button className="new-game">New Game</button>
        </main>
    )
}
