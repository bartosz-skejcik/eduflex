"use client";

import { Mobile, Sidebar } from "@/components/Sidebar";
import { useEffect, useState } from "react";
import {
    CalendarDaysIcon,
    HomeIcon,
    PencilSquareIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const navigation = [
    [
        {
            name: "Strona główna",
            href: "/panel",
            icon: HomeIcon,
        },
        {
            name: "Nauczyciele",
            href: "/panel/teachers",
            icon: UsersIcon,
        },
        {
            name: "Zapisz się",
            href: "/panel/appointments",
            icon: PencilSquareIcon,
        },
        {
            name: "Moje korepetycje",
            href: "/panel/myAppointments",
            icon: CalendarDaysIcon,
        },
    ],
    [
        {
            name: "Strona główna",
            href: "/panel",
            icon: HomeIcon,
        },
        {
            name: "Uczniowie",
            href: "/panel/students",
            icon: UsersIcon,
        },
        {
            name: "Stwórz korepetycje",
            href: "/panel/createAppointment",
            icon: PencilSquareIcon,
        },
        {
            name: "Moje korepetycje",
            href: "/panel/myAppointments",
            icon: CalendarDaysIcon,
        },
    ],
];

type Props = {
    children: React.ReactNode;
};

export default function PanelLayout({ children }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session } = useSession();
    const userRole = session?.user.role.toLocaleLowerCase();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname == "/panel" && userRole == "admin") {
            window.location.href = "/dashboard";
        }

        if (pathname == "/dashboard" && userRole !== "admin") {
            window.location.href = "/panel";
        }
    }, [pathname, userRole]);

    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
            <div>
                <Mobile
                    user={session?.user}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    navigation={
                        session?.user.role.toLocaleLowerCase() === "student"
                            ? navigation[0]
                            : navigation[1]
                    }
                />

                {/* Static sidebar for desktop */}
                <Sidebar
                    user={session?.user}
                    navigation={
                        session?.user.role.toLocaleLowerCase() === "student"
                            ? navigation[0]
                            : navigation[1]
                    }
                />

                <main className="fixed z-40 inset-0 pt-16 2xl:py-10 lg:pl-72 h-full">
                    <div className="px-4 py-4 sm:px-6 lg:px-8 grid grid-cols-3 grid-rows-2 gap-12 items-start h-full">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}
