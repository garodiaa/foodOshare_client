import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddFood = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const foodName = form.foodName.value;
        const foodImage = form.foodImage.value;
        const foodQuantity = form.foodQuantity.value;
        const pickupLocation = form.pickupLocation.value;
        const expiredDateTime = form.expiredDateTime.value;
        const additionalNotes = form.additionalNotes.value;

        const foodData = {
            foodName,
            foodImage,
            foodQuantity,
            pickupLocation,
            expiredDateTime,
            additionalNotes,
            donorName: user?.displayName || '',
            donorEmail: user?.email || '',
            donorImage: user?.photoURL || '',
            foodStatus: 'available',
            requestedBy: '',
            requestedDate: '',
        };

        try {
            const res = await axiosSecure.post('/foods', foodData);
            const data = res.data;
            if (data.insertedId || data.success) {
                toast.success('Food added successfully!');
                form.reset();
            } else {
                toast.error('Failed to add food.');
            }
        } catch (error) {
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-5 sm:mx-auto bg-base-100 p-8 rounded-3xl border border-neutral/20  my-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Food</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold mb-1">Food Name</label>
                    <input
                        type="text"
                        name="foodName"
                        className="input input-bordered focus:outline-none w-full"
                        placeholder="Enter food name"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Food Image URL</label>
                    <input
                        type="url"
                        name="foodImage"
                        className="input input-bordered focus:outline-none w-full"
                        placeholder="Paste image URL"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Food Quantity</label>
                    <input
                        type="number"
                        name="foodQuantity"
                        className="input input-bordered focus:outline-none w-full"
                        placeholder="Enter quantity"
                        min="1"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Pickup Location</label>
                    <input
                        type="text"
                        name="pickupLocation"
                        className="input input-bordered focus:outline-none w-full"
                        placeholder="Enter pickup location"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Expired Date/Time</label>
                    <input
                        type="datetime-local"
                        name="expiredDateTime"
                        className="input input-bordered focus-within:outline-none focus:outline-none w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Additional Notes</label>
                    <textarea
                        name="additionalNotes"
                        className="textarea textarea-bordered focus:outline-none w-full"
                        placeholder="Any additional notes"
                    />
                </div>
                <div className="flex items-center gap-4 bg-base-200 p-3 rounded-lg">
                    <img
                        src={user?.photoURL}
                        alt="Donor"
                        className="w-12 h-12 rounded-full object-cover border"
                    />
                    <div>
                        <div className="font-semibold">{user?.displayName}</div>
                        <div className="text-sm text-gray-500">{user?.email}</div>
                    </div>
                </div>
                <div>
                    <label className="block font-semibold mb-1">Food Status</label>
                    <input
                        type="text"
                        name="foodStatus"
                        value="available"
                        readOnly
                        className="input input-bordered focus:outline-none w-full bg-base-200"
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Food'}
                </button>
            </form>
            <Toaster />
        </div>
    );
};

export default AddFood;