'use client'
import {
    CogIcon
} from '@heroicons/react/24/outline'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import SettingSidebar from '@/Components/Dashboard/SettingSidebar'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SettingPage() {
    return (
        <AuthenticatedLayout>
            <div className="mx-auto lg:flex border dark:border-gray-700 bg-white dark:bg-slate-900">
                <SettingSidebar />

                <div className="">
                    <div className="flex space-x-1 items-center py-2 shadow px-5">
                        <CogIcon className="h-6 text-indigo-600" />
                        <span className="text-indigo-600 font-semibold leading-6">Lorem ipsum dolor</span>
                    </div>
                    <div className='px-5'>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
