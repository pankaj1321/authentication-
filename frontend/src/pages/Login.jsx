
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSucess } from "../utils";

const Login = () => {
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()
    const handleChange = (e) => {
        setLogin((prev) => {
            const newLogin = { ...prev, [e.target.name]: e.target.value }
            return newLogin

        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = login;
        if (!email || !password) {
            handleError("please fill email and password");
            return;
        }
        try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(login)
            })
            const result = await response.json();
            const { message, success, error, name, jwtToken } = result;
            if (success) {
                handleSucess(message)
                localStorage.setItem('token', jwtToken)
                localStorage.setItem('loggedIn', name)
                setTimeout(() => {
                    navigate('/home')
                }, 1000);

            }
            else if (error) {
                const details = error?.details[0].message;
                handleError(details)

            }
            else if (!success) {
                handleError(message)
            }
            console.log(result);


        } catch (err) {
            handleError(err)

        }

    }
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Login
                    </h2>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-600 mb-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={login.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={login.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition"
                            
                        >
                            Login
                        </button>
                        <p className="mt-4 text-sm text-center text-gray-600">
                            Don’t have an account? <span className="text-purple-600 cursor-pointer"><Link to="/signup">Signup</Link></span>
                        </p>
                    </form>
                </div>
                <ToastContainer />
            </div>
        );
    };



export default Login;

