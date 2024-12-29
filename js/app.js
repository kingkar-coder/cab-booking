$(document).ready(function () {
    // Initialize Datepicker
    $("#date").datepicker({
        minDate: 0, // Disable past dates
        dateFormat: "dd-mm-yy", // Format date
        maxDate: "+2M", // Allow up to 2 months ahead
        showAnim: "fadeIn",
        beforeShowDay: function (date) {
            var day = date.getDay();
            return [day !== 0 && day !== 6, ""]; // Disable Sundays and Saturdays
        },
    });

    // Initialize Timepicker
    $("#time").timepicker({
        timeFormat: "h:mm tt", // 12-hour format with AM/PM
        interval: 15, // Step interval for minutes
        minTime: "12:00am", // Minimum time
        maxTime: "11:45pm", // Maximum time
        defaultTime: "", // Leave the field empty until user selects
        startTime: "12:00am", // Start of the time range
        dynamic: false, // Prevents dynamic updates to the dropdown
        dropdown: true, // Show the dropdown
        scrollbar: true, // Enable scrollbar if dropdown exceeds height
    });

    // Function to generate a unique 6-digit OTP
    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000); // Random number between 100000 and 999999
    }

    // Booking Logic
    $("#book-now").on("click", function () {
        const fullname = $('#fullname').val().trim();
        const phone = $('#phone').val().trim();
        const from = $("#from").val().trim();
        const to = $("#to").val().trim();
        const date = $("#date").val();
        const time = $("#time").val();
        const people = parseInt($("#people").val(), 10);

        // Input Validation
        if (!fullname || !phone || !from || !to || !date || !time || !people) {
            alert("All fields are required.");
            return;
        }

        if (from.toLowerCase() === to.toLowerCase()) {
            alert("From and To locations cannot be the same!");
            return;
        }

        if (people < 1 || people > 4) {
            alert("Number of people should be between 1 and 4.");
            return;
        }

        // Generate a unique OTP
        const otp = generateOTP();

        // Calculate Total Fare
        const totalFare = people * 500;

        // Ticket Details
        const ticketDetails = `
Booking Details:
---------------------
Customer Name: ${fullname}
Phone: ${phone} 
From: ${from}
To: ${to}
Date: ${date}
Time: ${time}
Number of People: ${people}
Total Fare: ₹${totalFare}
Unique OTP: ${otp}
        `;

        // HTML for Ticket Toast
        const resultHtml = `
        <h4>Booking Confirmed</h4>
        <p><strong>Name:</strong> ${fullname}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>From:</strong> ${from}</p>
        <p><strong>To:</strong> ${to}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Number of People:</strong> ${people}</p>
        <p><strong>Total Fare:</strong> ₹${totalFare}</p>
        <p><strong>Unique OTP:</strong> ${otp}</p>
        <button id="download-ticket">Download Ticket</button>
      `;

        // Show Ticket Toast
        $("#result").hide().html(resultHtml).fadeIn(500);

        // Add Download Functionality
        $("#download-ticket").off("click").on("click", function () {
            const blob = new Blob([ticketDetails], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `Ticket_${from}_to_${to}_${date}.txt`;
            link.click();
            URL.revokeObjectURL(url); // Clean up the URL

            // Hide the ticket div after downloading
            $("#result").fadeOut(300, function () {
                $(this).html(""); // Clear the ticket details
            });
        });

        // Clear Fields
        $("#fullname").val("");
        $("#phone").val("");
        $("#from").val("");
        $("#to").val("");
        $("#date").val("");
        $("#time").val("");
        $("#people").val("");
    });

    // Reset Fields
    $("#reset").on("click", function () {
        $("#fullname, #phone, #from, #to, #date, #time, #people").val("");
        $("#result").fadeOut(300).html("");
    });
});
