import React, { Fragment } from 'react';
//import { getArduinoData } from '../../../services/backend-service';

//const channel = ipcRenderer.createChannel('arduino-backend');

/*ipcRenderer.on('arduino-backend', (event, message) => {
}*/

const getDataset = async() => {
    
    /*ipcRenderer.on('arduino-backend', (event, message) => {
        let res = fetch(
            `http://localhost:6324/dataset`
        );
        let dataset = res.json();
        console.log(dataset);
    });*/
    /*let res = await fetch(
        `http://localhost:6324/dataset`
    );
    let dataset = await res.json();
    console.log(dataset);*/
    const data = await window.electronAPI.getArduinoData();
    console.log(data);
}

const RecordingButton = () => {
    var active = false;
    const handleClick = () => {
        console.log("Click");
        if (!active) {
            getDataset();
            console.log("Started Recording");
        } else {
            //stopRecording();
            console.log("Stopped Recording");
        }
    }
    return (
        <Fragment>
            <button id='record' type='button' onclick={handleClick}>Start Recording</button>
        </Fragment>
    );       
};

export default RecordingButton;