"use client"

function Keypad({ usedKeys, handleKeypadClick }) {
  const keys1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]
  const keys2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"]
  const keys3 = ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"]

  return (
    <div className="keypad">
      <div className="keypad-row">
        {keys1.map((key) => (
          <div key={key} className={usedKeys[key] ? usedKeys[key] : ""} onClick={() => handleKeypadClick(key)}>
            {key}
          </div>
        ))}
      </div>
      <div className="keypad-row">
        <div className="spacer half"></div>
        {keys2.map((key) => (
          <div key={key} className={usedKeys[key] ? usedKeys[key] : ""} onClick={() => handleKeypadClick(key)}>
            {key}
          </div>
        ))}
        <div className="spacer half"></div>
      </div>
      <div className="keypad-row">
        {keys3.map((key) => (
          <div
            key={key}
            className={
              key === "Enter" || key === "Backspace"
                ? "wide"
                : usedKeys[key.toLowerCase()]
                  ? usedKeys[key.toLowerCase()]
                  : ""
            }
            onClick={() => handleKeypadClick(key)}
          >
            {key === "Backspace" ? "⌫" : key}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Keypad

