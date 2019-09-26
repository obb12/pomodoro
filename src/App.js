import React from 'react';
import logo from './logo.svg';
import './App.css';
import Audio from './audio.mp3'
class App extends React.Component{
  state = {
    cycle:'Session',
    workTime:25,
    currentTime:"25:00",
    breakTime:5,
    time:'',
    timer:'',
    timerpaused:true,
    timerstarted:false,
    sound:'off',
    timerRunning:false,
  }
  constructor(props) {
   super(props);
   this.myRef = React.createRef();
 }
 stoptimer = () => {
   clearInterval(this.state.timer)
   this.setState({timerpaused:true})
 }
  incrementWorkTime = () => {
    if (this.state.workTime == 60) {

    }
    else {
      this.setState({
        workTime: this.state.workTime + 1
      })
    }

  }
  incrementBreakTime = () => {
    if (this.state.breakTime == 60) {

    } else {
    this.setState({
      breakTime: this.state.breakTime + 1
    })
  }
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

  }
  StartTimer = (duration) => {

    this.setState({timerRunning:true})
    let time = duration *60
    if (this.state.workTime == 0 || this.state.breakTime == 0) {

    } else {
      let runningTimer = setInterval(()=>{
        let m,s;
        this.setState({
          timer:runningTimer
        })
        m = Math.floor(time/60)
        s = time - m *60
        time = time - 1
        this.setState({time:time})
        this.setState({timerstarted:true})

        this.setState({timerpaused:false})

        m = m <= 10 ?  "0" + m  : m
        s = s <= 10 ? "0" + s : s
        this.setState({currentTime: m + ":" + s})
        if (time === 0) {

          if (this.state.cycle === "Session") {
            this.myRef.current.play()
            this.setState({cycle:"Break",timerRunning:false})
            clearInterval(runningTimer)
            this.StartTimer(this.state.breakTime)
          } else {
            this.myRef.current.play()
            this.setState({cycle:"Session",timerRunning:false})
            clearInterval(runningTimer)
            this.StartTimer(this.state.workTime)
          }
        }
      },1000)
    }



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
  <audio ref={this.myRef} src={Audio} id="beep"/>
{
  !this.state.timerpaused ?
  <button onClick={this.stoptimer}id="start_stop" class="w3-button w3-green" type="button" value="">Stop</button>

   :<button onClick={this.StartTimer.bind(this,
    this.state.timerstarted ? this.state.time :this.state.workTime )}id="start_stop" class="w3-button w3-green" type="button" value="">Start</button>

}

  </div>
  );
}
}
export default App;
