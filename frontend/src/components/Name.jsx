export const Name = ({user, name}) => {
    return <div className="flex items-center">
        <div className="bg-slate-200 rounded-full w-12 h-12 flex justify-center">
            <div className="flex flex-col justify-center h-full">
                {user.firstName[0]}
            </div>
        </div>
        <div className="ml-4">
            {user.firstName} {user.lastName}
            {name}
        </div>
    </div>
}