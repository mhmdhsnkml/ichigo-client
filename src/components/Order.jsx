export default ({ order }) => {
  return (
    <tr>
      <td>{order.order_uniq_id}</td>
      <td>${order.total_in_cents / 100}</td>
      <td>{order.ordered_at}</td>
    </tr>
  )
}