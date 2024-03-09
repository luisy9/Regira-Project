import { useParams } from "react-router-dom"

export const Project = () => {

  const { id } = useParams();
  return (
    <div>
        <h1>El proyecto: {id}</h1>
    </div>
  )
}

export default Project
