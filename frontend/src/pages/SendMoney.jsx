import { useState } from "react"
import { Heading } from "../components/Heading"
import { Name } from "../components/Name"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { useSearchParams } from "react-router-dom"
import axios from "axios"

export const SendMoney = () => {
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")
    const name = searchParams.get("name")
    const [amount, setAmount] = useState(0)

    return <div className="flex flex-col h-screen items-center justify-center">
        <div className="w-96 border shadow-lg p-5 rounded-md">
            <div className="mb-20 flex justify-center">
                <Heading label={"Send Money"} />
            </div>
            <div className="flex items-center">
                <div className="bg-slate-200 rounded-full w-10 h-10 flex justify-center">
                    <div className="flex flex-col justify-center h-full">
                        {name[0].toUpperCase()}
                    </div>
                </div>
                <div className="ml-4">
                    {name.toUpperCase()}
                </div>
            </div>
            <div className="pb-4">
                <InputBox onChange={e => {
                    setAmount(e.target.value)
                    {console.log(amount)}
                }} title={"Amount (in Rs)"} placeholder={"Enter Amount"} />
            </div>
            <Button onClick={async () => {
                const response = await axios.post("http://localhost:3000/api/v1/account/transfer",{
                    to: id,
                    amount
                },{
                    headers:{
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
            }} label={"Initiate Transfer"} />
        </div>
    </div>

}