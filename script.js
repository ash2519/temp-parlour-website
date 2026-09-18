/* =========================================
   AARADHYA MAKEOVER
   CUSTOMER WEBSITE SCRIPT
========================================= */


/* =========================================
   LOGIN
========================================= */

const loginScreen = document.getElementById("loginScreen");
const website = document.getElementById("website");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

const welcomeScreen = document.getElementById("welcomeScreen");
const welcomeUser = document.getElementById("welcomeUser");


/*
   ANY USERNAME IS ALLOWED

   PASSWORD IS FIXED
*/
const PASSWORD = "makeover";


/* =========================================
   ACCOUNT DATA
========================================= */

function getClientUsername() {
    return sessionStorage.getItem("aaradhyaUsername") || "User";
}

function getClientSurname() {
    return sessionStorage.getItem("aaradhyaSurname") || "";
}


/* =========================================
   ACCOUNT INITIALS
========================================= */

function getClientInitials() {

    const username = getClientUsername().trim();
    const surname = getClientSurname().trim();

    const firstLetter =
        username.charAt(0).toUpperCase();

    const secondLetter =
        surname.charAt(0).toUpperCase();

    return firstLetter + secondLetter;
}


/* =========================================
   ACCOUNT UI
========================================= */

function updateAccountUI() {

    const accountButton =
        document.getElementById("accountButton");

    const accountInitials =
        document.getElementById("accountInitials");

    const accountUsername =
        document.getElementById("accountUsername");

    const accountSurname =
        document.getElementById("accountSurname");

    const popupUsername =
        document.getElementById("popupUsername");

    const popupSurname =
        document.getElementById("popupSurname");

    const popupInitials =
        document.getElementById("popupInitials");

    if (!accountButton) {
        return;
    }

    const username =
        getClientUsername();

    const surname =
        getClientSurname();

    const initials =
        getClientInitials();


    if (accountInitials) {
        accountInitials.textContent =
            initials;
    }

    if (accountUsername) {
        accountUsername.textContent =
            username;
    }

    if (accountSurname) {
        accountSurname.textContent =
            surname;
    }

    if (popupUsername) {
        popupUsername.textContent =
            username;
    }

    if (popupSurname) {
        popupSurname.textContent =
            surname || "Not provided";
    }

    if (popupInitials) {
        popupInitials.textContent =
            initials;
    }

    accountButton.classList.remove("hidden");
}


/* =========================================
   ACCOUNT POPUP
========================================= */

const accountButton =
    document.getElementById("accountButton");

const accountPopup =
    document.getElementById("accountPopup");

const closeAccountPopup =
    document.getElementById("closeAccountPopup");


function openAccountPopup() {

    if (!accountPopup) {
        return;
    }

    updateAccountUI();

    accountPopup.classList.remove("hidden");

    document.body.classList.add(
        "account-popup-open"
    );
}


function closeAccountPopupFunction() {

    if (!accountPopup) {
        return;
    }

    accountPopup.classList.add("hidden");

    document.body.classList.remove(
        "account-popup-open"
    );
}


if (accountButton) {

    accountButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            openAccountPopup();
        }
    );
}


if (closeAccountPopup) {

    closeAccountPopup.addEventListener(
        "click",
        closeAccountPopupFunction
    );
}


if (accountPopup) {

    accountPopup.addEventListener(
        "click",
        function (event) {

            if (
                event.target === accountPopup
            ) {

                closeAccountPopupFunction();
            }
        }
    );
}


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeAccountPopupFunction();
        }
    }
);


/* =========================================
   SHOW LOGIN
========================================= */

function showLogin() {

    if (loginScreen) {

        loginScreen.classList.remove("hidden");
        loginScreen.style.display = "flex";
    }

    if (website) {

        website.classList.add("hidden");
        website.style.display = "none";
    }

    if (welcomeScreen) {

        welcomeScreen.classList.add("hidden");
        welcomeScreen.classList.remove(
            "welcome-fade-out"
        );

        welcomeScreen.style.display = "none";
    }

    if (accountButton) {

        accountButton.classList.add("hidden");
    }

    closeAccountPopupFunction();
}


/* =========================================
   WELCOME ANIMATION
========================================= */

function playWelcomeAnimation() {

    if (!welcomeScreen) {

        if (website) {

            website.classList.remove("hidden");
            website.style.display = "block";
        }

        updateAccountUI();

        return;
    }


    const savedUsername =
        getClientUsername();


    if (welcomeUser) {

        welcomeUser.textContent =
            "Welcome " + savedUsername;
    }


    welcomeScreen.classList.remove("hidden");

    welcomeScreen.classList.remove(
        "welcome-fade-out"
    );

    welcomeScreen.style.display = "flex";

    void welcomeScreen.offsetWidth;


    setTimeout(function () {

        welcomeScreen.classList.add(
            "welcome-fade-out"
        );


        setTimeout(function () {

            welcomeScreen.classList.add(
                "hidden"
            );

            welcomeScreen.style.display =
                "none";


            if (website) {

                website.classList.remove(
                    "hidden"
                );

                website.style.display =
                    "block";
            }


            updateAccountUI();

        }, 1800);

    }, 4500);
}


