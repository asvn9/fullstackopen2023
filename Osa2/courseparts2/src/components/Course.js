const Course = ({course}) => {
  return(
    <div>
    {course.map(part =>
      <div key = {part.id}>
          <Header course = {part} />
          <Content content = {part.parts} />
          <Total total = {part.parts} />
          </div>
          )}  </div>

)}

const Header = ({course}) =>{
  return(
    <h3>{course.name}</h3>
  )
}

const Content = ({content}) =>{
  return(
    <div>
      {content.map(part => 
      <div key = {part.id}>
      <Part part = {part.name} exercises = {part.exercises}/> 
      </div>
      )}
    </div>
  )
}

const Part = (props) => {
  return(
  <p>{props.part} {props.exercises}</p>
  )
}


const Total = ({total}) => {
  console.log(total)
    var total2 = total.reduce((sum, order) =>{
      console.log(sum, order)
      return sum + order.exercises
    },0)
    return (
      <p><b>All exercises {total2}</b></p>
    )
  }

export default Course