import React from 'react';
import './tomatoclock.css';


export default class TomatoClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break: ['break', 5],
      session: ['session', 25],
      pass_time: [],
      timer: '25:00'

    }

  }
  updateTimer = (time) => {
    let innerTime;
    innerTime = time > 60 ? innerTime : time;
    let min = Math.floor(innerTime / 60);
    let second = innerTime % 60;
    let secondShow = second === 0 ? '00' : toString(second);
    this.setState({ timer: `${min}:${secondShow}` })
  }

  handlebreakAdd = () => {
    if (this.state.break[1] < 59) {
      this.setState( (prevState)=>{
        return {
          break: prevState.state.break[1]+1
        }
      }
      )
    }
  }
  handlebreakSub = () => {
    if (this.state.break[1] > 0) {
      this.setState({ break: ['break', (this.state.break[1] - 1)] })

    }

  }
  handlesessionAdd = () => {
    if (this.state.session[1] < 59) {
      this.setState({ session: ['session', (this.state.session[1] + 1)] });
      this.updateTimer(this.state.session[1]);
    }
  }
  handlesessionSub = () => {
    if (this.state.session[1] > 0) {
      this.setState({ session: ['session', (this.state.session[1] - 1)] });
      this.updateTimer(this.state.session[1]);
    }
  }

  countDown = () => {
    let time = this.state.session[1] * 60;
    console.log(time);
    setInterval(this.updateTimer(), 1000);
    time--;
    console.log(time);
    this.updateTimer(time);
    console.log(time);

  }
  render() {
    return (
      <div className="wrapper">
        <h1>Pomodoro Clock</h1>
        <div className="gridbox-outer">
          <div className="adjust-box">
            <h4 id="break-label">Break Length</h4>
            <div className="controller">
              <input className="btn" type="button" value="+" onClick={this.handlebreakAdd} />
              <p>{this.state.break[1]}</p>
              <input className="btn" type="button" value="-" onClick={this.handlebreakSub} />
            </div>

          </div>
          <div className="adjust-box">
            <h4 id="session-label">Session Length</h4>
            <div className="controller">
              <input className="btn" type="button" value="+"
                onClick={this.handlesessionAdd} />
              <p>{this.state.session[1]}</p>
              <input className="btn" type="button" value="-"
                onClick={this.handlesessionSub} />
            </div>
          </div>
          <div className="display-panel">
            <div className="switchs">
              <button className="btn" title="start" onClick={this.countDown}>></button>
              <button className="btn" title="pause">||</button>
              <button className="btn" title="restart">O</button>
            </div>
            <div className="dail">
              <h4>{this.state.session[0]}</h4>
              <p>{this.state.timer}</p>
            </div>
          </div>


        </div>



      </div>

    )
  }
}
