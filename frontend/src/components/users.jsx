import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { InputBox } from "../components/InputBox"
import { Name } from "./Name"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Users = () => {

    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user)
            })
    },[filter])

    return (
        <div>
            <div >
                <InputBox onChange={(e) => {
                    setFilter(e.target.value)
                }} title={"Users"} placeholder={"Search Users..."} />
            </div>
            <div>
                {users.map((user) => <User user= {user}/>)}
            </div>
        </div>  
    )
}


function User({ user }) {
        const navigate = useNavigate()

    return <div className="flex justify-between pt-4 ">
        <div>
            <Name user={user}/>
        </div>
        <div className="flex flex-col justify-center h-full">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName)
            }} label={"Send Money"} />
        </div>
    </div>
}
