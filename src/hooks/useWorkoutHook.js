import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkout = () => {
    const context = useContext(WorkoutContext)

    if(!context){
        Error('u should use this inside the ContextWorkoutProvider ')
    } 
         
    return context
     
}