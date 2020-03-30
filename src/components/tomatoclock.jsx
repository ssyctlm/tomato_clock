import React from 'react';
import './tomatoclock.css';


export default class TomatoClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength:5,
      IntervalId:null,
      timerMin:5,
      timerSec:0,
      isPlay:false,
      isBreak: false
    }
  }
  
  handleChange = (returnKey,returnVal)=>{
    if(this.state.isPlay){return};
    if(returnKey==="sessionLength" && this.state.timerSec === 0){
      if(returnVal<=0){
        returnVal = 1;
      }else if(returnVal>=60){
        returnVal = 60;
      }
      this.setState({[returnKey]:returnVal , timerMin:returnVal})
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
    )
  };

  handleStop=()=>{
    clearInterval(this.state.IntervalId);
    this.setState({IntervalId:null,isPlay:false})

  }

  handleStart = ()=>{
    if(this.state.IntervalId){return};
    let returnId = setInterval(()=>{
      this.selfDecrement()
    },300)
    this.setState({IntervalId:returnId,isPlay:true})
  }

  selfDecrement =()=>{
    switch(this.state.isBreak){
      case true:
        this.setState({timerMin:this.state.breakLength})
        if(this.state.timerMin===0 && this.state.timerSec===0){
          clearInterval(this.state.IntervalId);
          this.setState({IntervalId:null,isplay:false,isBreak:!this.state.isBreak})
        }else{
          if(this.state.timerSec===0){
            this.setState({timerMin:this.state.timerMin-1, timerSec:59})
          }else{
            this.setState({
              timerSec:this.state.timerSec-1
            })
          }
        }
        break;
      case false:
        case true:
          this.setState({timerMin:this.state.sessionLength})
          if(this.state.timerMin===0 && this.state.timerSec===0){
            clearInterval(this.state.IntervalId);
            this.setState({IntervalId:null,isplay:false,isBreak:!this.state.isBreak})
          }else{
            if(this.state.timerSec===0){
              this.setState({timerMin:this.state.timerMin-1, timerSec:59})
            }else{
              this.setState({
                timerSec:this.state.timerSec-1
              })
            }
          }
        break;
    }
  }
  //!! before to achieve toggle break and session function
// selfDecrement=()=>{
//   if(this.state.timerMin===0 && this.state.timerSec===0){
//     clearInterval(this.state.IntervalId);
//     this.setState({IntervalId:null,isplay:false,isBreak:!this.state.isBreak})
//   }else{
//     if(this.state.timerSec===0){
//       this.setState({timerMin:this.state.timerMin-1, timerSec:59})
//     }else{
//       this.setState({
//         timerSec:this.state.timerSec-1
//       })
//     }
//   }
// }





  render() {
    return (
      <div className="wrapper">
        <h1>Pomodoro Clock</h1>
        <div className="gridbox-outer">
          <Breakadjustor
          break = {this.state.breakLength}
          onChange = {this.handleChange}
          />
          <Sessionjustor
          session = {this.state.sessionLength}
          onChange = {this.handleChange}
          />
          <Timer
          break = {this.state.breakLength}
          session = {this.state.sessionLength}
          stateMin = {this.state.timerMin}
          stateSec = {this.state.timerSec}
          stateIntervalId = {this.state.IntervalId}
          handleReset = {this.handleReset}
          handleStop = {this.handleStop}
          handleStart = {this.handleStart}
          />
        </div>
      </div>
    )
  }
}



function Breakadjustor(props){
  return(
    <div className="adjust-box">
      <h4 id="break-label">Break Length</h4>
      <div className="controller">
        <input className="btn" type="button" value="+" onClick={()=>{props.onChange('breakLength',props.break+1)}} />
        <p>{props.break}</p>
        <input className="btn" type="button" value="-" onClick={()=>{props.onChange('breakLength',props.break-1)}} />
      </div>
    </div>
  )
}

function Sessionjustor(props){
  return(
    <div className="adjust-box">
      <h4 id="session-label">Session Length</h4>
      <div className="controller">
        <input className="btn" type="button" value="+"
          onClick={()=>{props.onChange('sessionLength',props.session+1)}} />
        <p>{props.session}</p>
        <input className="btn" type="button" value="-"
          onClick={()=>{props.onChange('sessionLength',props.session-1)}} />
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
      <button className="btn" title="start" onClick={()=>{props.handleStart()}} >></button>
      <button className="btn" title="pause" onClick={()=>{props.handleStop()}}>||</button>
      <button className="btn" title="restart" onClick={()=>{props.handleReset()}}>O</button>
    </div>
    <div className="dail">
      <h4>Session</h4>
  <p style={low}>{min}:{sec===0? '00': sec<10? `0${sec}`: sec}</p>
    </div>
  </div>
  )
}
