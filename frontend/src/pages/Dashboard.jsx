import { Navbar } from "../components/Navbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/users"
import { useEffect } from "react"
import axios from "axios"

export const Dashboard = () => {

    useEffect(() =>{
        axios.get("http://localhost:3000/api/v1/account/balance")
    },[])

    return <div>
        <Navbar />
        <div className="mx-5">
            <div className="mt-5 mb-5">
            <Balance amount={"10,000"} />
            </div>
        <Users />
        </div>
    </div>
}
