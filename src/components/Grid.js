import Row from "./Row"

function Grid({ guesses, currentGuess, turn }) {
  return (
    <div className="grid">
      {guesses.map((guess, i) => {
        // Current active row
        if (i === turn) {
          return <Row key={i} currentGuess={currentGuess} />
        }

        // Past guesses
        return <Row key={i} guess={guess} />
      })}
    </div>
  )
}

export default Grid

