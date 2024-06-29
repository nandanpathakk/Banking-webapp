import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

export const Signin = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 px-4 h-max">
            <Heading label={"Sign In"} />
            <SubHeading description={"Enter your Credentials to access your account"} />
            <InputBox title={"Email"} placeholder={"nandan@gmail.com"} />
            <InputBox title={"Password"} placeholder={"123@abc"} />
            <div className="mt-4">
            <Button label={"Sign up"} />
            </div>
            <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>

    </div>
</div>
}
