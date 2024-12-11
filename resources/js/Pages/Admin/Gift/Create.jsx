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
import { Select } from '@/Components/select'

const Create = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        category: 'regular',
        diamond: 0,
        img: null,
    });

    function submit(e) {
        e.preventDefault()
        post(route('gifts.store'));
        // console.log(data);

    }

    // const createGift = async () => {
    //     const docRef = await addDoc(collection(db, "gifts"), {
    //         name: data.name,
    //         img: data.img,
    //         diamond: parseInt(data.diamond),
    //         commission: parseInt(data.commission),
    //         total: parseInt(data.diamond) + parseInt(data.commission)
    //     });
    //     return router.visit('gifts.index');
    // }

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Gift Create" />
            <BreadcumComponent pageOne="Categories" pageOneRoute="category.index" />

            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-gray-800 dark:border-neutral-700">
                    <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                        Category Create
                    </p>
                </div>
                <div className="p-4 md:p-5">
                    <div className=" px-2 py-2 sm:px-6 lg:px-4 mx-auto">
                        <form onSubmit={submit}>
                            <Field>
                                <Label>Name</Label>
                                <Input
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                            </Field>

                            <Field>
                                <Label>Project status</Label>
                                <Select name="category"  onChange={(e) => setData('category', e.target.value)}>
                                    <option value="regular">Regular</option>
                                    <option value="popular">Popular</option>
                                    <option value="luzury">Luzury</option>
                                    <option value="event">Event</option>
                                </Select>
                                {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
                            </Field>

                            {/* <Field>
                                <Label>Photo URL</Label>
                                <Input
                                    name="svgaURL"
                                    value={data.img}
                                    onChange={(e) => setData('svgaURL', e.target.value)}
                                />
                                {errors.svgaURL && <ErrorMessage>{errors.svgaURL}</ErrorMessage>}
                            </Field> */}


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
                                <Label>Photo URL</Label>
                                <Input
                                type="file"
                                    name="img"
                                    onChange={(e) => setData('img', e.target.files[0])}
                                />
                                {errors.img && <ErrorMessage>{errors.img}</ErrorMessage>}
                            </Field>


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
