"use client"

import { useState, useEffect } from "react"
import Grid from "./components/Grid"
import Keypad from "./components/Keypad"
import Modal from "./components/Modal"
import { solutions } from "./data/db"

function Wordle() {
  const [solution, setSolution] = useState("")
  const [guesses, setGuesses] = useState([...Array(6)].map(() => []))
  const [currentGuess, setCurrentGuess] = useState("")
  const [turn, setTurn] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [usedKeys, setUsedKeys] = useState({})

  // Initialize the game
  useEffect(() => {
    // Get random solution
    const randomSolution = solutions[Math.floor(Math.random() * solutions.length)]
    setSolution(randomSolution)
  }, [])

  // Handle keyup events
  useEffect(() => {
    const handleKeyup = (e) => {
      if (isCorrect || turn > 5) return

      // Handle letter input (a-z)
      if (/^[A-Za-z]$/.test(e.key)) {
        if (currentGuess.length < 5) {
          setCurrentGuess((prev) => prev + e.key.toLowerCase())
        }
      }

      // Handle backspace
      if (e.key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1))
      }

      // Handle enter
      if (e.key === "Enter") {
        // Only submit if turn is less than 6
        if (turn > 5) {
          return
        }

        // Must be 5 chars
        if (currentGuess.length !== 5) {
          return
        }

        // Check if word has been used before
        const currentGuessFormatted = formatGuess()
        const exists = guesses.some((g) => {
          return g.length > 0 && g.every((l, i) => l.letter === currentGuessFormatted[i].letter)
        })
        if (exists) {
          return
        }

        // Add new guess
        const formattedGuess = formatGuess()
        addNewGuess(formattedGuess)
      }
    }

    window.addEventListener("keyup", handleKeyup)

    // Check if game is over
    if (isCorrect || turn > 5) {
      setTimeout(() => setShowModal(true), 1500)
    }

    return () => window.removeEventListener("keyup", handleKeyup)
  }, [currentGuess, turn, isCorrect, guesses])

  // Format a guess into an array of letter objects
  const formatGuess = () => {
    const solutionArray = [...solution]
    const formattedGuess = [...currentGuess].map((letter) => {
      return { letter, color: "grey" }
    })

    // Find green letters (exact matches)
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.letter) {
        formattedGuess[i].color = "green"
        solutionArray[i] = null
      }
    })

    // Find yellow letters (partial matches)
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.letter) && l.color !== "green") {
        formattedGuess[i].color = "yellow"
        solutionArray[solutionArray.indexOf(l.letter)] = null
      }
    })

    return formattedGuess
  }

  // Add a new guess to the guesses state
  const addNewGuess = (formattedGuess) => {
    // Check if guess is correct
    if (currentGuess === solution) {
      setIsCorrect(true)
    }

    // Add guess to state
    const newGuesses = [...guesses]
    newGuesses[turn] = formattedGuess
    setGuesses(newGuesses)

    // Update turn
    setTurn((prev) => prev + 1)

    // Update used keys for keypad
    const newUsedKeys = { ...usedKeys }
    formattedGuess.forEach((l) => {
      const currentColor = newUsedKeys[l.letter]

      if (l.color === "green") {
        newUsedKeys[l.letter] = "green"
        return
      }

      if (l.color === "yellow" && currentColor !== "green") {
        newUsedKeys[l.letter] = "yellow"
        return
      }

      if (l.color === "grey" && currentColor !== "green" && currentColor !== "yellow") {
        newUsedKeys[l.letter] = "grey"
        return
      }
    })
    setUsedKeys(newUsedKeys)

    // Reset current guess
    setCurrentGuess("")
  }

  // Handle keypad clicks
  const handleKeypadClick = (key) => {
    if (isCorrect || turn > 5) return

    if (key === "Enter") {
      // Only submit if turn is less than 6
      if (turn > 5) {
        return
      }

      // Must be 5 chars
      if (currentGuess.length !== 5) {
        return
      }

      // Check if word has been used before
      const currentGuessFormatted = formatGuess()
      const exists = guesses.some((g) => {
        return g.length > 0 && g.every((l, i) => l.letter === currentGuessFormatted[i].letter)
      })
      if (exists) {
        return
      }

      // Add new guess
      const formattedGuess = formatGuess()
      addNewGuess(formattedGuess)
    } else if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1))
    } else {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key.toLowerCase())
      }
    }
  }

  return (
    <div className="wordle">
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} handleKeypadClick={handleKeypadClick} />
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
    </div>
  )
}

export default Wordle

