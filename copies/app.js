// Creating a new date instance dynamically with JS
let d = new Date();
const date = d.toDateString();

// The URL to retrieve weather information for the Open Weather API
const baseURI = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Personal API key for the Open Weather API with units set to imperial
const key = "&appid=569892cce2a053e22252ebc103c53b27&units=imperial";

// Showing the error to user
const error = document.getElementById("error");
const generate = document.querySelector("#generate");
const zip = document.querySelector("#zip");
const feelings = document.querySelector("#feelings");
const feeling = document.querySelector(".feelings");
const temp = document.querySelector("#temp");
const dateNow = document.querySelector("#dateNow"); 


// Function to get Web API Data
const getData = async (url) => {
    try{
        const result = await fetch(url);
        const data = await result.json();
        if(data.cod != 200) {
            error.innerHTML = data.message;
            throw `${data.message}`;
        } else{
            console.log(data.message);
        }
        return data
    }catch(error){
        console.log(error);
    }
}



generate.addEventListener("click", (event) => {
    event.preventDefault();
    const madeURI = `${baseURI}${zip.value}${key}`;
    getData(madeURI)
    .then(data => {
        cureData(data)
        .then((info) => {
            postData("/add", info)
            .then((data) =>{
                retreiveData("/all")
                    .then((data) => {
                        updateUI(data);
                    });
            });
        });
    });
});





const cureData = async (data) => {
    try{
        if(data.message){
            return data.message;
        } else{
            const info = {
                date,
                feelings: feelings.value,
                temp: data.main.temp
            };
            return info;
        }
    } catch(err){
        console.error(err);
    }

};

const postData = async(url="", data={}) => {
    const result = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(data),
    });
    try {
        const response = await result.json();
        return response;
    } catch(err){
        console.error(err);
    }
};

const retreiveData = async (url) => {
    const data = await fetch(url);
    try {
        const response = await data.json();
        setTimeout(_=> error.innerHTML = '', 2000)
        return response;
    }catch(err){
        console.error(err);
    }

};

const updateUI = async (data) => {
    const response = await data;
    if(response.date){
        document.querySelector(".outputs").style.display = "block";

        dateNow.innerHTML = response.date;
        temp.innerHTML = response.temp;
        feeling.innerHTML = response.feelings? response.feelings: "How are you feeling?";
        document.querySelector('#error').style.display = "none";

    } else {
        document.querySelector(".outputs").style.display = "none";

        document.querySelector(".outputs").style.display = "block";

        document.querySelector('#error').innerHTML = response.message;
    }
};