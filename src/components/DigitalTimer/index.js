// Write your code here

import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    setTimerMinutes: 25,
    timerMinutes: 25,
    timerSeconds: '00',
    timerState: false,
  }

  updateTimer = () => {
    this.setIntervalId = setInterval(() => {
      let {timerSeconds, timerMinutes} = this.state
      if (timerSeconds === '00') {
        timerSeconds = 60
        timerMinutes -= 1
      }
      timerSeconds = parseInt(timerSeconds) - 1
      if (timerSeconds < 10) {
        timerSeconds = timerSeconds.toString()
        timerSeconds = 0 + timerSeconds
      }
      if (timerMinutes < 0) {
        clearInterval(this.setIntervalId)
        this.setState({timerState: false})
      } else {
        this.setState({timerSeconds, timerMinutes, timerState: true})
      }
    }, 1000)
  }

  onCLickStartBtn = () => {
    const {timerMinutes} = this.state
    if (timerMinutes >= 0) {
      this.updateTimer()
    }
  }

  onCLickPauseBtn = () => {
    this.setState({timerState: false})
    clearInterval(this.setIntervalId)
  }

  onClickResetBtn = () => {
    clearInterval(this.setIntervalId)
    const {setTimerMinutes} = this.state
    this.setState({
      timerState: false,
      timerMinutes: setTimerMinutes,
      timerSeconds: '00',
    })
  }

  onClickDecrementBtn = () => {
    const {timerState} = this.state
    if (!timerState) {
      this.setState(prevState => ({
        setTimerMinutes: prevState.setTimerMinutes - 1,
        timerMinutes: prevState.setTimerMinutes - 1,
      }))
    }
  }

  onClickIncrementBtn = () => {
    const {timerState} = this.state
    if (!timerState) {
      this.setState(prevState => ({
        setTimerMinutes: prevState.setTimerMinutes + 1,
        timerMinutes: prevState.setTimerMinutes + 1,
      }))
    }
  }

  timerStartBtn = () => (
    <div className="timer-control-container">
      <img
        className="timer-state-img"
        alt="play icon"
        src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
      />
      <button
        className="timer-control-btn"
        onClick={this.onCLickStartBtn}
        type="button"
      >
        Start
      </button>
    </div>
  )

  timerPauseBtn = () => (
    <div className="timer-control-container">
      <img
        className="timer-state-img"
        alt="pause icon"
        src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
      />
      <button
        onClick={this.onCLickPauseBtn}
        className="timer-control-btn"
        type="button"
      >
        Pause
      </button>
    </div>
  )

  render() {
    const {setTimerMinutes, timerMinutes, timerSeconds, timerState} = this.state

    return (
      <div className="app-container">
        <h1 className="app-title">Digital Timer</h1>
        <div className="content-container">
          <div className="timer-container">
            <div className="timer-card">
              <h1 className="timer">{`${timerMinutes}:${timerSeconds}`}</h1>
              <p className="timer-condition">
                {timerState ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="timer-controls-container">
            <div className="timer-control-card">
              {timerState ? this.timerPauseBtn() : this.timerStartBtn()}
              <div className="timer-control-container">
                <img
                  className="timer-state-img"
                  alt="reset icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                />
                <button
                  onClick={this.onClickResetBtn}
                  className="timer-control-btn"
                  type="button"
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="set-timer-controls-container">
              <p className="set-timer-limit-heading">Set Timer Limit</p>
              <div className="timer-set-container">
                <button
                  onClick={this.onClickDecrementBtn}
                  className="set-timer-btn"
                  type="button"
                >
                  -
                </button>
                <p className="set-timer-text">{setTimerMinutes}</p>
                <button
                  onClick={this.onClickIncrementBtn}
                  className="set-timer-btn"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
