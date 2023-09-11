// Creating a new date instance dynamically with JS
let d = new Date();
const date = d.toDateString();

// The URL to retrieve weather information for the Open Weather API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Personal API key for the Open Weather API with units set to imperial
const apiKey = "&appid=569892cce2a053e22252ebc103c53b27&units=imperial";

// Showing the error to user
const error = document.getElementById("error");
const generate = document.querySelector("#generate");
const zip = document.querySelector("#zip");
const feelings = document.querySelector("#feelings");
const content = document.querySelector("#content");
const temp = document.querySelector("#temp");
const dateNow = document.querySelector("#dateNow"); 




const getData = async (url) => {
    const result = await fetch(url);
    try{
        const data = await result.json();
        if(data.cod != 200) {
            error.innerHTML = data.message;
        } else{
            console.log(data.message);
        }
        return data
    } catch(error){
        console.log("error", error);
    }
}

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
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
            return newData;
    } catch(error){
        console.error("error", err);
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
        content.innerHTML = response.feelings;
        document.querySelector('#error').style.display = "none";

    } else {
        document.querySelector(".outputs").style.display = "none";

        document.querySelector(".outputs").style.display = "block";

        document.querySelector('#error').innerHTML = response.message;
    }
};

// const updateUI = async (data) => {
//     const response = await data;
//     try{
//         // document.querySelector(".outputs").style.display = "block";

//         dateNow.innerHTML = response.date;
//         temp.innerHTML = response.temp;
//         content.innerHTML = response.feelings;
//         document.querySelector('#error').style.display = "none";

//     } catch(error) {
//         console.log("error", error);
//     }
// };


generate.addEventListener("click", (event) => {
    event.preventDefault();
    const madeURL = `${baseURL}${zip.value}${apiKey}`;
    getData(madeURL)
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











