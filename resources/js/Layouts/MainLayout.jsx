// resources/js/Layouts/MainLayout.jsx

import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { usePage } from "@inertiajs/react"; // Ensure correct import
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function MainLayout({ children }) {
    const [isDrawer1Open, setDrawer1Open] = useState(false);

    const { flash = {} } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: flash.success,
                confirmButtonText: "OK",
                timer: 3000,
            });
        }

        if (flash.error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: flash.error,
                confirmButtonText: "OK",
                timer: 3000,
            });
        }
    }, [flash]);

    return (
        <div>
            {/* Pass setDrawer1Open to Header */}
            <Header
                isDrawer1Open={isDrawer1Open}
                setDrawer1Open={setDrawer1Open}
            />
            <main>
                {React.isValidElement(children)
                    ? React.cloneElement(children, { setDrawer1Open })
                    : children}
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;
