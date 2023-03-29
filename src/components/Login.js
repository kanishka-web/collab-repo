import React, { useEffect, useState } from 'react';
import axios from "axios";
import Cookies from 'universal-cookie';

const Login = () => {

    // Cookie for Login

    const cookies = new Cookies();

    const UserCookie = cookies.get('user');
    // Check if user cookie exists, if yes redirect to Dashboard
    if (UserCookie){
        window.location.href = "/";
      }

    // For Login Form
    const [email, setEmail] = useState('')
    const [users, setUsers] = useState(null)
    const [isError, setIsError] = useState(false)
    const [Error, setError] = useState('')

    useEffect(() => {
        document.title = "Weekly App Login";
        // Fetching Users from API
        axios.get("https://adensty-user-projects.onrender.com/users")
        .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      });
    }, []);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        var check = 0;
        // Validating Email
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            users.some(u => {
                // If email exists, set user Cookie and redirect to Dashboard
                if (u.email === email) {
                    cookies.set('user', u._id, { path: "/", maxAge: 86400})
                    setIsError(false);
                    window.location.href = "/";
                    check = 1
                }
        })
        if(check === 0) {
            setError("Email ID does not exist.")
            setIsError(true);
        }
    }
    else {
        setError("Email ID does not exist.")
        setIsError(true);
    }
}
    return ( 
       <div class="login">
            <div class="container my-3 py-3 my-5" >

            <div class="row justify-content-center align-items-center my-5">
                <div class="col-12 col-lg-4 col-md-6 col-sm-10">
                <div class="card card-outline card-primary m-3 p-3 text-center" style={{background:"#9bc3e2"}}>
                <div class="card-body w-100" style={{background:"#9bc3e2"}}>
                    <h3 class="m-3">Weekly App</h3>
                    { /* Login Form */ }
                    <form onSubmit={handleSubmit} autocomplete="off">
                    <div class="input-group mb-4">
                        <input
                        type="email"
                        class="form-control"
                        name="email"
                        placeholder="Email ID"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div class="input-group-append">
                        <div class="input-group-text fs-4">
                            <i class="fa-solid fa-envelope"></i>
                        </div>
                    </div>
                    </div>
                    {/* If there is an error, this will show the error  */ }
                    {isError && <p class="text-start">{Error}</p>}

                    <button
                            type="submit"
                            name="submit"
                            class="btn btn-primary btn-block"
                        >
                        
                            Sign In
                        </button>
                    </form>

                    
                </div>
                </div>
                </div>
            </div>

            </div>
       </div>
    );
}
 
export default Login;
