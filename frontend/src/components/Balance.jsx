export const Balance = ({ amount }) => {
    return (
        <div className="flex justify-start items-center">
            <div className="font-bold text-lg">
                Your Balance :
            </div>
            <div className="font-semibold ml-4 text-lg">
                Rs {amount} 
            </div>
        </div>
    )
}