export const InputBox = ({title, placeholder, onChange}) => {
    return (
        <div>
            <div className="font-medium text-sm py-2 text-left">
                {title}
            </div>
            <input onChange={onChange} placeholder = {placeholder} className="w-full p-2 text-left border rounded border-slate-200"/>
        </div>
    )
}