import React, { useContext, useState } from 'react'

export const UserContext = React.createContext(null)

export const useUrl = () => {
     const userState = useContext(UserContext)
     return userState
}

export const UserProvider = (props) => {
    const [url, setUrl] = useState('')
    return(
        <UserContext.Provider value={{ url, setUrl}}>
            {props.children}
        </UserContext.Provider>
    )
}