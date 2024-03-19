import { createContext, useContext, useEffect, useReducer } from "react";

const AuthStateContext = createContext(undefined)
const initialValues = {
    user: null,
    token: null
}

const authReducer = (state, action) => {
    switch (action.type) {
        case "setToken": {
            if (action.data) {
                localStorage.setItem('token', action.data)
            }
            else {
                localStorage.removeItem('token')
            }
            return {
                ...state,
                token: action.data
            }
        }
        default: {
            throw Error("Unknown action type")
        }
    }
}

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialValues)
    const existingToken = localStorage.getItem('token') || null
    useEffect(() => {
        if (existingToken) {
            dispatch({type: 'setToken', data: existingToken})
        }
    }, [existingToken])
    return (
        <AuthStateContext.Provider value={{
            ...state,
            authDispatch: dispatch
        }}>
            {children}
        </AuthStateContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
