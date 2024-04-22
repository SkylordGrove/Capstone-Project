// THIS IS USED TO TEST THE API AND PROVIDE AN EXAMPLE OF HOW TO USE THE API
import React from 'react';

// Gets user details from Electron Wrapper
const GetToken = () => {
    const handleClick = () => {
        console.log('clicked');
        fetch('http://localhost:8080/token').then(res => res.json()).then(data => { console.log(data) });
    }
    return (
        <div>
            <button onClick={handleClick}>Get token</button>
        </div>
    )
}

export default GetToken;
