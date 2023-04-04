import { CoursePart } from "./types"

const Part = (props: {parts: CoursePart[]}) => {
return (
    <div>
        {props.parts.map((part, index) => {
            switch(part.kind){
                case "basic":
                    return <div key={index}><b>{part.name}</b> {part.exerciseCount}
                   <p>{part.description}</p> </div>
                break
                case "group":
                    return <div key= {index}><b>{part.name}</b>{part.exerciseCount} </div>
                break
                case "background":
                    return <div key = {index}><b>{part.name}</b></div>
                case "special":
                    return <div key= {index}><b>{part.name}</b> {part.exerciseCount} 
                    <p>required skills: {part.requirements[0]}, {part.requirements[1]}</p></div>
                default:
                    return null
            }
        })}
    </div>
  )
}

  export default Part