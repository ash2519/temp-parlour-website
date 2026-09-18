/* =========================================
   AARADHYA MAKEOVER
   ARTIST DASHBOARD
   BACKEND CONNECTED VERSION
========================================= */


/* =========================================
   BACKEND
========================================= */

const API_URL = "http://localhost:3000/api/appointments";


/* =========================================
   ADMIN LOGIN
========================================= */

const adminLoginForm =
    document.getElementById("adminLoginForm");

const adminLogin =
    document.getElementById("adminLogin");

const adminDashboard =
    document.getElementById("adminDashboard");

const adminLoginMessage =
    document.getElementById("adminLoginMessage");


const ADMIN_USERNAME = "artist";
const ADMIN_PASSWORD = "aaradhya123";


if (adminLoginForm) {

    adminLoginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const username =
                document.getElementById(
                    "adminUsername"
                ).value.trim();

            const password =
                document.getElementById(
                    "adminPassword"
                ).value;


            if (
                username === ADMIN_USERNAME &&
                password === ADMIN_PASSWORD
            ) {

                sessionStorage.setItem(
                    "aaradhyaAdminLoggedIn",
                    "true"
                );

                showDashboard();

            } else {

                if (adminLoginMessage) {

                    adminLoginMessage.textContent =
                        "Incorrect username or password.";

                }

            }

        }
    );

}


/* =========================================
   SHOW DASHBOARD
========================================= */

function showDashboard() {

    if (!adminLogin || !adminDashboard) {
        return;
    }

    adminLogin.classList.add("hidden");

    adminDashboard.classList.remove("hidden");

    loadAppointments();

}


/* =========================================
   CHECK LOGIN
========================================= */

function checkAdminLogin() {

    const loggedIn =
        sessionStorage.getItem(
            "aaradhyaAdminLoggedIn"
        );


    if (loggedIn === "true") {

        showDashboard();

    }

}


/* =========================================
   LOGOUT
========================================= */

const adminLogout =
    document.getElementById(
        "adminLogout"
    );


if (adminLogout) {

    adminLogout.addEventListener(
        "click",
        function () {

            sessionStorage.removeItem(
                "aaradhyaAdminLoggedIn"
            );

            window.location.reload();

        }
    );

}


/* =========================================
   APPOINTMENT DATA
========================================= */

let appointments = [];


/* =========================================
   LOAD APPOINTMENTS FROM SERVER
========================================= */

async function loadAppointments() {

    try {

        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "Server returned an error."
            );

        }


        const data =
            await response.json();


        if (
            data.success &&
            Array.isArray(
                data.appointments
            )
        ) {

            appointments =
                data.appointments;

        } else {

            appointments = [];

        }


        displayAppointments();

        updateStatistics();

    } catch (error) {

        console.error(
            "Could not load appointments:",
            error
        );


        appointments = [];


        displayAppointments();

        updateStatistics();


        const noAppointments =
            document.getElementById(
                "noAppointments"
            );


        if (noAppointments) {

            noAppointments.style.display =
                "block";

            noAppointments.textContent =
                "Could not connect to the appointment server. Make sure the backend is running.";

        }

    }

}


/* =========================================
   UPDATE APPOINTMENT ON SERVER
========================================= */

async function updateAppointmentStatus(
    id,
    status
) {

    try {

        const response =
            await fetch(
                `${API_URL}/${encodeURIComponent(id)}`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            status: status
                        })
                }
            );


        const data =
            await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Could not update appointment."
            );

        }


        /* Update local admin data */

        const index =
            appointments.findIndex(
                function (item) {

                    return String(item.id) ===
                        String(id);

                }
            );


        if (index !== -1) {

            appointments[index] =
                data.appointment;

        }


        displayAppointments();

        updateStatistics();


        return true;

    } catch (error) {

        console.error(
            "Could not update appointment:",
            error
        );


        alert(
            "Could not update the appointment. Please make sure the server is running."
        );


        return false;

    }

}


/* =========================================
   DELETE APPOINTMENT FROM SERVER
========================================= */

