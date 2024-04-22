// THIS IS USED TO TEST THE API AND PROVIDE AN EXAMPLE OF HOW TO USE THE API
import React from 'react';

// Gets user details from Electron Wrapper
const GetUserDetails = () => {
    const handleClick = () => {
        console.log('clicked');
        fetch('http://localhost:8080/user').then(res => res.json()).then(data => { console.log(data) });
    }
    return (
        <div>
            <button onClick={handleClick}>Get User Details</button>
        </div>
    )
}

export default GetUserDetails;
