import { Link } from "react-router-dom"
export const BottomWarning = ({ label, buttonText, to }) => {
    return (
        <div className="flex text-sm py-2 justify-center">
            <div>
                {label}
            </div>
            <Link to={to} className="underline ml-1 cursor-pointer">
                {buttonText}
            </Link>
        </div>
    )
}