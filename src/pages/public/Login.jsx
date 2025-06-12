import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../providers/AuthProvider';
import LoginWith from '../../components/LoginWith';

const Login = () => {

    const { logInUser, resetPassword } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const location = useLocation();
    const navigate = useNavigate();


    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        logInUser(email, password)
            .then(() => {
                setError('');
                navigate(`${location.state ? location.state : '/'}`);
            })
            .catch(error => {
                setError(error.message);
            });
    };

    const handleForgotPassword = () => {
        if (!email) {
            setError('Please enter your email to reset password.');
            return;
        }
        if (!resetPassword) {
            setError('Password reset function is not available.');
            return;
        }
        resetPassword(email)
            .then(() => {
                setError('Password reset email sent!');
            })
            .catch(error => {
                setError(error.message);
            });
    };


    return (
        <div className="flex items-center justify-center min-h-screen mx-5">
            <div className="w-full my-10 max-w-md p-8 space-y-4 bg-base-100 rounded-xl border border-base-300">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="input focus:outline-none input-bordered w-full"
                            placeholder="Your Email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="input focus:outline-none input-bordered w-full"
                            placeholder="Password"
                            required
                        />
                    </div>
                    {error && <p className='text-red-500 text-sm'>{error}</p>}
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                    >
                        Login
                    </button>
                </form>
                <div className="flex justify-between items-center mt-2">
                    <button
                        className="btn btn-link text-sm p-0"
                        onClick={handleForgotPassword}
                    >
                        Forgot Password?
                    </button>
                    <Link to="/auth/register" className="link link-hover text-secondary font-bold text-sm">
                        Register
                    </Link>
                </div>
                <LoginWith onSuccess={() => navigate(`${location.state ? location.state : '/'}`)}></LoginWith>
            </div>
        </div>
    );
};

export default Login;