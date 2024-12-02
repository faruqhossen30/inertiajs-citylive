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
        post(route('admin.user.deposit.store', uid),
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

    const depositDiamond = async ()=>{
        const reciverRef = doc(db, "users", uid);
        await updateDoc(reciverRef, {
            diamond: increment(data.diamond)
        })
        const docRef = await addDoc(collection(db, "deposits"),{
            reciverRef: reciverRef,
            diamond: data.diamond,
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
            <div className="py-12 bg-white p-5">

                {user && <DescriptionList>
                    <DescriptionTerm>Photo</DescriptionTerm>
                    <DescriptionDetails>
                        <img src={user.photoURL} alt="photo" className="h-20 rounded border" />
                    </DescriptionDetails>

                    <DescriptionTerm>Name</DescriptionTerm>
                    <DescriptionDetails>{user.name}</DescriptionDetails>

                    <DescriptionTerm>Email</DescriptionTerm>
                    <DescriptionDetails>{user.email}</DescriptionDetails>

                    <DescriptionTerm>ID</DescriptionTerm>
                    <DescriptionDetails>{user.id}</DescriptionDetails>

                    <DescriptionTerm>Diamond</DescriptionTerm>
                    <DescriptionDetails>{user.diamond}</DescriptionDetails>


                </DescriptionList>
                }
                <hr />

                <form onSubmit={submit}>

                    <Field>
                        <Label>Diamond</Label>
                        <Input
                            name="diamond"
                            type="number"
                            value={data.diamond}
                            onChange={(e) => setData('diamond', e.target.value)}
                        />
                        {errors.diamond && <ErrorMessage>{errors.diamond}</ErrorMessage>}
                    </Field>

                    <Field>
                        <Label>Secret Password</Label>
                        <Input
                            name="password"
                            type="string"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                    </Field>
                    <div className="py-2">
                        <SubmitButton title="Deposit" />
                    </div>
                </form>
            </div>

        </AuthenticatedLayout>
    )
}

export default Deposit
