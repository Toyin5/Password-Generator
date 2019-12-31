window.addEventListener('load', ()=> {
    let long;
    let lat;
    let error = document.querySelector('#error');
    let tempSection = document.querySelector('.temperature');
    let tempSpan = document.querySelector('.temperature span')
    let tempDescription = document.querySelector('.temp-description')
    let tempDegree = document.querySelector('.temp-degree')
    let locationTimezone = document.querySelector('.location-timezone')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude; 
            const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `https://api.darksky.net/forecast/c9fca2e0c521c2426f5c07429e858c91/${lat},-${long}`
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently;
                // set DOM elements from the api
                tempDegree.textContent = temperature;
                tempDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                // set Formula for celcius
                let celcius = (temperature - 32) * (5/9);
                // set icon
                setIcon(icon, document.querySelector('.icon1'));
                // change temp unit
                tempSection.addEventListener('click', () =>{
                    if (tempSpan.textContent === 'F') {
                        tempSpan.textContent = 'C';
                        tempDegree.textContent = Math.floor(celcius)
                    }else {
                        tempSpan.textContent = 'F';
                        tempDegree.textContent = temperature;
                    }
                })

            })
        });
    }
    let setIcon = function (icon, iconID) {
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }
})