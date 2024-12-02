import DashbardCard from '@/Components/Dashboard/DashbardCard';
import { db } from '@/firebase';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { GiftIcon, MicrophoneIcon, UserGroupIcon, UserIcon, UsersIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import { collection, getAggregateFromServer, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [countUser, setCountUser] = useState(0);
    const [diamonds, setDiamonds] = useState(0);
    const [hostCount, setHostCount] = useState(0);
    const [agentCount, setAgentCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const userQuerySnapshot = await getDocs(collection(db, "users"));
            setCountUser(userQuerySnapshot.docs.length);

            let totalDiamond = 0;
            let totalhost = 0;
            let totalAgent = 0;

            userQuerySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.diamond) { // Ensure the field exists
                    totalDiamond += data.diamond;
                }
                if(data.host){
                    totalhost++;
                }

                if(data.agent){
                    totalAgent++;
                }
            });

            setDiamonds(totalDiamond);
            setHostCount(totalhost);
            setAgentCount(totalAgent);
        };


        fetchData();
    }, []);
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                <DashbardCard title={countUser} subtitle="Total Users" icon={<UserGroupIcon className="w-6 h-6" />} />
                <DashbardCard title={hostCount} subtitle="Total Host" icon={<VideoCameraIcon className="w-6 h-6" />} />
                <DashbardCard title={agentCount} subtitle="Total Agent" icon={<UsersIcon className="w-6 h-6" />} />
                <DashbardCard title={diamonds} subtitle="Total Diamond" icon={<GiftIcon className="w-6 h-6" />} />
            </div>

        </AuthenticatedLayout>
    );
}
