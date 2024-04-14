// Initialize the map
var map = L.map('map').setView([17.5441, 78.5735], 16); // Set initial coordinates and zoom level

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to add marker on map
function addMarker(lat, lng) {
  // Remove existing marker (if any)
  if (typeof marker !== 'undefined') {
    map.removeLayer(marker);
  }

  // Add new marker
  marker = L.marker([lat, lng]).addTo(map);
}

// Function to toggle visibility of button-specific text
function toggleButtonTextVisibility(buttonId, isVisible) {
  var buttonText = document.getElementById(buttonId + '-text');
  if (isVisible) {
    buttonText.style.display = 'block'; // Show button-specific text
  } else {
    buttonText.style.display = 'none'; // Hide button-specific text
  }
}

// Function to handle click on any location button
function handleLocationButtonClick(buttonId) {
  // Get the latitude and longitude from the button's data attributes
  var lat = parseFloat(document.getElementById(buttonId).getAttribute('data-lat'));
  var lng = parseFloat(document.getElementById(buttonId).getAttribute('data-lng'));
  
  // Add marker to the map at the specified coordinates
  addMarker(lat, lng);

  var activeButton = document.querySelector('.location-button.active');
  if (activeButton) {
    activeButton.classList.remove('active');
    var activeButtonTextId = activeButton.id + '-text';
    document.getElementById(activeButtonTextId).style.display = 'none'; // Hide button-specific text
  }

  // Activate the clicked button
  var clickedButton = document.getElementById(buttonId);
  clickedButton.classList.add('active');
  var clickedButtonTextId = buttonId + '-text';
  document.getElementById(clickedButtonTextId).style.display = 'block'; // Show button-specific text


  // Toggle active class for location buttons
  document.querySelectorAll('.location-button').forEach(function(btn) {
    btn.classList.remove('active');
  });
  document.getElementById(buttonId).classList.add('active');

  // Toggle visibility of button-specific text
  var isActive = document.getElementById(buttonId).classList.contains('active');
  toggleButtonTextVisibility(buttonId, isActive);

  // Update "Go to Location" button link and visibility
  var goToLocationButton = document.getElementById('go-to-location-button');
  if (document.querySelector('.location-button.active')) {
    // If there is an active location button, update the link and show the button
    goToLocationButton.href = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    
    goToLocationButton.style.display = 'inline-block';
  } else {
    // If no location button is active, hide the "Go to Location" button
    goToLocationButton.style.display = 'none';
  }
}

// Listen for click events on all location buttons
var locationButtons = document.querySelectorAll('.location-button');
locationButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    // Get the id of the clicked button
    var buttonId = button.id;
    // Call the function to handle button click
    handleLocationButtonClick(buttonId);
  });
});