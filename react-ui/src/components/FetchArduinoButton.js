import React from 'react';

// Gets Arduino Data from Electron Wrapper
const FetchArduinoData = (dataset) => {
    const handleClick = () => {
        console.log('clicked');
        console.log(dataset);
        setInterval(async () => {
            try {
                fetch('http://localhost:8080/arduino')
                    .then(res => res.json())
                    //.then(data => console.log(data))
                    .then(arduinoData => {dataset.dataset[0] = arduinoData;})   //Only updating in this component
                    .then(console.log(dataset.dataset[0]));                     //need to figure out how to set it in App.js
            } catch(e) {
                console.error(e);
            }
        }, 1000);
    }
    
    return (
        <div>
            <button onClick={handleClick}>Get Arduino Data</button>
        </div>
    )
}

export default FetchArduinoData;