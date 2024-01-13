import { useAuthContext } from "./useAuthHook";
import {useWorkout} from "./useWorkoutHook"

export const Uselogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workoutDispatch } = useWorkout()

    const logout = () => {
        // removing user from locall state 
        localStorage.removeItem('user')

        //dispatching logout action
        dispatch({type: 'LOGOUT'})
        workoutDispatch({type:'SET_WORKOUT', payload: null})
    }
    return {logout}
}