/* =========================================
   SHOW WEBSITE
========================================= */

function showWebsite(playAnimation) {

    if (loginScreen) {

        loginScreen.classList.add(
            "hidden"
        );

        loginScreen.style.display =
            "none";
    }


    if (playAnimation) {

        playWelcomeAnimation();

    } else {

        if (website) {

            website.classList.remove(
                "hidden"
            );

            website.style.display =
                "block";
        }

        updateAccountUI();
    }
}


/* =========================================
   LOGIN FORM
========================================= */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const usernameInput =
                document.getElementById(
                    "username"
                );

            const surnameInput =
                document.getElementById(
                    "surname"
                );

            const passwordInput =
                document.getElementById(
                    "password"
                );


            const username =
                usernameInput
                    ? usernameInput.value.trim()
                    : "";


            const surname =
                surnameInput
                    ? surnameInput.value.trim()
                    : "";


            const password =
                passwordInput
                    ? passwordInput.value
                    : "";


            /* =================================
               VALIDATION
            ================================= */

            if (!username) {

                if (loginMessage) {

                    loginMessage.textContent =
                        "Please enter your username.";
                }

                return;
            }


            if (!surname) {

                if (loginMessage) {

                    loginMessage.textContent =
                        "Please enter your surname.";
                }

                return;
            }


            if (password !== PASSWORD) {

                if (loginMessage) {

                    loginMessage.textContent =
                        "Incorrect password.";
                }

                return;
            }


            /* =================================
               SAVE CLIENT ACCOUNT
            ================================= */

            sessionStorage.setItem(
                "aaradhyaLoggedIn",
                "true"
            );

            sessionStorage.setItem(
                "aaradhyaUsername",
                username
            );

            sessionStorage.setItem(
                "aaradhyaSurname",
                surname
            );


            if (loginMessage) {

                loginMessage.textContent =
                    "";
            }


            updateAccountUI();

            showWebsite(true);
        }
    );
}


/* =========================================
   CHECK LOGIN
========================================= */

function checkLogin() {

    const loggedIn =
        sessionStorage.getItem(
            "aaradhyaLoggedIn"
        );


    if (loggedIn === "true") {

        showWebsite(false);

    } else {

        showLogin();
    }
}


/* =========================================
   LOGOUT
========================================= */

function logoutUser() {

    sessionStorage.removeItem(
        "aaradhyaLoggedIn"
    );

    sessionStorage.removeItem(
        "aaradhyaUsername"
    );

    sessionStorage.removeItem(
        "aaradhyaSurname"
    );


    showLogin();


    const usernameInput =
        document.getElementById(
            "username"
        );

    const surnameInput =
        document.getElementById(
            "surname"
        );

    const passwordInput =
        document.getElementById(
            "password"
        );


    if (usernameInput) {
        usernameInput.value = "";
    }

    if (surnameInput) {
        surnameInput.value = "";
    }

    if (passwordInput) {
        passwordInput.value = "";
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        logoutUser
    );
}


const footerLogout =
    document.getElementById(
        "footerLogout"
    );


if (footerLogout) {

    footerLogout.addEventListener(
        "click",
        logoutUser
    );
}


/* =========================================
   SMOOTH NAVIGATION
========================================= */

const navigationLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


navigationLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        );
    }
);


/* =========================================
   SLIDESHOW
========================================= */

const showcaseTrack =
    document.getElementById(
        "showcaseTrack"
    );

const slides =
    document.querySelectorAll(
        ".showcase-slide"
    );

const nextSlide =
    document.getElementById(
        "nextSlide"
    );

const previousSlide =
    document.getElementById(
        "previousSlide"
    );

const sliderDots =
    document.querySelectorAll(
        ".slider-dot"
    );


let currentSlide = 0;
let sliderTimer = null;


function moveSlider(index) {

    if (
        !showcaseTrack ||
        slides.length === 0
    ) {
        return;
    }


    if (index >= slides.length) {
        index = 0;
    }


    if (index < 0) {
        index = slides.length - 1;
    }


    currentSlide = index;


    showcaseTrack.style.transform =
        "translateX(-" +
        (currentSlide * 100) +
        "%)";


    sliderDots.forEach(
        function (dot, dotIndex) {

            dot.classList.toggle(
                "active",
                dotIndex === currentSlide
            );
        }
    );
}


if (nextSlide) {

    nextSlide.addEventListener(
        "click",
        function () {

            moveSlider(
                currentSlide + 1
            );

            restartSlider();
        }
    );
}


