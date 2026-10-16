import { useUser } from "../../Context/UserContext";
import UpdateUser from "./UpdateUser";

function Dashboard() {
  const {user} = useUser()

  return (
    <>
        <h2>Dashboard</h2>
        <p>name: {user.name}</p>
        <p>age: {user.age}</p>

        <UpdateUser />
    </>
  )
}

export default Dashboard;