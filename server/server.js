require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;


/* =========================================
   MIDDLEWARE
========================================= */

app.use(cors());
app.use(express.json());


/* =========================================
   APPOINTMENT STORAGE
========================================= */

const appointmentsFile =
    path.join(__dirname, "appointments.json");


/* Create appointments.json if it doesn't exist */

if (!fs.existsSync(appointmentsFile)) {

    fs.writeFileSync(
        appointmentsFile,
        JSON.stringify([], null, 2)
    );

}


/* Read appointments */

function getAppointments() {

    try {

        const data =
            fs.readFileSync(
                appointmentsFile,
                "utf8"
            );

        const appointments =
            JSON.parse(data);

        if (Array.isArray(appointments)) {
            return appointments;
        }

        return [];

    } catch (error) {

        console.error(
            "Could not read appointments:",
            error
        );

        return [];
    }
}


/* Save appointments */

function saveAppointments(appointments) {

    fs.writeFileSync(
        appointmentsFile,
        JSON.stringify(
            appointments,
            null,
            2
        )
    );
}


/* =========================================
   TEST ROUTE
========================================= */

app.get("/", (req, res) => {

    res.send(
        "Aaradhya Makeover Server is running! 💗✨"
    );

});


/* =========================================
   GET ALL APPOINTMENTS
========================================= */

app.get(
    "/api/appointments",
    (req, res) => {

        const appointments =
            getAppointments();

        res.json({
            success: true,
            appointments: appointments
        });

    }
);


/* =========================================
   CREATE APPOINTMENT
========================================= */

app.post(
    "/api/appointments",
    (req, res) => {

        const appointment =
            req.body;


        /* Basic validation */

        if (
            !appointment ||
            !appointment.customer ||
            !appointment.service ||
            !appointment.date ||
            !appointment.phone
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Missing required appointment information."

            });

        }


        /* Get existing appointments */

        const appointments =
            getAppointments();


        /* Create a clean appointment */

        const newAppointment = {

            id:
                appointment.id ||
                Date.now().toString(),

            customer:
                String(
                    appointment.customer
                ),

            service:
                String(
                    appointment.service
                ),

            date:
                String(
                    appointment.date
                ),

            time:
                appointment.time ||
                "Not specified",

            phone:
                String(
                    appointment.phone
                ),

            status:
                "Pending",

            createdAt:
                appointment.createdAt ||
                new Date().toISOString()

        };


        /* Add appointment */

        appointments.push(
            newAppointment
        );


        /* Save */

        saveAppointments(
            appointments
        );


        console.log(
            "New appointment received:",
            newAppointment
        );


        res.status(201).json({

            success: true,

            message:
                "Appointment received successfully!",

            appointment:
                newAppointment

        });

    }
);


/* =========================================
   UPDATE APPOINTMENT STATUS
========================================= */

app.patch(
    "/api/appointments/:id",
    (req, res) => {

        const appointmentId =
            req.params.id;

        const newStatus =
            req.body.status;


        if (!newStatus) {

            return res.status(400).json({

                success: false,

                message:
                    "Status is required."

            });

        }


        const appointments =
            getAppointments();


        const appointment =
            appointments.find(
                function (item) {

                    return String(item.id) ===
                        String(appointmentId);

                }
            );


        if (!appointment) {

            return res.status(404).json({

                success: false,

                message:
                    "Appointment not found."

            });

        }


        appointment.status =
            String(newStatus);


        appointment.updatedAt =
            new Date().toISOString();


        saveAppointments(
            appointments
        );


        console.log(
            "Appointment updated:",
            appointment
        );


        res.json({

            success: true,

            message:
                "Appointment status updated.",

            appointment:
                appointment

        });

    }
);


/* =========================================
   DELETE APPOINTMENT
========================================= */

app.delete(
    "/api/appointments/:id",
    (req, res) => {

        const appointmentId =
            req.params.id;


        const appointments =
            getAppointments();


        const updatedAppointments =
            appointments.filter(
                function (item) {

                    return String(item.id) !==
                        String(appointmentId);

                }
            );


        if (
            updatedAppointments.length ===
            appointments.length
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Appointment not found."

            });

        }


        saveAppointments(
            updatedAppointments
        );


        res.json({

            success: true,

            message:
                "Appointment deleted."

        });

    }
);


/* =========================================
   START SERVER
========================================= */

app.listen(
    PORT,
    () => {

        console.log(
            "================================="
        );

        console.log(
            "Aaradhya Makeover Backend"
        );

        console.log(
            `Server running at http://localhost:${PORT}`
        );

        console.log(
            "================================="
        );

    }
);
