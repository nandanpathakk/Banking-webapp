export const Button = ({label, onClick}) => {
    return(
        <div>
            <button onClick={onClick} className="bg-gray-800 rounded-lg w-full py-2.5 px-3 text-white hover:bg-gray-900 font-medium text-sm mb-2 focus:outline-none focus:ring-4 focus:ring-gray-300">
                { label }
            </button>
        </div>
    )
}