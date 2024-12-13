// resources/js/Layouts/MainLayout.jsx

import React, { useEffect } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { usePage } from "@inertiajs/react"; // Ensure correct import
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function MainLayout({ children }) {
    // Provide a default empty object for flash to prevent undefined errors
    const { flash = {} } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: flash.success,
                confirmButtonText: "OK",
                timer: 3000, // Auto close after 3 seconds
            });
        }

        if (flash.error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: flash.error,
                confirmButtonText: "OK",
                timer: 3000, // Auto close after 3 seconds
            });
        }
    }, [flash]);

    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}

export default MainLayout;
