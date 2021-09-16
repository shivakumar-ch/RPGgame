import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'

import 'reactjs-popup/dist/index.css'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    image:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    image:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    image:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    score: 0,
    showResult: false,
    displayText: '',
    myChoice: choicesList[0],
    opponentChoice: choicesList[0],
  }

  restartGame = () => this.setState({showResult: false})

  validateScore = () => {
    const {myChoice, opponentChoice} = this.state
    if (myChoice.id === opponentChoice.id) {
      this.setState({showResult: true, displayText: 'IT IS DRAW'})
    } else if (myChoice.id === 'ROCK') {
      if (opponentChoice.id === 'PAPER') {
        this.setState(prevState => ({
          score: prevState.score - 1,
          showResult: true,
          displayText: 'YOU LOSE',
        }))
      } else {
        this.setState(prevState => ({
          score: prevState.score + 1,
          showResult: true,
          displayText: 'YOU WON',
        }))
      }
    } else if (myChoice.id === 'PAPER') {
      if (opponentChoice.id === 'SCISSORS') {
        this.setState(prevState => ({
          score: prevState.score - 1,
          showResult: true,
          displayText: 'YOU LOSE',
        }))
      } else {
        this.setState(prevState => ({
          score: prevState.score + 1,
          showResult: true,
          displayText: 'YOU WON',
        }))
      }
    } else if (myChoice.id === 'SCISSORS') {
      if (opponentChoice.id === 'ROCK') {
        this.setState(prevState => ({
          score: prevState.score - 1,
          showResult: true,
          displayText: 'YOU LOSE',
        }))
      } else {
        this.setState(prevState => ({
          score: prevState.score + 1,
          showResult: true,
          displayText: 'YOU WON',
        }))
      }
    }
  }

  getChoice = () => {
    let i = 3
    while (i < 0 || i > 2) {
      i = Math.floor(Math.random() * 10)
    }
    return choicesList[i]
  }

  render() {
    const {
      displayText,
      showResult,
      score,
      opponentChoice,
      myChoice,
    } = this.state
    return (
      <div className="container">
        <div className="card">
          <div className="score-title-card">
            <div>
              <p>ROCK</p>
              <p>PAPER</p>
              <p>SCISSOR</p>
            </div>
            <div className="score-card">
              <p>Score</p>
              <h1>{score}</h1>
            </div>
          </div>
          {showResult ? (
            <div className="result-div">
              <div className="result-images-div">
                <div className="result-img-div">
                  <p>YOU</p>
                  <img
                    alt="your choice"
                    className="image"
                    src={myChoice.image}
                  />
                </div>
                <div className="result-img-div">
                  <p>OPPONENT</p>
                  <img
                    alt="opponent choice"
                    className="image"
                    src={opponentChoice.image}
                  />
                </div>
              </div>
              <h1>{displayText}</h1>
              <button
                type="button"
                className="play-again-btn"
                onClick={this.restartGame}
              >
                PLAY AGAIN
              </button>
            </div>
          ) : (
            <ul className="play-card">
              {choicesList.map(choice => {
                const choiceFunc = () => {
                  this.setState(
                    {
                      myChoice: {...choice},
                      opponentChoice: {...this.getChoice()},
                    },
                    this.validateScore,
                  )
                }
                return (
                  <li value={choice.id} key={choice.id}>
                    <button
                      type="button"
                      data-testid={`${choice.id.toLowerCase()}Button`}
                      onClick={choiceFunc}
                      className="img-btn"
                    >
                      <img className="image" src={choice.image} />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
          <div className="popup-container">
            <Popup modal trigger={<button className="rules-btn">Rules</button>}>
              {close => (
                <>
                  <button
                    type="button"
                    className="popup-close-btn"
                    onClick={() => close()}
                  >
                    <RiCloseLine />
                  </button>
                  <img
                    alt="rules"
                    className="rules-img"
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  />
                </>
              )}
            </Popup>
          </div>
        </div>
      </div>
    )
  }
}

export default App
