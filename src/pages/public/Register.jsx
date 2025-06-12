import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import LoginWith from '../../components/LoginWith';

const Register = () => {
    const { createUser, updateUser, setUser } = useContext(AuthContext);
    const [accepted, setAccepted] = useState(false);
    const [error, setError] = useState('');


    const navigate = useNavigate();

    const handleRegister = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photo.value;
        // console.log(name, email, password, photo);
        
        if (!accepted) return;
        createUser(email, password)
            .then(result => {
                const user = result.user;
                updateUser({ displayName: name, photoURL: photo }).then(
                    () => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        navigate('/');
                    }).catch(error => {
                        // this is a catch block for the updateUser method
                        // const errorCode = error.code;
                        const errorMessage = error.message;
                        setError(errorMessage);
                        setUser(user);
                    });
                // console.log(user);
                toast.success('User Created Successfully!');
                // alert('User Created Successfully!');
            })
            .catch(error => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
                // console.log(errorCode, errorMessage);
            })
    };


    return (
        <div className="flex items-center justify-center min-h-screen mx-5">
            <div className="w-full my-10 max-w-md p-8 space-y-4 bg-base-100 rounded-xl border border-base-300">
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                <form onSubmit={(event) => {
                    const form = event.target;
                    const password = form.password.value;
                    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

                    if (!passwordRegex.test(password)) {
                        event.preventDefault();
                        setError('Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long.');
                        return;
                    }

                    handleRegister(event);
                }}
                    className="space-y-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="input focus:outline-none input-bordered w-full"
                            placeholder="Your Name"
                            required
                        />
                    </div>
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
                    <div>
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input
                            type="url"
                            name="photo"
                            className="input focus:outline-none input-bordered w-full"
                            placeholder="Photo URL"
                        />
                    </div>
                    <div className="form-control">
                        <label className="cursor-pointer label flex items-center gap-2">
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={accepted}
                                onChange={e => setAccepted(e.target.checked)}
                                required
                            />
                            <span className="label-text">Accept <a href="#" className="link link-primary">Terms and Conditions</a></span>
                        </label>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={!accepted}
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-lg">Already have an account? <Link to="/auth/login" className="link link-hover text-secondary font-bold">Login</Link></p>
                <LoginWith onSuccess={() => navigate(`${location.state ? location.state : '/'}`)}></LoginWith>
            </div>
            <Toaster />
        </div>
    );
};

export default Register;