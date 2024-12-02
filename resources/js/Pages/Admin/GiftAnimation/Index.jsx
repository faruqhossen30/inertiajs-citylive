import BreadcumComponent from '@/Components/Dashboard/BreadcumComponent';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { EyeIcon } from '@heroicons/react/24/solid';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import { Button } from '@/Components/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import SearchFilter from '@/Components/Custom/SearchFilter';


export default function Index({ auth, animations }) {

    console.log(animations);

    return (
        <AuthenticatedLayout>
            <div className="flex justify-between items-center">
                <BreadcumComponent pageOne="Animation" pageOneRoute="animation.index" />
                <Button color="light" href={route('animation.create')}>
                    <PlusIcon />
                    Add item
                </Button>
            </div>
            <div className="bg-white border px-3 border-gray-200 rounded shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                <SearchFilter routeName={'animation.index'} />
                <Table dense >
                    <TableHead className="bg-gray-50 dark:bg-slate-800">
                        <TableRow>
                            <TableHeader>
                                <span className="mx-5">S.N</span>
                            </TableHeader>
                            <TableHeader>Photo</TableHeader>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Action</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {
                            animations.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                        <span className="mx-5">{item.id}</span>
                                    </TableCell>
                                    <TableCell><img src={window.location.origin + '/storage/' + item.photoURL} alt="photo" className="h-10" /></TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell className="text-zinc-500 flex space-x-1">
                                        <Link href={route('animation.destroy', item.id)} method="Delete" as="button" className="border p-1 rounded-md dark:border-gray-700 text-gray-500">
                                            <EyeIcon className="w-4 h-4" />
                                        </Link>

                                        <Link href={route('animation.edit', item.id)} className="border p-1 rounded-md dark:border-gray-700 text-green-500">
                                            <PencilIcon className="w-4 h-5" />
                                        </Link>
                                        <Link href={route('animation.destroy', item.id)} method="Delete" as="button" className="border p-1 rounded-md dark:border-gray-700 text-red-500">
                                            <TrashIcon className="w-4 h-4 " />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <Pagination pagination={animations} links={animations.links} />
            </div>



        </AuthenticatedLayout>
    );
}
