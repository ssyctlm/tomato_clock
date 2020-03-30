import React, { Component } from 'react'

export default class Countdown extends Component{
  constructor(props){
    super(props);
    this.state = {
      min:5,
      sec:0,
      IntervalId:null,
    }
  }
  selfDecrement=()=>{
    if(this.state.min<=0){ 
      this.stopDownClock()
    }
    else{
      if(this.state.sec === 0){
        this.setState({min:this.state.min-1,sec:59})
      }else{
        this.setState({sec:this.state.sec-1})
      }

    }
  }

  startDownClock = ()=>{
    if(this.state.IntervalId){ return }
    else{
      const IntervalId = setInterval(()=>{this.selfDecrement()}, 1000);
      this.setState({IntervalId:IntervalId});
    }
    }

  stopDownClock=()=>{
    clearInterval(this.state.IntervalId);
    this.setState({IntervalId:null})
  }
  resetDownClock=()=>{
    this.setState({min:5,sec:0});
  }
  render(){
    return (
      <React.Fragment> 
        <div style={{'color':'#fff','fontSize':'5rem'}}>{this.state.min}:{this.state.sec===0? '00': this.state.sec<10? `0${this.state.sec}`:this.state.sec}</div>
        <button onClick={this.startDownClock}>Start</button>
        <button onClick={this.stopDownClock}>Stop</button>
        <button onClick={this.resetDownClock}>Reset</button>
        
        
        </React.Fragment>
     
    )

  }

  // componentDidMount(){
  //   if(this.props){
  //     this.setState({min:this.props})
  //   }
  // }
}