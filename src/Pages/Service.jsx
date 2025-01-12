import React, { useEffect, useState } from "react";
import BarangayClearance from "../Request-Certificate/BaragayClearance.jsx";
import BusinessClearance from "../Request-Certificate/BusinessClearance.jsx";
import CertificateForSoloParent from "../Request-Certificate/CertificateForSoloParent.jsx";
import CertificateOfIndigency from "../Request-Certificate/CertificateOfIndigency.jsx";
import CertificateOfResidency from "../Request-Certificate/CertificateOfResidency.jsx";
import CommonLaw from "../Request-Certificate/CommonLaw.jsx";
import Guardianship from "../Request-Certificate/Guardianship.jsx";
import JobSeeker from "../Request-Certificate/JobSeeker.jsx";
import TravelPermit from "../Request-Certificate/TravelPermit.jsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Service = () => {
    const [barangayLogo, setBarangayLogo] = useState("");
    const [activeTab, setActiveTab] = useState("BarangayClearance");

    useEffect(() => {
        const fetchBarangayInfo = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/barangay-info`);
                if (response.ok) {
                    const data = await response.json();
                    setBarangayLogo(data.logoUrl || "");
                } else {
                    console.error("Failed to fetch Barangay Logo");
                }
            } catch (error) {
                console.error("Error fetching barangay info:", error);
            }
        };

        fetchBarangayInfo();
    }, []);

    const renderForm = () => {
        switch (activeTab) {
            case "BarangayClearance":
                return <BarangayClearance />;
            case "BusinessClearance":
                return <BusinessClearance />;
            case "CertificateForSoloParent":
                return <CertificateForSoloParent />;
            case "CertificateOfIndigency":
                return <CertificateOfIndigency />;
            case "CertificateOfResidency":
                return <CertificateOfResidency />;
            case "CommonLaw":
                return <CommonLaw />;
            case "Guardianship":
                return <Guardianship />;
            case "JobSeeker":
                return <JobSeeker />;
            case "TravelPermit":
                return <TravelPermit />;
            default:
                return <BarangayClearance />;
        }
    };

    const tabButtons = [
        { id: "BarangayClearance", label: "Barangay Clearance" },
        { id: "BusinessClearance", label: "Business Clearance" },
        { id: "CertificateForSoloParent", label: "Solo Parent" },
        { id: "CertificateOfIndigency", label: "Indigency" },
        { id: "CertificateOfResidency", label: "Residency" },
        { id: "CommonLaw", label: "Common Law" },
        { id: "Guardianship", label: "Guardianship" },
        { id: "JobSeeker", label: "Job Seeker" },
        { id: "TravelPermit", label: "Travel Permit" },
    ];

    return (
        <section className="min-h-screen w-full bg-slate-50">
            <div className="w-full">
                {/* Header Section */}
                <div className="w-full bg-slate-50 pb-8 md:py-16">
                    <div className="text-center px-4">
                        <p className="text-xl text-green-700 mt-24">Services</p>
                        <p className="mt-4 text-2xl md:text-4xl font-bold text-green-700 px-0 lg:px-24">
                            We now offer online certificates. <br className="hidden md:block" />
                            You can now easily request a certificate online, making the process faster and more convenient.
                        </p>
                    </div>
                </div>


                {/* Tab Buttons Section - Full Width Background */}
                <div className="w-full py-8">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                            {tabButtons.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full px-3 py-3 md:py-4 rounded-lg text-sm md:text-base font-semibold 
                                        transition-all duration-200 hover:shadow-md
                                        ${activeTab === tab.id
                                            ? "bg-green-700 text-white shadow-lg transform scale-[1.02]"
                                            : "bg-white text-green-700 border-2 border-green-700 hover:bg-green-50"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="w-full bg-slate-50 py-8">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="bg-white p- md:p-  shad">
                            {renderForm()}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Service;