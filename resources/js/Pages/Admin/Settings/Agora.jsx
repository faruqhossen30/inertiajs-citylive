'use client'

import { useState } from 'react'
import { Dialog, DialogPanel, Field, Label, Switch } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import {
    BellIcon,
    CogIcon,
    CreditCardIcon,
    CubeIcon,
    FingerPrintIcon,
    FlagIcon,
    GlobeAltIcon,
    UserCircleIcon,
    UserGroupIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Link, useForm } from '@inertiajs/react'
import * as Headless from '@headlessui/react'
import SettingSidebar from '@/Components/Dashboard/SettingSidebar'
import { Input, InputGroup } from '@/Components/input'
import SubmitButton from '@/Components/Form/SubmitButton'

export default function Agora() {

    const { data, setData, post, processing, errors, reset } = useForm({
        project_name: '',
        app_id:'',
        app_certificate: '',

    });

    function submit(e) {
        e.preventDefault()
        post(route('settings.agora.store'));
    }

    return (
        <AuthenticatedLayout>

            <div className="mx-auto lg:flex border dark:border-gray-700 bg-white dark:bg-slate-900">
                <SettingSidebar />

                <div className="w-full">
                    <div className="flex space-x-1 items-center py-2 shadow px-5 border">
                        <CogIcon className="h-6 text-indigo-600" />
                        <span className="text-indigo-600 font-semibold leading-6 w-full">Agora Settings</span>
                    </div>
                    <form onSubmit={submit}>
                        <div className="p-5 space-y-5">
                            <Headless.Field className="flex items-center gap-6 w-full">
                                <Label>Name: </Label>
                                <InputGroup className="grow ">
                                    <UserGroupIcon />
                                    <Input name="project_name" className="text-red-500" onChange={(e) => setData('project_name',
                                        e.target.value)} placeholder="project_name&hellip;" aria-label="Search" />
                                </InputGroup>
                            </Headless.Field>

                            <Headless.Field className="flex items-center gap-8">
                                <Label>App ID</Label>
                                <InputGroup>
                                    <FlagIcon />
                                    <Input name="app_id" onChange={(e) => setData('app_id',
                                        e.target.value)} placeholder="app_id" aria-label="Search" />
                                </InputGroup>
                            </Headless.Field>
                            <Headless.Field className="flex items-center gap-8">
                                <Label>Certificate</Label>
                                <InputGroup>
                                    <FlagIcon />
                                    <Input name="app_certificate" onChange={(e) => setData('app_certificate',
                                        e.target.value)} placeholder="app_certificate" aria-label="Search" />
                                </InputGroup>
                            </Headless.Field>
                        <SubmitButton />
                        </div>
                    </form>

                </div>
            </div>
        </AuthenticatedLayout>
    )
}
