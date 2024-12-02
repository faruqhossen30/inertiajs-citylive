'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useForm } from '@inertiajs/react'

export default function DeleteModal({deleteRoute}) {
    const { data, processing, errors, reset,delete: destroy  } = useForm({});
    const [open, setOpen] = useState(false)

    function toggleModal() {
        setOpen(!open);
    }

    function submit(e) {
        e.preventDefault();
        destroy(deleteRoute,{
            onSuccess: (res) => {
                console.log('delete');
                toggleModal();
            },
        });
    }

    return (
        <>
            <button
                onClick={() => toggleModal()}
                type="button"
                className="border border-red-300 p-1 rounded-md dark:border-gray-700 text-red-500" >
              <TrashIcon className="w-4 h-5" />
            </button>
            <Dialog open={open} onClose={setOpen} className="relative z-50">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <span className="sr-only">Close</span>
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        Deactivate account
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to deactivate your account? All of your data will be permanently removed from
                                            our servers forever. This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={submit} className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">

                                <button className="border flex items-center p-1 rounded-md dark:border-gray-700 text-white bg-red-600 ml-5">
                                    <TrashIcon className="w-4 h-4 " />
                                    Delecte
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="inline-flex w-full border justify-center rounded-md  px-3 py-2 text-sm font-semibold shadow-sm  sm:ml-3 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
