import { CoursePart } from "./types"
import Part from "./Part"

  const Content = (props: {parts: CoursePart[]}) => {
    return(
      <div>
            <Part parts= {props.parts} />
      </div>
    )
  }

  export default Content