import React from 'react';

// Gets Arduino Data from Electron Wrapper
const FetchArduinoData = () => {
    const handleClick = () => {
        console.log('clicked');
        fetch('http://localhost:8080/arduino').then(res => res.json()).then(data => { console.log(data) });
    }
    return (
        <div>
            <button onClick={handleClick}>Get Arduino Data</button>
        </div>
    )
}

export default FetchArduinoData;