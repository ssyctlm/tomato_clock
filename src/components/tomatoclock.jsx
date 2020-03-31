import React from 'react';
import './tomatoclock.css';


export default class TomatoClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength:25,
      IntervalId:null,
      timerMin:25,
      timerSec:0,
      isPlay:false,
      isBreak: false,
      timerTitle:'session',
      beep:"https://goo.gl/65cBl1",
    }
  }
  
  handleChange = (returnKey,returnVal)=>{
    if(this.state.isPlay){return};
    if(returnKey==="sessionLength"){
      if(returnVal<=0){
        returnVal = 1;
      }else if(returnVal>=60){
        returnVal = 60;
      }
      this.setState({[returnKey]:returnVal , timerMin:returnVal, timerSec:0})
    }else{
      if(returnVal<=0){
        returnVal = 1;
      }else if(returnVal>=60){
        returnVal = 60;
      }
      this.setState({[returnKey]:returnVal})
    }
  };

  handleReset=()=>{
    clearInterval(this.state.IntervalId);
    this.setState({IntervalId:null,isPlay:false})
    let tempMin = this.state.sessionLength;
    this.setState(
      {timerMin:tempMin,timerSec:0}
    );
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  };

  handleStop=()=>{
    clearInterval(this.state.IntervalId);
    this.setState({IntervalId:null,isPlay:false})

  }

  handleStart = ()=>{
    if(this.state.IntervalId || this.state.isPlay){return};
    let returnId = setInterval(()=>{
      this.selfDecrement(this.state.sessionLength)
    },1000)
    this.setState({IntervalId:returnId,isPlay:true})
  }

  handleToggler = ()=>{
    if(this.state.isPlay){
      this.handleStop()
    }else{
      this.handleStart()
    }
  }

  handleBeep=()=>{
    this.audioBeep.play();
  }
  //!! before to achieve toggle break and session function
  selfDecrement=()=>{
    if(this.state.timerMin===0 && this.state.timerSec===0){
      // clearInterval(this.state.IntervalId);
      this.setState({isBreak:!this.state.isBreak});
      this.handleBeep();
      if(this.state.isBreak){
        this.setState({timerMin:this.state.breakLength,timerSec:0,timerTitle:'break'})
      }else{
        this.setState({timerMin:this.state.sessionLength,timerSec:0,timerTitle:'session'})
      }
    }else{
      if(this.state.timerSec===0){
        this.setState({timerMin:this.state.timerMin-1, timerSec:59})
      }else{
        this.setState({
          timerSec:this.state.timerSec-1
        })
      }
    }
  }





  render() {
    return (
      <div className="wrapper">
        <h1>Pomodoro Clock</h1>
        <div className="gridbox-outer">
          <Breakadjustor
          break = {this.state.breakLength}
          onChange = {this.handleChange}
          isPlay = {this.state.isPlay}
          />
          <Sessionjustor
          session = {this.state.sessionLength}
          onChange = {this.handleChange}
          isPlay = {this.state.isPlay}
          />
          <Timer
          title = {this.state.timerTitle}
          break = {this.state.breakLength}
          session = {this.state.sessionLength}
          stateMin = {this.state.timerMin}
          stateSec = {this.state.timerSec}
          stateIntervalId = {this.state.IntervalId}
          beep = {this.state.beep}
          handleReset = {this.handleReset}
          handleStop = {this.handleStop}
          handleStart = {this.handleStart}
          handleToggler = {this.handleToggler}
          handleBeep = {this.handleBeep}
          />
        </div>
        <audio preload="auto" src="https://www.freesoundslibrary.com/wp-content/uploads/2017/10/buzzer-sound.mp3" id="beep" ref={(audio)=>{this.audioBeep= audio}}></audio>
      </div>
    )
  }
}



function Breakadjustor(props){
  let classchange = props.isPlay? 'btn btn_cursor' : 'btn';
  return(
    <div className="adjust-box">
      <h4 id="break-label">Break Length</h4>
      <div className="controller">
        <input className={classchange} type="button" value="+" id="break-increment" onClick={()=>{props.onChange('breakLength',props.break+1)}} />
        <p id="break-length">{props.break}</p>
        <input className={classchange} type="button" value="-" id="break-decrement" onClick={()=>{props.onChange('breakLength',props.break-1)}} />
      </div>
    </div>
  )
}

function Sessionjustor(props){
  let classchange = props.isPlay? 'btn btn_cursor' : 'btn';
  return(
    <div className="adjust-box">
      <h4 id="session-label">Session Length</h4>
      <div className="controller">
        <input className={classchange} type="button" value="+"
          id="session-increment" onClick={()=>{props.onChange('sessionLength',props.session+1)}} />
        <p id="session-length">{props.session}</p>
        <input className={classchange} type="button" value="-"
          id="session-decrement" onClick={()=>{props.onChange('sessionLength',props.session-1)}} />
      </div>
    </div>
  )
}
function Timer(props){
  let min = props.stateMin;
  let sec = props.stateSec;


  let low = min===0? {'color':'red'} : { }


  return(
    <div className="display-panel">
    <div className="switchs">
      <button className="btn" id="start_stop" title="start" onClick={()=>{props.handleToggler()}} >></button>
      <button className="btn" title="pause" onClick={()=>{props.handleToggler()}}>||</button>
      <button className="btn" title="restart" onClick={()=>{props.handleReset()}}>O</button>
    </div>
    <div className="dail">
      <h4 id="timer-label">{props.title}</h4>
      <p style={low} id="time-left">{min<10? `0${min}`: min}:{sec<10? `0${sec}`: sec}</p>
    </div>

  </div>
  )
}
