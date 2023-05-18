document.getElementById('form-box').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get input values
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Create user object
  var user = {
    username: username,
    password: password
  };

  // Check if local storage already has registered users
  var registeredUsers = localStorage.getItem('registeredUsers');
  if (registeredUsers) {
    registeredUsers = JSON.parse(registeredUsers); // Parse existing data
    registeredUsers.push(user); // Add new user to array
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers)); // Update local storage
  } else {
    localStorage.setItem('registeredUsers', JSON.stringify([user])); // Create new array with user
  }

  // Save the currently registered user for logging in
  localStorage.setItem('currentUser', JSON.stringify(user));

  alert('Registration successful!');
  document.getElementById('registrationForm').reset(); // Reset the form
});
