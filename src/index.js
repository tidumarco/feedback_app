import React from 'react';
import ReactDOM from 'react-dom'


// constants declaration

const Title = () => <h1>Customer feedback survey</h1>

const Statistics = () => <div><h2>Statistics</h2></div>

const Display1 = ({counterGood}) => 
<div>
  <table>
    <tbody>
      <tr>
        <td style={{ width: 120 }}>Good feedback:</td>
        <td style={{ width: 120 }}>{counterGood}</td> 
      </tr>
    </tbody>
  </table>
</div>
const Display2 = ({counterNeutral}) => 
<div>
  <table>
    <tbody>
      <tr>
        <td style={{ width: 120 }}>Neutral feedback:</td>
        <td style={{ width: 120 }}>{counterNeutral}</td>
      </tr>
    </tbody>
  </table>
</div>
const Display3 = ({counterBad}) => 
<div>
  <table>
    <tbody>
      <tr>
        <td style={{ width: 120 }}>Bad feedback:</td>
        <td style={{ width: 120 }}>{counterBad}</td>
      </tr>
    </tbody>
  </table>
</div>

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Average = ({counterAverage}) => 
<div>
  <table>
    <tbody>
      <tr>
        <td style={{ width: 120 }}>Average:</td>
        <td style={{ width: 120 }}>{counterAverage}</td>
      </tr>
    </tbody>
  </table>
</div>

const Percentage= ({counterPercentage}) => 
<div>
  <table>
    <tbody>
      <tr>
        <td style={{ width: 120 }}>Percentage positive:</td>
        <td style={{ width: 120 }}>{counterPercentage}%</td>
      </tr>
    </tbody>
  </table>
</div>

//root component

class App extends React.Component {
  constructor(props) {
    super(props)    
    this.state = {
      show: false,
      counterGood: 0,
      counterNeutral: 0,
      counterBad: 0
    };
    
  }

  setValue1 = (value) => () => {this.setState({counterGood: value})}
  setValue2 = (value) => () => {this.setState({counterNeutral: value})}
  setValue3 = (value) => () => {this.setState({counterBad: value})}
  setShow = (value) => () => {this.setState({showing: true})}

  render() {
    let totalGood = this.state.counterGood
    let totalBad = this.state.counterBad
    let totalNeutral = this.state.counterNeutral
    let total = (totalGood + totalNeutral + totalBad)
    let totalAverage = ((totalGood + totalBad *-1) / total).toFixed(1)
    let positivePercentage = ((totalGood * 100) /total).toFixed(1)
    let value1 = this.setValue1
    let value2 = this.setValue2
    let value3 = this.setValue3
    let comp

    if (totalGood === 0 && totalNeutral === 0 && totalBad === 0){
      comp = <div><h3>No data input</h3></div>
    } else {
      comp = <div>  
      <Display1 counterGood={totalGood}/>
      <Display2 counterNeutral={totalNeutral}/>
      <Display3 counterBad={totalBad}/>
      <Average counterAverage={totalAverage}/>
      <Percentage counterPercentage={positivePercentage}/>
    </div>   
    }


    //return statement (actual showing components in app)
    return (
      <div>
        <Title />
        <div>
        <Button
          className="control"
          handleClick={value1(totalGood + 1)}
          text="Good"
        />
        <Button
          handleClick={value2(totalNeutral + 1)}
          text="Neutral"
        />
        <Button
          handleClick={value3(totalBad + 1)}
          text="Bad"
        />
        </div>
        <Statistics/>
        <div>
          {comp}
        </div>
        
     </div>
     
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)