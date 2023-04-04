import { ContentProps } from "./types"

const Total = (props:{parts: ContentProps[]}) => {
    return (
      <div>
        <p>
          Number of exercises{" "}
          {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
      </div>
    )
  }

export default Total