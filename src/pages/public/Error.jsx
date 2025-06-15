import { Link } from 'react-router';


const Error = () => {



    return (
        <div>
            <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-2xl font-semibold">404</p>
                    <img className='w-100 mx-auto' src="\error.png" alt="" />
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">Food not found</h1>
                    <p className="mt-6 text-lg font-medium text-pretty sm:text-xl/8">Oops, You are lost in search of Food.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link to={"/"} className="btn">Go back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}; 

export default Error;