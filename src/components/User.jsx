import { Link } from "react-router-dom"

export default ({ data }) => {
  return (
    <tr>
      <td><Link to={`${data.id}`}>{data.id}</Link></td>
      <td>{data.name}</td>
      <td>{data.tier}</td>
    </tr>
  )
}
