import {createContext, useContext} from 'react'

const userContext = createContext({
    user: {},
    token : ""
})

export const UserContextProvider = userContext.Provider;

export const useUser = () => {
    return useContext(userContext);
}

export default userContext;