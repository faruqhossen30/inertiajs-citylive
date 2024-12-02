import React from 'react'
import { Alert, AlertActions, AlertBody, AlertDescription, AlertTitle } from '@/components/alert'
import { Button } from '@/components/button'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react';
import { Link } from '@inertiajs/react';


export const StatusAlert = ({title,href,icon}) => {
    let [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button onClick={() => setIsOpen(true)} className="border flex space-x-1 border-red-200 p-1 rounded-md dark:border-gray-700 text-red-400">
                    {icon} {title}
            </button>

            <Alert open={isOpen} onClose={setIsOpen}>
                <AlertTitle>Are you sure you want to update {title ? title : 'this'} ?</AlertTitle>
                <AlertDescription>
                    {/* You can't get your data. Be sure and confirm to delete. Otherwise cancel now. */}
                </AlertDescription>
                <AlertActions>
                    <Button plain onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Link
                        href={href}
                        method="delete"
                        as="button"
                        className="border px-3 border-red-500 py-1 rounded-md text-red-500 bg-red-200 dark:border-gray-700"
                        onClick={() => setIsOpen(false)} // Close dialog after deletion
                    >
                        Update
                    </Link>


                </AlertActions>
            </Alert>
        </>
    )
}
