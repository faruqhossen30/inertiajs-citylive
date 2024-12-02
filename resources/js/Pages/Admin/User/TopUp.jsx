import BreadcumComponent from '@/Components/Dashboard/BreadcumComponent'
import { db } from '@/firebase'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { CogIcon, EyeIcon, PencilIcon, PlusCircleIcon, PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import { addDoc, collection, doc, FieldValue, getDoc, getDocs, increment, serverTimestamp, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list'
import moment from 'moment'
import { DeleteAlert } from '@/Components/Alert/DeleteAlert'
import { StatusAlert } from '@/Components/Alert/StatusAlert'
import { Button } from '@/Components/button'
import SubmitButton from '@/Components/Form/SubmitButton'
import { ErrorMessage, Field, Label } from '@/Components/fieldset'
import { Input } from '@/Components/input'


const Deposit = () => {
    const { uid } = route().params;
    // const params = route().params;
    const [user, setUser] = useState(null);
    const [Error, setError] = useState(null);


    const { data, setData, post, processing, errors, reset } = useForm({
        diamond: '',
        password: '',
    });


    function submit(e) {
        e.preventDefault()
        post(route('admin.topup.deposit.store', uid),
            {
                onSuccess: () => {
                    depositDiamond();
                },
                onError: () => {
                    console.log('onError');
                }
            }
        );
    }

    const depositDiamond = async () => {
        const reciverRef = doc(db, "users", uid);
        await updateDoc(reciverRef, {
            topupDiamond: increment(Number(data.diamond))
        })
        const docRef = await addDoc(collection(db, "deposits"), {
            reciverRef: reciverRef,
            diamond: Number(data.diamond),
            depositBy: 'admin',
            createdAt: serverTimestamp(),
        });
        location.reload();
    }



    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const docRef = doc(db, "users", uid); // specify your collection and document ID
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setUser(docSnap.data());
                } else {
                    setError("Document does not exist!");
                }
            } catch (err) {

            }
        };
        fetchDocument();
    }, []);



    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-white p-8 shadow-xl rounded-xl max-w-3xl mx-auto">
                {/* Header Title */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-semibold text-gray-900">Deposit for Top-up</h1>
                    <p className="text-sm text-gray-600 mt-2">Top up your account with diamond deposits securely.</p>
                </div>

                {user && (
                    <div className="mb-8">
                        <div className="overflow-hidden bg-white shadow-lg rounded-lg">
                            <div className="px-6 py-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Photo */}
                                    <div className="flex justify-start items-center">
                                        <img
                                            src={user.photoURL}
                                            alt="User Photo"
                                            className="h-36 w-36  border-2 border-gray-200 object-cover"
                                        />
                                    </div>

                                    {/* User Info */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <p className="font-medium text-gray-700">Name:</p>
                                            <p className="text-gray-900">{user.name}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-medium text-gray-700">Email:</p>
                                            <p className="text-gray-900">{user.email}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-medium text-gray-700">ID:</p>
                                            <p className="text-gray-900">{user.id}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-medium text-gray-700">Topup Balance:</p>
                                            <p className="text-green-600 text-xl font-extrabold ">{user.topupDiamond}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <hr className="border-gray-300 mb-8" />

                {/* Form */}
                <form onSubmit={submit} className="space-y-6">
                    {/* Diamond Field */}
                    <div>
                        <label htmlFor="diamond" className="block text-sm font-medium text-gray-700">
                            Diamond Amount
                        </label>
                        <input
                            id="diamond"
                            name="diamond"
                            type="number"
                            value={data.diamond}
                            onChange={(e) => setData("diamond", e.target.value)}
                            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 sm:text-sm"
                            placeholder="Enter diamond amount"
                        />
                        {errors.diamond && <p className="mt-2 text-sm text-red-600">{errors.diamond}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Secret Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 sm:text-sm"
                            placeholder="Enter your secret password"
                            autoComplete="new-password"  // Prevents password suggestions
                        />
                        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                    </div>


                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 px-6 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg shadow-lg text-lg font-medium transition-all duration-200 hover:from-teal-400 hover:to-teal-500 focus:ring-2 focus:ring-teal-300"
                        >
                            Deposit
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}

export default Deposit
