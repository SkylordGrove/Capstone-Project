const axios = require('axios');

async function getArduinoData() {
    const result = await axios.get('http://localhost:6324/dataset');
    const arduinoData = await result.data;
    return arduinoData;
}

module.exports = {
    getArduinoData,
}