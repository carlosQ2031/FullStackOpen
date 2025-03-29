const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({course}) => <h1>{course.name}</h1>

const Content = ({parts}) => {
  return (
    <>
      {parts.map((part,index)=> <Part key={index} part={part}/>)}
    </>
  )
}


const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Total = ({parts}) => <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>


export default App