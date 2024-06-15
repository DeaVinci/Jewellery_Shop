

export const ListComponent = ({ children }) => {
    return (
        <li className="font_poppins list-none">
            <a className="btn bg-amber-300 hover:bg-amber-500 btn-xs sm:btn-sm lg:btn-md">
                {children}
            </a>
        </li>
    )
}

export const ProfileLabel = ({ children }) => {
    return (
        <label className="flex items-center gap-2 w-1/2 m-2">
            {children}
        </label>
    )
}

export const OrderLabel = ({ children }) => {
    return (
        <label className="flex flex-col md:flex-col gap-1 lg:flex-row xl:flex-row 2xl:flex-row items-center justify-center text-center w-1/2 m-2 md:justify-between p-2 border shadow-lg rounded-lg ">
            {children}
        </label>
    )
}

export const OrderInput = ({ type, value, name, placeholder, onChange }) => {
    return (
        <input
            type={type}
            value={value}
            name={name}
            className="flex w-32 md:w-48 lg:w-64 items-center text-center justify-center rounded-lg border"
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}