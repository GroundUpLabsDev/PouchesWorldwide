"use client";

import { useState, useEffect } from "react";
import { getUserRole } from "@/app/utils/getUserRole";
import Header from "@/components/AdminUi/Header";
import Footer from "@/components/Footer";
import DashboardTabs from "@/components/AdminUi/DashboardTabs";

export default function AdminDashboard() {

    return (
        <>
            <Header />
            <h1 className="pt-12 pl-16 text-black text-[32px] font-semibold font-['Poppins'] text-center">
                Manage Your All Members
            </h1>
            <DashboardTabs />
            <Footer />
        </>
    );
}
