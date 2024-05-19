

export const ListComponent = ({ children }) => {
    return (
        <li className="font_poppins">
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