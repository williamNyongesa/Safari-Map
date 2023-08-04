document.addEventListener("DOMContentLoaded", function () {
  const dataList = document.getElementById("datalistOptions");
  const firstImage = document.querySelector(".col-md-4");
  const firstCardBody = document.querySelector(".card-body");
  const form = document.getElementById("locationForm");
  const postButton = document.getElementById("postButton");

  // Fetch data from the server
  function getData() {
    fetch('https://safari-map.onrender.com/destinations')
      .then(response => response.json())
      .then(data => displayData(data))
      .catch(error => alert(error));
  }

  // Display fetched data in the datalist and update the first destination content
  function displayData(data) {
    data.forEach(destination => {
      const {
        id,
        place,
        weather,
        temperature,
        description,
        image
      } = destination;
      
      const dataListOption = document.createElement("option");
      dataListOption.textContent = place;
      dataList.appendChild(dataListOption);



      if (id === 1) {
        let myimage1 = document.createElement("div");
        let firstCardBody1 = document.createElement("h6");

        myimage1.innerHTML = `
          <img src="${image}" alt="image of diani">
        `;
        firstCardBody1.innerHTML = `
          <h4>${description}</h4>
          <p><strong>Weather: ${weather}</strong></p>
          <p>Temperature: ${temperature}</p>
        `;

        firstImage.innerHTML = ""; // Clear previous content
        firstCardBody.innerHTML = ""; // Clear previous content
        firstImage.appendChild(myimage1);
        firstCardBody.appendChild(firstCardBody1);
      }
    });

    form.addEventListener("click", function (event) {
      event.preventDefault();
      let selectedPlace = document.getElementById("exampleDataList").value;
      showPlace(selectedPlace);
    });

    // Function to display selected place information
    function showPlace(selectedPlace) {
      let selectedDestination = data.find(destination => destination.place === selectedPlace);
      if (selectedDestination) {
        let destinationImage = document.createElement("img");
        destinationImage.src = selectedDestination.image;
        firstImage.innerHTML = ""; // Clear previous content
        firstImage.appendChild(destinationImage);

        let destinationDescription = document.createElement("h5");
        destinationDescription.textContent = selectedDestination.description;
        firstCardBody.innerHTML = ""; // Clear previous content
        firstCardBody.appendChild(destinationDescription);

        let destinationWeather = document.createElement("p");
        destinationWeather.textContent = `Weather: ${selectedDestination.weather}`;
        firstCardBody.appendChild(destinationWeather);

        let destinationTemperature = document.createElement("p");
        destinationTemperature.textContent = `Temperature: ${selectedDestination.temperature}`;
        firstCardBody.appendChild(destinationTemperature);
      } else {
        console.log("Place not found in the data!");
      }
    }
  }

  // Function to add a new destination to the server
  function addDestination() {
    // Prompt the user for the new destination data
    const newDestination = {
      place: window.prompt("Enter the destination name:"),
      weather: window.prompt("Enter the weather at the destination:"),
      temperature: window.prompt("Enter the temperature at the destination:"),
      description: window.prompt("Enter a description of the destination:"),
      image: window.prompt("Enter the image URL of the destination:")
    };
  
    // Make sure all fields are provided by the user
    if (
      !newDestination.place ||
      !newDestination.weather ||
      !newDestination.temperature ||
      !newDestination.description ||
      !newDestination.image
    ) {
      alert("Please fill in all the destination details.");
      return;
    }
  
    fetch('https://safari-map.onrender.com/destinations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDestination)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Display the newly added destination or update the datalist with the new option
      const dataListOption = document.createElement("option");
      dataListOption.textContent = data.place;
      dataList.appendChild(dataListOption);
  
      // You may also choose to refresh the displayed data or do other actions as needed
    })
    .catch(error => alert('Error adding destination: ' + error.message));
  }
  
  // Fetch data from the server and display it in the datalist
  getData();
  
  // Event listener for the Add Destination button
  postButton.addEventListener("click", function (event) {
    event.preventDefault();
    addDestination();
  })
})