async function deleteAppointmentFromServer(id) {

    try {

        const response =
            await fetch(
                `${API_URL}/${encodeURIComponent(id)}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Could not delete appointment."
            );

        }


        appointments =
            appointments.filter(
                function (item) {

                    return String(item.id) !==
                        String(id);

                }
            );


        displayAppointments();

        updateStatistics();


        return true;

    } catch (error) {

        console.error(
            "Could not delete appointment:",
            error
        );


        alert(
            "Could not delete the appointment. Please make sure the server is running."
        );


        return false;

    }

}


/* =========================================
   DISPLAY APPOINTMENTS
========================================= */

function displayAppointments() {

    const table =
        document.getElementById(
            "appointmentsTable"
        );

    const noAppointments =
        document.getElementById(
            "noAppointments"
        );

    const searchInput =
        document.getElementById(
            "appointmentSearch"
        );

    const statusFilter =
        document.getElementById(
            "statusFilter"
        );


    if (!table) {
        return;
    }


    const searchTerm =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";


    const filteredAppointments =
        appointments.filter(
            function (appointment) {

                const customer =
                    String(
                        appointment.customer || ""
                    ).toLowerCase();


                const phone =
                    String(
                        appointment.phone || ""
                    ).toLowerCase();


                const service =
                    String(
                        appointment.service || ""
                    ).toLowerCase();


                const matchesSearch =
                    customer.includes(searchTerm) ||
                    phone.includes(searchTerm) ||
                    service.includes(searchTerm);


                const matchesStatus =
                    selectedStatus === "all" ||
                    appointment.status ===
                        selectedStatus;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );


    table.innerHTML = "";


    if (
        filteredAppointments.length ===
        0
    ) {

        if (noAppointments) {

            noAppointments.style.display =
                "block";

            noAppointments.textContent =
                appointments.length === 0
                    ? "No appointments found."
                    : "No appointments match your search.";

        }

        return;

    }


    if (noAppointments) {

        noAppointments.style.display =
            "none";

    }


    filteredAppointments.forEach(
        function (appointment) {

            const row =
                document.createElement("tr");


            const status =
                appointment.status ||
                "Pending";


            let statusClass =
                "status-pending";


            if (
                status === "Confirmed"
            ) {

                statusClass =
                    "status-confirmed";

            }


            if (
                status === "Cancelled"
            ) {

                statusClass =
                    "status-cancelled";

            }


            let whatsappButton = "";


            /*
               WhatsApp button appears
               only after confirmation.
            */

            if (
                status === "Confirmed" &&
                appointment.phone
            ) {

                whatsappButton = `
                    <button
                        class="action-button whatsapp-button"
                        onclick="sendWhatsAppConfirmation('${escapeAttribute(appointment.id)}')"
                    >
                        WhatsApp
                    </button>
                `;

            }


            row.innerHTML = `

                <td>
                    <strong>
                        ${escapeHTML(
                            appointment.customer ||
                            "Customer"
                        )}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(
                        appointment.service ||
                        "—"
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        appointment.date ||
                        "—"
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        appointment.time ||
                        "—"
                    )}
                </td>

                <td>
                    ${escapeHTML(
                        appointment.phone ||
                        "—"
                    )}
                </td>

                <td>
                    <span class="status ${statusClass}">
                        ${escapeHTML(status)}
                    </span>
                </td>

                <td>

                    <div class="action-buttons">

                        ${
                            status !== "Confirmed"
                                ? `
                                    <button
                                        class="action-button confirm-button"
                                        onclick="confirmAppointment('${escapeAttribute(appointment.id)}')"
                                    >
                                        Confirm
                                    </button>
                                `
                                : ""
                        }

                        ${
                            status !== "Cancelled"
                                ? `
                                    <button
                                        class="action-button cancel-button"
                                        onclick="cancelAppointment('${escapeAttribute(appointment.id)}')"
                                    >
                                        Cancel
                                    </button>
                                `
                                : ""
                        }

                        ${whatsappButton}

                        <button
                            class="action-button delete-button"
                            onclick="deleteAppointment('${escapeAttribute(appointment.id)}')"
                        >
                            Delete
                        </button>

                    </div>

                </td>

            `;


            table.appendChild(row);

        }
    );

}


/* =========================================
   CONFIRM APPOINTMENT
========================================= */

async function confirmAppointment(id) {

    const appointment =
        appointments.find(
            function (item) {

                return String(item.id) ===
                    String(id);

            }
        );


    if (!appointment) {
        return;
    }


    await updateAppointmentStatus(
        id,
        "Confirmed"
    );

}


/* =========================================
   WHATSAPP CONFIRMATION
========================================= */

function sendWhatsAppConfirmation(id) {

    const appointment =
        appointments.find(
            function (item) {

                return String(item.id) ===
                    String(id);

            }
        );


    if (!appointment) {
        return;
    }


    if (!appointment.phone) {

        alert(
            "This appointment does not have a phone number."
        );

        return;

    }


    let phone =
        String(
            appointment.phone
        ).replace(
            /\D/g,
            ""
        );


    if (phone.length === 10) {

        phone =
            "91" +
            phone;

    }


    if (
        phone.length !== 12 ||
        !phone.startsWith("91")
    ) {

        alert(
            "Please check the customer's Indian mobile number."
        );

        return;

    }


    const customerName =
        appointment.customer ||
        "Customer";


    const service =
        appointment.service ||
        "Beauty Service";


    const date =
        appointment.date ||
        "your selected date";


    const message =
        "Hello " +
        customerName +
        "! ✨\n\n" +

        "Your appointment at Aaradhya Makeover has been CONFIRMED. 💖\n\n" +

        "Service: " +
        service +
        "\n" +

        "Date: " +
        date +
        "\n\n" +

        "We look forward to welcoming you! 🌸\n\n" +

        "Aaradhya Makeover";


    const whatsappURL =
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(
            message
        );


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =========================================
   CANCEL APPOINTMENT
========================================= */

async function cancelAppointment(id) {

    const appointment =
        appointments.find(
            function (item) {

                return String(item.id) ===
                    String(id);

            }
        );


    if (!appointment) {
        return;
    }


    await updateAppointmentStatus(
        id,
        "Cancelled"
    );

}


/* =========================================
   DELETE APPOINTMENT
========================================= */

async function deleteAppointment(id) {

    const appointment =
        appointments.find(
            function (item) {

                return String(item.id) ===
                    String(id);

            }
        );


    if (!appointment) {
        return;
    }


    const customerName =
        appointment.customer ||
        "this appointment";


    const confirmed =
        window.confirm(
            `Delete the appointment for ${customerName}?`
        );


    if (!confirmed) {
        return;
    }


    await deleteAppointmentFromServer(id);

}


/* =========================================
   STATISTICS
========================================= */

function updateStatistics() {

    const todayCount =
        document.getElementById(
            "todayCount"
        );

    const upcomingCount =
        document.getElementById(
            "upcomingCount"
        );

    const pendingCount =
        document.getElementById(
            "pendingCount"
        );

    const confirmedCount =
        document.getElementById(
            "confirmedCount"
        );


    const today =
        new Date();


    const todayString =
        formatDateForComparison(
            today
        );


    let todayAppointments = 0;

    let upcomingAppointments = 0;

    let pendingAppointments = 0;

    let confirmedAppointments = 0;


    appointments.forEach(
        function (appointment) {

            if (
                appointment.status ===
                "Pending"
            ) {

                pendingAppointments++;

            }


            if (
                appointment.status ===
                "Confirmed"
            ) {

                confirmedAppointments++;

            }


            const appointmentDate =
                parseAppointmentDate(
                    appointment.date
                );


            if (!appointmentDate) {
                return;
            }


            const dateString =
                formatDateForComparison(
                    appointmentDate
                );


            if (
                dateString ===
                todayString
            ) {

                todayAppointments++;

            }


            if (
                appointmentDate >= today &&
                appointment.status !==
                    "Cancelled"
            ) {

                upcomingAppointments++;

            }

        }
    );


    if (todayCount) {

        todayCount.textContent =
            todayAppointments;

    }


    if (upcomingCount) {

        upcomingCount.textContent =
            upcomingAppointments;

    }


    if (pendingCount) {

        pendingCount.textContent =
            pendingAppointments;

    }


    if (confirmedCount) {

        confirmedCount.textContent =
            confirmedAppointments;

    }

}


/* =========================================
   DATE HELPERS
========================================= */

function parseAppointmentDate(dateValue) {

    if (!dateValue) {
        return null;
    }


    const date =
        new Date(dateValue);


    if (
        isNaN(
            date.getTime()
        )
    ) {

        return null;

    }


    return date;

}


function formatDateForComparison(date) {

    return (
        date.getFullYear() +
        "-" +
        String(
            date.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            date.getDate()
        ).padStart(2, "0")
    );

}


/* =========================================
   SEARCH
========================================= */

const appointmentSearch =
    document.getElementById(
        "appointmentSearch"
    );


if (appointmentSearch) {

    appointmentSearch.addEventListener(
        "input",
        function () {

            displayAppointments();

        }
    );

}


/* =========================================
   STATUS FILTER
========================================= */

const statusFilter =
    document.getElementById(
        "statusFilter"
    );


if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        function () {

            displayAppointments();

        }
    );

}


/* =========================================
   REFRESH
========================================= */

const refreshAppointments =
    document.getElementById(
        "refreshAppointments"
    );


if (refreshAppointments) {

    refreshAppointments.addEventListener(
        "click",
        function () {

            loadAppointments();

        }
    );

}


/* =========================================
   SECURITY HELPERS
========================================= */

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


function escapeAttribute(value) {

    return String(value)
        .replace(
            /\\/g,
            "\\\\"
        )
        .replace(
            /'/g,
            "\\'"
        );

}


/* =========================================
   START DASHBOARD
========================================= */

checkAdminLogin();