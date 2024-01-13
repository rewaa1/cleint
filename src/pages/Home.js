import React, { useEffect, useState } from "react";
import { useWorkout } from "../hooks/useWorkoutHook";
import { useAuthContext } from "../hooks/useAuthHook";

// components 

import Details from '../components/Details'
import Form from "../components/WorkoutForm";


const Home = () => {
    const { user } = useAuthContext()

    const {workouts, dispatch} = useWorkout()
    /*const [workouts, setWorkouts] = useState(null);
    const [error, setError] = useState(null);*/

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workout',{
                headers: {
                    'Authorization': `Bearer ${user.token}` 
                }
            })
            const json = await response.json()
                if (!response.ok) {
                    throw new Error('Failed to fetch workouts');
                }
                if(response.ok){
                    dispatch({type: 'SET_WORKOUT', payload: json})
                }
                /*const json = await response.json();
                setWorkouts(json);*/    
        }
        if(user){
            fetchWorkouts();
        }
        
    }, [dispatch, user]);

    return (
        <div className="home">
            <div className="workouts">
                {/*{error && <p>Error: {error}</p>}*/}
                {workouts && workouts.map((workout) => (
                    <Details key={workout._id} workout={workout} />
                ))}
            </div>
            <Form/>
        </div>
    );
};

export default Home;
