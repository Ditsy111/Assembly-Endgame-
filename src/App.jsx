import './App.css'
import React from "react"
import {useState} from "react"
import { languages } from './languages'
import { clsx } from 'clsx';
import {chooseRandomWord, getFarewellText} from "./utils.js"
import Confetti from "react-confetti"

export default function AssemblyEndgame() {

    const [currentLetter, setCurrentLetter]=useState(()=>chooseRandomWord())

    const[guessedLetters, setGuessedletters]=useState([])

    const alphabet="abcdefghijklmnopqrstuvwxyz"

    const wrongGuessCount=guessedLetters.filter(letter=>!currentLetter.includes(letter)).length
    const isGameWon= guessedLetters.length > 0 && currentLetter.split("").every(letter=>guessedLetters.includes(letter))
    const isGameLost=wrongGuessCount>=languages.length-1
    const isGameOver=isGameWon||isGameLost
    const numGuessesLeft=languages.length-1- wrongGuessCount


    const keyBoardElements=alphabet.split("").map(element=>{
        const isGuessed=guessedLetters.includes(element)
        const isWrong=isGuessed&&!currentLetter.includes(element)
        const isCorrect=isGuessed&&currentLetter.includes(element)
        const className=clsx({
            wrong:isWrong,
            correct:isCorrect
        })
        return(
        <button 
        className={className}
        key={element}
        onClick={()=>letterClick(element)}
        disabled={isGameOver}>{element.toUpperCase()}
        </button>
        )
})

    function letterClick(element){
        setGuessedletters(prevLetters=>(
            prevLetters.includes(element)?
            prevLetters:
            [...prevLetters, element]
        ))
    }

    const languageChips=languages.map((lang, index)=>{
        const isLanguageLost=index<wrongGuessCount
        
        const styles={
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        const className=clsx("chip", isLanguageLost && "lost")
        return(
            <span
            className={className}
            style={styles}
            key={lang.name}>{lang.name}
            </span>
        )
    })
    
    const lastGuessedLetter=guessedLetters[guessedLetters.length-1]
    const lastLostLanguage=languages[wrongGuessCount-1]
    const isLastGuessWrong=lastGuessedLetter && !currentLetter.includes(lastGuessedLetter)

     const letterElements=currentLetter.split("").map((letter, index)=>{
        const shouldRevealLetter=isGameLost || guessedLetters.includes(letter)
        const letterRevealClass=clsx(
            isGameLost && !guessedLetters.includes(letter) && "missed-letter"
        )
        return(
            <span key={index} className={letterRevealClass}>{shouldRevealLetter?letter.toUpperCase():""}</span>
        )
    })

 
    function renderGameStatus(){
        if(!isGameOver && isLastGuessWrong){
            return(
                <h2 className='farewell-message'>
                    {getFarewellText(lastLostLanguage.name)}
                </h2>
            )
        }

        if(isGameWon){
            return(
                  <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        }

        if(isGameLost){
            return(
                 <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }
        else
            return null
    }

    const gameStatusChange=clsx("game-status",{
        won:isGameWon,
        lost: isGameLost,
        farewell:!isGameOver && isLastGuessWrong
    }
    )

    function resetGame(){
        setCurrentLetter(chooseRandomWord())
        setGuessedletters([])
    }

    
    return (
        <main>
            {
                isGameWon && 
                <Confetti
                    recycle={false}
                    numberOfPieces={1000}
                />

            }
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the 
                programming world safe from Assembly!</p>
            </header>

            <section
            aria-live="polite" 
                role="status" 
                className={gameStatusChange}>
                {renderGameStatus()}
            </section>

              <section className="sr-only"
                aria-live="polite"
                role="status"
                >

                <p>
                    {currentLetter.includes(lastGuessedLetter) ? 
                        `Correct! The letter ${lastGuessedLetter} is in the word.` : 
                        `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                    }
                    You have {numGuessesLeft} attempts left.
                </p>
                    <p>Current word: {currentLetter.split("").map(letter => 
                guessedLetters.includes(letter) ? letter + "." : "blank.")
                .join(" ")}</p>

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
            {isGameOver && <button className="new-game" onClick={resetGame}>New Game</button>}
        </main>
    )
}
