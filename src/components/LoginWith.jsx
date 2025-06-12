import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../providers/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

const LoginWith = () => {

    const { signInWithGoogle } = useContext(AuthContext);


    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                toast.success('Google sign-in successful!');
                // alert('Google sign-in successful!');
                onSuccess(user);
            })
            .catch(error => {
                // console.error('Google sign-in error:', error);
                toast.error('Google sign-in failed!', error.message);
            });
    }


    return (
       <div>
            <div className="divider">OR</div>
            <div className="flex flex-col gap-3 mb-5">
                <button onClick={handleGoogleLogin} className="btn btn-outline">
                    <FcGoogle />
                    Login with Google
                </button>
            </div>
        <Toaster></Toaster>
        </div>
    );
};

export default LoginWith;