import {Link } from "react-router-dom";
import { Uselogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthHook";

const NavBar = () => {
    const { logout } = Uselogout()
    const { user } = useAuthContext()
    const handleClick = () =>{
        logout()
    }
    return (
        <header>
            <div className="container">
                <Link to='/' >
                    <h1>Workout</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Logout</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to='/login'>
                                Login
                            </Link>
                            <Link to='/signup'>
                                Signup
                            </Link>
                        </div>
                    )}
                </nav>
                
            </div>
        </header>
    )
}

export default NavBar;