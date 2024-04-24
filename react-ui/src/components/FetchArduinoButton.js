// Gets Arduino Data from Electron Wrapper
import React, { Component } from 'react';

let active = false;

class FetchArduinoData extends Component {
    handleClick = () => {
        active = !active;
        if (active) {
            document.querySelector('#recordingButton').innerHTML = 'Stop Recording';
        }
        console.log('clicked');
        let queryInterval = setInterval(async () => {
            if(active) {
                try {
                    fetch('http://localhost:8080/arduino')
                        .then(res => res.json())
                        .then(arduinoData => {this.props.updateModalDataset(arduinoData)})
                } catch(e) {
                    console.error(e);
                }
            } else {
                clearInterval(queryInterval);
                //TODO: Add Post request to change recording to false and wipe the dataset in PortManager.js
                document.querySelector('#recordingButton').innerHTML = 'Start Recording';
                this.props.updateDatasets();
            }

        }, 100);
    }
    render() {
        return (
            <div>
                <button id="recordingButton" type="button" onClick={this.handleClick}>Start Recording</button>
            </div>
        )
    }
}

export default FetchArduinoData;