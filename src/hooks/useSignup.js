import { useState } from "react";
import { useAuthContext } from "./useAuthHook";

export const useSignup =() => {
    const [error, setError] = useState(null)
    const [loading, setLoading] =useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setLoading(true)
        setError(null)
        const response = await fetch('/api/user/signup/',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()
        if(!response.ok){
            setLoading(false)
            setError(json.error)
        }
        if(response.ok){

            // save the user so that when he closes browser and open agian he is still loged in
            localStorage.setItem('user', JSON.stringify(json))

            // update user authentication
            dispatch({type: 'LOGIN', payload: json})

            setLoading(false)   
        }
    }
    return {signup, loading, error}
}