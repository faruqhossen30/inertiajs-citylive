import BreadcumComponent from '@/Components/Dashboard/BreadcumComponent'
import { db } from '@/firebase'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { CogIcon, EyeIcon, GiftIcon, LockClosedIcon, PencilIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { Head, Link } from '@inertiajs/react'
import { collection, getDocs, orderBy } from 'firebase/firestore'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { Badge } from '@/components/badge'
import SearchFilter from '@/Components/Custom/SearchFilter'

const Index = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "audiohosts"));
            const items = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(items);
        };

        fetchData();
    }, []);

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="flex justify-between items-center">
                <BreadcumComponent pageOne="Users" pageOneRoute="admin.users" />
            </div>

            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">

                            <SearchFilter routeName={'user.index'} />
                            {/* <!-- Table --> */}
                            <Table className="px-6" dense>
                                <TableHead>
                                    <TableRow>
                                        <TableHeader>S.N</TableHeader>
                                        <TableHeader>Photo</TableHeader>
                                        <TableHeader>Host</TableHeader>
                                        <TableHeader>Joind</TableHeader>
                                        <TableHeader>Action</TableHeader>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user, index) => (

                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{index + 1}</TableCell>
                                            <TableCell className="font-medium">
                                                <img src={user.photoURL} alt="photo" className="h-10 rounded border" />
                                            </TableCell>
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell className="font-medium">
                                                <span className='flex items-center space-x-1'><UserGroupIcon className="w-4 h-4" /> <span>{user.users.length}</span></span>
                                            </TableCell>
                                            <TableCell className="text-zinc-500 flex items-center space-x-1">
                                                <Link href={route('admin.user.disable', user.uid)} method="post" as="button" className="flex text-red-500 items-center space-x-1 border p-1 rounded-md dark:border-gray-700">
                                                    <LockClosedIcon className="w-4 h-4" />
                                                    <span>Kick Live</span>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {/* <!-- End Table --> */}
                            <hr className="dark:border-gray-700" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index
