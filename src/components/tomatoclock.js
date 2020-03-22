import React from 'react';
import './tomatoclock.css';


export default class TomatoClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 1,
      break: 5,
      section: 5,

    }


  }
  render() {
    return (
      <div className="wrapper">
        <h1>Pomodoro Clock</h1>
        <div className="adjust-box">
          <h4 id="break-label">Break Length</h4>
          <p>{`+ ${this.state.break} -`}</p>
        </div>
        <div className="adjust-box">
          <h4 id="session-label">Session Length</h4>
          <p>{`+ ${this.state.section} -`}</p>
        </div>
        <div className="display-panel">
          <div className="switchs">
            <span>></span>
            <span>||</span>
            <span>O</span>
          </div>
          <div className="dail">
            <h4>Sesscion</h4>
            <p>25:00</p>
          </div>
        </div>
      </div>

    )
  }
}
