import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";


export const Signup = () => {

    const [firstName, setfirstName] = useState("")
    const [lastName, setlasttName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 px-4 h-max">
                <Heading label={"Sign Up"} />
                <SubHeading description={"Enter your information to create an account"} />

                <InputBox onChange={e => { setfirstName(e.target.value)}} title={"First name"} placeholder={"Nandan"} />

                <InputBox onChange={e => {
                    setlasttName(e.target.value)
                }}title={"Last name"} placeholder={"Pathak"} />

                <InputBox onChange={e => {
                    setEmail(e.target.value)
                }}
                title={"Email"} placeholder={"nandan@gmail.com"} />

                <InputBox onChange={(e => {
                    setPassword(e.target.value)
                })} 
                title={"Password"} placeholder={"123@abc"} />

                <div className="mt-4">
                <Button onClick={async () => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                        username: email,
                        firstName: firstName,
                        lastName: lastName,
                        password: password
                    })
                    localStorage.setItem("token", response.data.token)
                    navigate("/dashboard")
                }}label={"Sign up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
        </div>
    </div>
}