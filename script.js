function togglePasswordVisibility() {
  var passwordInput = document.getElementById("userpassword");
  var passwordVisibilityButton = document.getElementsByTagName("checkbox")[0];
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    passwordVisibilityButton.textContent = "Hide Password";
  } else {
    passwordInput.type = "password";
    passwordVisibilityButton.textContent = "Show Password";
  }
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  var username = document.getElementById('username').value;
  var password = document.getElementById('userpassword').value;

  // Retrieve registered users from local storage
  var registeredUsers = localStorage.getItem('registeredUsers');
  if (registeredUsers) {
    registeredUsers = JSON.parse(registeredUsers);
    var foundUser = registeredUsers.find(function (user) {
      return user.username === username && user.password === password;
    });

    if (foundUser) {
      if (document.querySelector('.custom-select').value === 'option2') {
        window.location.assign('adminpage.html');
      } else { 
        window.location.assign('home.html');
      }
    } else {
      alert('Your username or password is incorrect. No registered users found. Please register an account.');
    }
  }
});

function logOut() {
  window.location.assign("index.html")
  alert('You logged out successfully..');
}

function appointment() {
  document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('appointmentForm');
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission

      var fullName = document.getElementById('fullName').value;
      var age = document.getElementById('age').value;
      var contact = document.getElementById('con').value;
      var email = document.getElementById('email').value;
      var appointmentDate = document.getElementById('appointmentDate').value;
      var appointmentTime = document.getElementById('appointmentTime').value;
      var doctor = document.getElementById('doctor').value;

      // Perform validation
      if (fullName && age && contact && email && appointmentDate && appointmentTime && doctor) {
        var appointmentDateTime = new Date(appointmentDate + 'T' + appointmentTime);
        var currentDateTime = new Date();

        // Compare appointment date with the current date and time
        if (appointmentDateTime > currentDateTime) {
          // Perform further actions, such as saving the appointment to a database

          // Create appointment object
          var appointment = {
            fullName: fullName,
            age: age,
            contact: contact,
            email: email,
            appointmentDate: appointmentDate,
            appointmentTime: appointmentTime,
            doctor: doctor
          };

          // Check if local storage already has booked appointments
          var bookedAppointments = localStorage.getItem('bookedAppointments');
          if (bookedAppointments) {
            bookedAppointments = JSON.parse(bookedAppointments); // Parse existing data
            bookedAppointments.push(appointment); // Add new appointment to array
            localStorage.setItem('bookedAppointments', JSON.stringify(bookedAppointments)); // Update local storage
          } else {
            localStorage.setItem('bookedAppointments', JSON.stringify([appointment])); // Create new array with appointment
          }

          // Reset the form
          form.reset();

          // Display the booked appointments in the table
          var appointmentTableBody = document.getElementById('appointmentTableBody');
          var newRow = document.createElement('tr');
          newRow.innerHTML = `
            <td>${bookedAppointments.length}</td>
            <td>${appointment.fullName}</td>
            <td>${appointment.age}</td>
            <td>${appointment.contact}</td>
            <td>${appointment.email}</td>
            <td>${appointment.doctor}</td>
          `;
          appointmentTableBody.appendChild(newRow)
    

          alert('Appointment booked successfully!');
        } else {
          alert('Please select a future date and time for the appointment.');
        }
      } else {
        alert('Please fill in all the required fields.');
      }
    });
  });
}
