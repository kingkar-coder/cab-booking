console.clear();

$("#button").on("click", function () {
  
  let from = $("#from").val().trim().toLowerCase();
  let to = $("#to").val().trim().toLowerCase();
  let date = $("#date").val();
  let time = $("#time").val();
  let people = $("#people").val();

  
  if(from == "" || to == "" || date == "" || time == "" || people == ''){
    alert("all fields are required");
    return;
  }
  
  
  if(from === to){
    alert("From and To place can't be same!!!");
    return;
  }
  
  
  
  let result = `
   <h4>Booking Details</h4>
   <p>From: ${from}</p>
   <p>To: ${to}</p>
   <p>Journery Date: ${date}</p>
   <p>Departure Time: ${time}</p>
   <p>People: ${people}</p>
   <p>Travel Fair: Rs.${people * 500}</p>
  `;
  $("#result").fadeIn(500).append(result);
  
  
  $("#from").val('')
  $("#to").val('')
  $("#date").val('')
  $("#time").val('')
   $("#people").val('')
});



  jQuery("#date").datepicker({
    minDate: 0, // Disable past dates
    dateFormat: "dd-mm-yy", // Format date as YYYY-MM-DD
    maxDate: new Date(new Date().setMonth(new Date().getMonth() + 2)), // Allow up to 2 months ahead
    showAnim: "fadeIn",
    beforeShowDay: function(date) {
      // Disable Sundays (0) and Saturdays (6)
      var day = date.getDay();
      return [(day != 0  && day != 6), ''];
    }
  });


jQuery( function($) {
  $( "#time" ).timepicker({
    ///timeFormat: "HH:mm", // 24-hour format (e.g., 14:30)
    timeFormat: "h:mm tt", // 12-hour format with AM/PM (e.g., 2:30 PM)
    showSecond: false, // Hide seconds
    stepHour: 1, // Hour step interval
    stepMinute: 15 // Minute step interval
  });
} );
