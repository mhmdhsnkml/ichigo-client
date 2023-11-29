import React, { useEffect, useState } from "react";
import { getUsers, ichigoApi } from "../api/ichigo";
import Case from "../components/Case";
import User from "../components/User";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getUsers();

      setUsers(response)
    }

    fetchData();
  }, [])

  useEffect(() => {
    console.log(users)
  }, [users])

  return (
    <Case>
      <table style={{width:'100%'}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Tier</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user.id} data={user} />
          ))}
        </tbody>
      </table>
    </Case>
  );
}
