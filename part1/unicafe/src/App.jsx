import { useState } from "react"
function App() {
  //guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  let nombreBotones = {
    good: 'good',
    neutral: 'neutral',
    bad: 'bad',
    all: 'all',
    average: 'average',
    positive: 'positive',
  }

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button name={nombreBotones.good} handleAction={handleGood}/>
      <Button name={nombreBotones.neutral } handleAction={handleNeutral}/>
      <Button name={nombreBotones.bad } handleAction={handleBad}/>
      <h2>statistics</h2>

      <Statistics 
      nameGood={nombreBotones.good} good={good}
      nameNeutral={nombreBotones.neutral} neutral={neutral}
      nameBad={nombreBotones.bad} bad={bad}
      nameAll={nombreBotones.all} all={all}
      nameAverage={nombreBotones.average}
      namePositive={nombreBotones.positive} positive={good}
      />
      
    </div>
  )
}

const Statistics = (props) =>{
  if(props.all === 0){
    return <div> No feedback given </div>
  }

  return(
    <table>
      <tbody>
        <StatisticLine name ={props.nameGood} counter={props.good}/>
        <StatisticLine name={props.nameNeutral} counter={props.neutral}/>
        <StatisticLine name={props.nameBad} counter={props.bad}/>
        <StatisticLine name={props.nameAll} counter={props.all}/>
        <Average name={props.nameAverage} good={props.good} bad={props.bad} all={props.all}/>
        <Positive name={props.namePositive} good={props.good} all={props.all}/>
      </tbody>
    </table>
  )
}

const StatisticLine = ({name, counter})=>{
  return(
    <tr>
      <td>{name}</td>
      <td>{counter}</td>
    </tr>
  )
}

const Button = ({name, handleAction})=>{
  return(
    <button onClick={handleAction}>{name}</button>
  )
}

const Positive = ({ good, all, name }) => {
  if (all === 0) {
    return (
      <tr>
        <td>{name}</td>
        <td>0%</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{name}</td>
      <td>{((good / all) * 100).toFixed(1)}%</td>
    </tr>
  );
};

const Average = ({ good, bad, all, name }) => {
  if (all === 0) {
    return (
      <tr>
        <td>{name}</td>
        <td>0</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{name}</td>
      <td>{(good - bad) / all}</td>
    </tr>
  );
};


export default App
