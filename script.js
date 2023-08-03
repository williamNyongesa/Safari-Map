document.addEventListener("DOMContentLoaded", function () {
  const dataList = document.getElementById("datalistOptions");
  const firstImage = document.querySelector(".col-md-4"); // Get the first element from the collection
  const firstCardBody = document.querySelector(".card-body");
  const filterContainer = document.getElementById("afterClickContainer");
  const form = document.getElementById("locationForm");
  const slides = document.querySelector(".carousel-item")

  // Fetch data from the server
  function getData() {
    fetch('http://localhost:3000/destinations')
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

      let slides1 = document.createElement("div")
      slides1.innerHTML = `
      <img src="${image[1]}"alt="my images">
      `
      //slides.appendChild(slides1)
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
    })

    // form.addEventListener("submit", function (event) {
    //   event.preventDefault()
    //   let selectedPlace = document.getElementById("exampleDataList").value
    //   showPlace(selectedPlace)
    // })


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

    // Handle input selection
    document.getElementById("exampleDataList").addEventListener("input", function (event) {
      let selectedInputValue = event.target.value;
      let selectedDestination = data.find(destination => destination.place === selectedInputValue);
      if (selectedDestination) {
        let destinationElement = document.createElement("div");
        destinationElement.innerHTML = `
          <h4>${selectedDestination.place}</h4>
          <img src="${selectedDestination.image}" alt="Image of ${selectedDestination.place}">
          <p>${selectedDestination.description}</p>
          <p><strong>Weather: ${selectedDestination.weather}</strong></p>
          <p><strong>Temperature: ${selectedDestination.temperature}</strong></p>
        `;
        filterContainer.innerHTML = ""; // Clear previous content
        filterContainer.appendChild(destinationElement);
      }
    });
  }

  // Function to add a new destination to the server
function addDestination(newDestination) {
  fetch('http://localhost:3000/destinations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newDestination)
  })
  .then(response => response.json())
  .then(data => {
    // Assuming the server responds with the newly created destination data
    // Display the newly added destination or update the datalist with the new option
    const dataListOption = document.createElement("option");
    dataListOption.textContent = data.place;
    dataList.appendChild(dataListOption);

    // You may also choose to refresh the displayed data or do other actions as needed
  })
  .catch(error => alert(error));
}


  // Fetch data from the server and display it in the datalist
  getData();
});




























document.addEventListener("DOMContentLoaded", function () {
  const dataList = document.getElementById("datalistOptions");
  const firstImage = document.querySelector(".col-md-4"); // Get the first element from the collection
  const firstCardBody = document.querySelector(".col-md-8 .card-body");
  const form = document.getElementById("locationForm");
  const slides = document.querySelector(".carousel-item");
  const filterContainer = document.getElementById("filterContainer");

  // Sample data
  const destinationsData = {
    "destinations": [
      // Paste the JSON data here...
    ]
  };

  // Fetch data from the server
  function getData() {
      fetch('http://localhost:3000/destinations')
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
        const destinationImage = document.createElement("img");
        destinationImage.src = image;
        firstImage.innerHTML = ""; // Clear previous content
        firstImage.appendChild(destinationImage);

        const destinationDescription = document.createElement("h5");
        destinationDescription.textContent = description;
        firstCardBody.innerHTML = ""; // Clear previous content
        firstCardBody.appendChild(destinationDescription);

        const destinationWeather = document.createElement("p");
        destinationWeather.textContent = `Weather: ${weather}`;
        firstCardBody.appendChild(destinationWeather);

        const destinationTemperature = document.createElement("p");
        destinationTemperature.textContent = `Temperature: ${temperature}`;
        firstCardBody.appendChild(destinationTemperature);
      }
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const selectedPlace = document.getElementById("exampleDataList").value;
      showPlace(selectedPlace);
    });

    // Function to display selected place information
    function showPlace(selectedPlace) {
      const selectedDestination = data.find(destination => destination.place === selectedPlace);
      if (selectedDestination) {
        const destinationImage = document.createElement("img");
        destinationImage.src = selectedDestination.image;
        firstImage.innerHTML = ""; // Clear previous content
        firstImage.appendChild(destinationImage);

        const destinationDescription = document.createElement("h5");
        destinationDescription.textContent = selectedDestination.description;
        firstCardBody.innerHTML = ""; // Clear previous content
        firstCardBody.appendChild(destinationDescription);

        const destinationWeather = document.createElement("p");
        destinationWeather.textContent = `Weather: ${selectedDestination.weather}`;
        firstCardBody.appendChild(destinationWeather);

        const destinationTemperature = document.createElement("p");
        destinationTemperature.textContent = `Temperature: ${selectedDestination.temperature}`;
        firstCardBody.appendChild(destinationTemperature);
      } else {
        console.log("Place not found in the data!");
      }
    }

    // Handle input selection
    document.getElementById("exampleDataList").addEventListener("input", function (event) {
      const selectedInputValue = event.target.value;
      const selectedDestination = data.find(destination => destination.place === selectedInputValue);
      if (selectedDestination) {
        const destinationElement = document.createElement("div");
        destinationElement.innerHTML = `
          <h4>${selectedDestination.place}</h4>
          <img src="${selectedDestination.image}" alt="Image of ${selectedDestination.place}">
          <p>${selectedDestination.description}</p>
          <p><strong>Weather: ${selectedDestination.weather}</strong></p>
          <p><strong>Temperature: ${selectedDestination.temperature}</strong></p>
        `;
        filterContainer.innerHTML = ""; // Clear previous content
        filterContainer.appendChild(destinationElement);
      }
    });
  }

  // Fetch data from the server and display it in the datalist
  getData();
});