if (previousSlide) {

    previousSlide.addEventListener(
        "click",
        function () {

            moveSlider(
                currentSlide - 1
            );

            restartSlider();
        }
    );
}


sliderDots.forEach(
    function (dot) {

        dot.addEventListener(
            "click",
            function () {

                const slideNumber =
                    Number(
                        dot.dataset.slide
                    );

                moveSlider(
                    slideNumber
                );

                restartSlider();
            }
        );
    }
);


function startSlider() {

    if (slides.length === 0) {
        return;
    }


    clearInterval(
        sliderTimer
    );


    sliderTimer =
        setInterval(
            function () {

                moveSlider(
                    currentSlide + 1
                );

            },
            5000
        );
}


function restartSlider() {

    clearInterval(
        sliderTimer
    );

    startSlider();
}


if (slides.length > 0) {

    startSlider();
}


/* =========================================
   APPOINTMENT FORM
========================================= */

const appointmentForm =
    document.getElementById(
        "appointmentForm"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );


const API_URL =
    "http://localhost:3000/api/appointments";


if (appointmentForm) {

    appointmentForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const nameElement =
                document.getElementById(
                    "name"
                );

            const serviceElement =
                document.getElementById(
                    "service"
                );

            const dateElement =
                document.getElementById(
                    "date"
                );

            const phoneElement =
                document.getElementById(
                    "phone"
                );

            const notesElement =
                document.getElementById(
                    "notes"
                );


            const name =
                nameElement
                    ? nameElement.value.trim()
                    : "";


            const service =
                serviceElement
                    ? serviceElement.value
                    : "";


            const date =
                dateElement
                    ? dateElement.value
                    : "";


            let phone =
                phoneElement
                    ? phoneElement.value.trim()
                    : "";


            const notes =
                notesElement
                    ? notesElement.value.trim()
                    : "";


            phone =
                phone.replace(
                    /[\s()-]/g,
                    ""
                );


            if (
                phone.startsWith("+91")
            ) {

                phone =
                    phone.substring(3);

            } else if (
                phone.startsWith("91") &&
                phone.length === 12
            ) {

                phone =
                    phone.substring(2);
            }


            if (
                !/^[6-9]\d{9}$/.test(phone)
            ) {

                if (formMessage) {

                    formMessage.textContent =
                        "Please enter a valid 10-digit Indian mobile number.";
                }

                return;
            }


            const internationalPhone =
                "+91" + phone;


            if (
                !name ||
                !service ||
                !date
            ) {

                if (formMessage) {

                    formMessage.textContent =
                        "Please fill in all the required details.";
                }

                return;
            }


            const appointment = {

                id:
                    Date.now().toString(),

                customer:
                    name,

                service:
                    service,

                date:
                    date,

                time:
                    "Not specified",

                phone:
                    internationalPhone,

                notes:
                    notes,

                status:
                    "Pending",

                createdAt:
                    new Date().toISOString()
            };


            try {

                if (formMessage) {

                    formMessage.textContent =
                        "Sending your appointment request...";
                }


                const response =
                    await fetch(
                        API_URL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    appointment
                                )
                        }
                    );


                const data =
                    await response.json();


                if (
                    !response.ok ||
                    !data.success
                ) {

                    throw new Error(
                        data.message ||
                        "Could not submit appointment."
                    );
                }


                if (formMessage) {

                    formMessage.textContent =
                        "Thank you, " +
                        name +
                        "! Your appointment request has been received. We will contact you to confirm your booking.";
                }


                appointmentForm.reset();


            } catch (error) {

                console.error(
                    "Appointment submission error:",
                    error
                );


                if (formMessage) {

                    formMessage.textContent =
                        "We could not send your appointment. Please make sure the appointment server is running and try again.";
                }
            }
        }
    );
}


/* =========================================
   DATE RESTRICTION
========================================= */

const dateInput =
    document.getElementById(
        "date"
    );


if (dateInput) {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    dateInput.min =
        year +
        "-" +
        month +
        "-" +
        day;
}


/* =========================================
   MOBILE MENU
========================================= */

const menuButton =
    document.getElementById(
        "menuButton"
    );

const navLinks =
    document.querySelector(
        ".nav-links"
    );


if (
    menuButton &&
    navLinks
) {

    menuButton.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle(
                "mobile-active"
            );
        }
    );


    navLinks
        .querySelectorAll("a")
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navLinks.classList.remove(
                            "mobile-active"
                        );
                    }
                );
            }
        );
}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    revealElements.length > 0 &&
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            function (
                entries,
                observer
            ) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    }
                );

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(
                element
            );
        }
    );
}


/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
    document.getElementById(
        "backToTop"
    );


if (backToTop) {

    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 500
            ) {

                backToTop.classList.add(
                    "show"
                );

            } else {

                backToTop.classList.remove(
                    "show"
                );
            }
        }
    );


    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );
}


/* =========================================
   START
========================================= */

checkLogin();