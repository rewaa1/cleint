import { useState } from "react"
import { useWorkout } from "../hooks/useWorkoutHook";
import { useAuthContext } from "../hooks/useAuthHook";


const Form = () => {
    const { dispatch } = useWorkout()
    const { user } = useAuthContext()

    const [title, setTitle] =useState('')
    const [load, setLoad] =useState('')
    const [reps, setReps] =useState('')
    const[error, setError] = useState(null)
    const [emptyFeild, setEmptyFeild] = useState([])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        // validating user authentication
        if(!user){
            setError('u must be logged in')
            return 
        }
        const workout = {title,reps,load}

        const response = await fetch('/api/workout',{
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}` 
            }
        })
        const json = await response.json()
        if(!response.ok){
            const emptyFieldsFromJson = json.emptyFeild || [];
           setError(json.error) 
           setEmptyFeild(emptyFieldsFromJson);
        }
        if(response.ok){
            setError(null)
            setLoad('')
            setReps('')
            setTitle('')
            setEmptyFeild([])
            console.log("added succesfully", json)
            dispatch({
                type: 'ADD_WORKOUT',
                payload: json
            })
         }
    }
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Create new workout</h3>

            <label>exersize title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFeild.includes('title') ? 'error' : ''}
            />
            <label>Load (in kg):</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFeild.includes('load') ? 'error' : ''}
            />
            <label>Reps:</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFeild.includes('reps') ? 'error' : ''}
            />
            <button>Add workout</button>
            {error && <div className="error">error</div>}
        </form>
    )
}
export default Form;