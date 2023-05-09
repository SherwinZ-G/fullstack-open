/**
 * exercise 1.3-1.5 commented
 */

// const Header = (props) => {
//   return (
//       <h1>{props.course}</h1>
//   )
// }

// const Part=(props)=>{
//   return (
//     <p>
//     {props.part} : {props.exercises}

//   </p>
//   )
// }

// const Content = (props) => {
//   return (
//     <div>
//     <Part part={props.course.parts[0].part1} exercises={props.course.parts[0].exercises1}/>
//     <Part part={props.course.parts[1].part2} exercises={props.course.parts[1].exercises2}/>
//     <Part part={props.course.parts[2].part3} exercises={props.course.parts[2].exercises3}/>
//     </div>
     
//   )
// }

// const Total = (props) => {
//   return (
//     <p>
//     <p>Number of exercises {props.exercises}</p>
//   </p>
//   )
// }

// const App = () => {
//   const course = {
//     name:'Half Stack application development',
//     parts:[
//       {
//         part1:'Fundamentals of React',
//         exercises1 : 10
//       },
//       {
//         part2 : 'Using props to pass data',
//         exercises2 : 7
//       },
//       {
//         part3 : 'State of a component',
//         exercises3 : 14
//       }
//     ]
//   }


//   return (
//     <div>
//       <Header course={course.name} />
//       <Content course={course}/>
//       <Total exercises={course.parts[0].exercises1+course.parts[1].exercises2+course.parts[2].exercises3}></Total>
      
//     </div>
//   )
// }

// export default App

/**
 * exercise 1.6 unicafe begins
 */

import { useState } from 'react'

const Button=({text,handleClick})=>{
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics=(props)=>{
  const{good,bad,neutral,all,average,positiveFeedbackPercentage}=props
  if(all===0){
    return(
      <div>No feedback given</div>
    )
  }
  return(
    <div>
      <h2>Statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>

      <p>all: {all}</p>
      <p>average: {average.toFixed(2)}</p>
      <p>positiveFeedbackPercentage: {positiveFeedbackPercentage.toFixed(2)}</p>
  </div>
  )
  
    }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all=good+neutral+bad
  const average=all>0 ? (good-bad)/all:0
  const positiveFeedbackPercentage =all>0 ? (good / all) * 100:0;
  const handleGoodFeedback = () => {
    setGood(good + 1); 
  };

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1);
  };

  const handleBadFeedback = () => {
    setBad(bad + 1);
  };



      /**
       如果你直接在 `onClick` 中写 `setGoodFeedback(goodFeedback + 1)` 而不是使用 `handleGoodFeedback` 这样的事件处理程序函数，那么你会遇到以下问题：

      1. 初始渲染时 `goodFeedback` 的值为 `0`，因此第一次点击按钮时它的值将增加为 `1`。
      2. 但由于 `goodFeedback` 的值已经改变，React会重新渲染组件，这意味着 `goodFeedback` 又会重新被初始化为 `0`。
      3. 所以每次点击按钮后，`goodFeedback` 的值都只增加了 `1`，而不是累加。

      为了避免这个问题，你需要使用一个事件处理程序函数来更新 `goodFeedback` 的值，并在其中使用 `setGoodFeedback`。这样React就能在状态改变时检测到，并重新渲染组件。 */
  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={handleGoodFeedback} text="good" />
      <Button handleClick={handleNeutralFeedback} text="neutral" />
      <Button handleClick={handleBadFeedback} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} average={average} positiveFeedbackPercentage={positiveFeedbackPercentage} all={all}/>


    </div>
  )
}

export default App