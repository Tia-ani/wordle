"use client"

function Modal({ isCorrect, turn, solution }) {
  return (
    <div className="modal">
      <div className="modal-content">
        {isCorrect && (
          <div>
            <h2>You Win!</h2>
            <p>
              You found the solution in {turn} {turn === 1 ? "guess" : "guesses"}
            </p>
            <p>
              The word was: <strong>{solution}</strong>
            </p>
            <button onClick={() => window.location.reload()}>Play Again</button>
          </div>
        )}
        {!isCorrect && (
          <div>
            <h2>Unlucky!</h2>
            <p>You ran out of guesses</p>
            <p>
              The word was: <strong>{solution}</strong>
            </p>
            <button onClick={() => window.location.reload()}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal

