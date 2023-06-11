import React , { useState } from "react";
import homeImage from '../assets/home.jpg'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

import './Auth.css';

const Auth = ({setAuth}) => {
    const navigate = useNavigate();
    const [pageType, setPageType] = useState("login");
    const [credentials , setCredentials ] = useState({fullName : '', email : '' , password : ''});
     
    const togglePageType = () => {
        if (pageType === "login"){
            setPageType("register");
        }
        else{
            setPageType("login");
        }
    }

    const handleSubmit = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API}/auth/${pageType}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            }) 
            if (res.ok){
                const data = await res.json();
                localStorage.setItem("token" , data.token);
                localStorage.setItem("userId" , data.user._id);
                localStorage.setItem("user" , data.user.fullName);
                setAuth(true);
                navigate('/room');
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Header />
            <div className='main'>
                <div className='authContainer'>
                <h1>Connect and Chat</h1>
                
                <input 
                    value={credentials.fullName}
                    onChange={(e) => setCredentials({ ...credentials, fullName: e.target.value })}
                    type='text' 
                    placeholder="Enter you name.." 
                />
                <input 
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    type='text' 
                    placeholder="Email" 
                />
                <input 
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
                    type='password' 
                    placeholder="Password" 
                    />
                <button 
                    onClick={handleSubmit}
                >
                    {(pageType === "login") ? "Login" : "Register"}
                </button>
                <p
                    onClick={togglePageType}
                >{(pageType === "login") ? "Register here..." : "Login here...."}</p>
                </div>
                <img src={homeImage} alt="chat vector" />
            </div>

            <Footer />
        </>
    )
}

export default Auth;