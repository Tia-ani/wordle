function Row({ guess, currentGuess }) {
    // If this is the current guess
    if (currentGuess) {
      const letters = currentGuess.split("")
  
      return (
        <div className="row current">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={i < letters.length ? "filled" : ""}>
              {i < letters.length ? letters[i] : ""}
            </div>
          ))}
        </div>
      )
    }
  
    // If this is a past guess
    if (guess && guess.length > 0) {
      return (
        <div className="row past">
          {guess.map((letter, i) => (
            <div key={i} className={letter.color}>
              {letter.letter}
            </div>
          ))}
        </div>
      )
    }
  
    // If this is a future guess
    return (
      <div className="row">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }
  
  export default Row
  
  