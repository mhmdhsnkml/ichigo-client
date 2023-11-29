import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOrdersByUserId, getUser } from "../api/ichigo";
import Case from "../components/Case";
import Order from "../components/Order";

export default () => {
  const nextTier = {
    bronze: 'silver',
    silver: 'gold',
    gold: 'gold'
  }

  const tierTotal = {
    bronze: 0,
    silver: 10000,
    gold: 50000
  }

  const limit = 2;
  const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );

  let { id } = useParams();
  let [user, setUser] = useState({});
  let [progressBarPercentage, setProgressBarPercentage] = useState(0);
  let [orders, setOrders] = useState({});
  let [offset, setOffset] = useState(1);
  let [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const userResponse = await getUser({ id });
      const ordersResponse = await getOrdersByUserId({ id, limit, offset})

      setUser(userResponse)
      setOrders(ordersResponse)
    }

    fetchData()
  }, [])

  useEffect(() => {
    let progressTotal = user.total_spent_in_2_years / tierTotal[nextTier[user.tier]]
    progressTotal = progressTotal > 1 ? 1 : progressTotal

    setProgressBarPercentage(progressTotal * 100)
  }, [user])

  useEffect(() => {
    if (Object.keys(orders).length != 0) {
      let pagination = orders.pagination
      console.log(Math.ceil(pagination.total / pagination.limit))
      setTotalPage(Math.ceil(pagination.total / pagination.limit))
    }
  }, [orders])

  function onChangePagination(event) {
    setOffset(event.target.value)
  }

  useEffect(() => {
    async function fetchData() {
      const ordersResponse = await getOrdersByUserId({ id, limit, offset})

      setOrders(ordersResponse)
    }

    fetchData()
  }, [offset])

  return (
    <Case>
      <div className="w-full max-w-lg">
        <h4 className="text-2xl">Welcome, {user.name}</h4>
        <p>Your tier is {user.tier}, and you spent ${user.total_spent_in_2_years / 100}</p>
        <p>Your next tier is {nextTier[user.tier]}</p>
        <div className="progress-case">
          <div className="progress-bar" style={{width: `${progressBarPercentage}%`}}>{progressBarPercentage}%</div>
        </div>
        <br />
        <h5 className="text-2xl">Order List</h5>
        <p>Pagination</p>
        <select id="pagination" onChange={onChangePagination}>
          {arrayRange(1, totalPage, 1).map((idx) => (
            <option key={idx} value={idx}>{idx}</option>
          ))}
        </select>
        <table style={{width:'100%'}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Total</th>
              <th>Ordered At</th>
            </tr>
          </thead>
          <tbody>
            {orders.data && orders.data.map((order) => (
              <>
                <Order key={user.id} order={order} />
              </>
            ))}
          </tbody>
        </table>
      </div>
    </Case>
  )
}
