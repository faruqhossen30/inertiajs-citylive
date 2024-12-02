import BreadcumComponent from '@/Components/Dashboard/BreadcumComponent'
import { db } from '@/firebase'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router, useForm } from '@inertiajs/react'
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { ErrorMessage, Field, Label } from '@/components/fieldset'
import { Input } from '@/components/input'
import SubmitButton from '@/Components/Form/SubmitButton'
import ThumbnailInput from '@/Components/Form/ThumbnailInput'

const Create = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        photoURL: '',
    });

    function submit(e){
        e.preventDefault()
        // createGift();
        post(route('wallpapers.store'));

        // console.log(data);
    }
    const createGift = async ()=>{
        const docRef = await addDoc(collection(db, "gifts"),{
            name: data.name,
            photoURL: data.photoURL,
            diamond: parseInt(data.diamond),
            commission: parseInt(data.commission),
            total: parseInt(data.diamond) + parseInt(data.commission)
        });
        return router.visit('gifts.index');
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Wallpaper Create" />
            <BreadcumComponent pageOne="Wallpagers" pageOneRoute="wallpapers.index" />

            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-gray-800 dark:border-neutral-700">
                    <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                    Wallpager Create
                    </p>
                </div>
                <div className="p-4 md:p-5">
                    <div className=" px-2 py-2 sm:px-6 lg:px-4 mx-auto">
                        <form onSubmit={submit}>
                            <Field>
                                <Label>Full name</Label>
                                <Input
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                            </Field>

                            <div className="max-w-sm">
                            <Field>
                                <Label>Photo URL</Label>
                                <ThumbnailInput name="thumbnail" setData={setData} errors={errors} placeholder="Thumbnail" />
                                {errors.photoURL && <ErrorMessage>{errors.photoURL}</ErrorMessage>}
                            </Field>
                            </div>




                            {/* <div className="max-w-sm">
                                <ThumbnailInput name="thumbnail" setData={setData} errors={errors} placeholder="Thumbnail" />
                            </div> */}
                            <div className="py-2">
                                <SubmitButton />
                            </div>
                        </form>
                    </div>
                </div>
            </div>




        </AuthenticatedLayout>
    )
}

export default Create
