import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{
  state = {
    cycle:'Session',
    workTime:25,
    currentTime:"25:00",
    breakTime:5,
    timer:'',
    sound:'on',
    timerRunning:false,
  }
  incrementWorkTime = () => {
    this.setState({
      workTime: this.state.workTime + 1
    })
  }
  incrementBreakTime = () => {
    this.setState({
      breakTime: this.state.breakTime + 1
    })
  }
  decrementWorkTime = () => {
    if (this.state.workTime == 0) {

    } else {
      this.setState({
        workTime: this.state.workTime - 1
      })
    }


  }

  decrementBreakTime = () => {
    if (this.state.breakTime == 0) {

    } else {
      this.setState({
        breakTime: this.state.breakTime - 1
      })
    }
  }
  countdownLogic(time,timer){
    let m,s;
    this.setState({
      timer:timer
    })
    m = Math.floor(time/60)
    s = time - m *60

    this.setState({currentTime: m + " : " + s})
    if (time === 0) {
      if (this.state.cycle === "Session") {
        this.setState({cycle:"Break",timerRunning:false})
        clearInterval(this.state.timer)
        this.StartTimer(this.state.breakTime)
      } else {
        this.setState({cycle:"Session",timerRunning:false})
        clearInterval(this.state.timer)
        this.StartTimer(this.state.workTime)
      }
    }
  }
  StartTimer = (duration) => {
    this.setState({timerRunning:true})
    let time = duration *60
    let runningTimer = setInterval(()=>{
      this.countdownLogic.bind(time,runningTimer)
    },1000)


  }
  render(){
  return (
    <div class="w3-card-4">

  <header class="w3-container w3-light-grey">
    <h3>Pomodo Calculator</h3>
  </header>

  <div class="w3-container">
    <div id="timer-label">{this.state.cycle}</div>
  <div class="w3-round" id="time-left">
{this.state.currentTime}
  </div>
  </div>
  <p id="break-label">Break Length</p>
  <span id="break-length">{this.state.breakTime}</span>
  <button  onClick={this.decrementBreakTime.bind(this)} id="break-decrement" class="w3-button w3-green" type="button" value="">Decrease</button>
  <button   onClick={this.incrementBreakTime.bind(this)}id="break-increment" class="w3-button w3-green" type="button" value="">Increse</button>
  <p id="session-label">Session Length</p>
  <span id="session-length">{this.state.workTime}</span>

  <button  onClick={this.decrementWorkTime.bind(this)} id="session-decrement" class="w3-button w3-green" type="button" value="">Decrease</button>
  <button  onClick={this.incrementWorkTime.bind(this)} id="session-increment" class="w3-button w3-green" type="button" value="">Increse</button>

  <button onClick={this.StartTimer.bind(this,
    this.state.workTime)}id="start_stop" class="w3-button w3-green" type="button" value="">Start</button>

  </div>
  );
}
}
export default App;
