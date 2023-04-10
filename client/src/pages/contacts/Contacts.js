import React, { useState } from "react";
import axios from "axios";
import './Contacts.scss';

const Contacts = () => {

  // Use the useState hook to define state variables for input values and errors
  const [inputs, setInputs] = useState({
    from: '',
    to: '',
    message: '',
  });
  const [error, setError] = useState(null);

  // Define a function to handle changes in input values
  const handleChange = (e) => {
    // Update the inputs state using the spread operator to merge the new value with the previous state
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // Define a function to handle form submission
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // If any required input field is empty, set an error message
    if (inputs.from === '' || inputs.to === '' || inputs.message === '') {
      setError('All fields are mandatory');
    } else {
      // Otherwise, make a POST request to a specified endpoint with the inputs
      try {
        await axios.post(`/emails`, inputs);
        // Clear the input fields on successful submission
        setInputs({
          from: '',
          to: '',
          message: ''
        });
      } catch (err) {
        // If there's an error, log it to the console and set an error message
        console.log(err);
        setError(err);
      }
    }
  }

  // Render the component
  return (
    <div className='contacts'>
      <h1>SEND EMAIL</h1>
      <form>
        <label htmlFor="name">From:</label>
        {/* Define an input field for the "from" value */}
        <input required id="name" type="text" value={inputs.from} placeholder='Name...' name="from" onChange={handleChange} />
        <label htmlFor="email">To:</label>
        {/* Define an input field for the "to" value */}
        <input required id="email" type="email" value={inputs.to} placeholder='Username...' name="to" onChange={handleChange} />
        <label htmlFor="message">Message:</label>
        {/* Define a textarea field for the "message" value */}
        <textarea name="message" id="message" cols="30" rows="10" value={inputs.message} onChange={handleChange} />
        {/* Show an error message if there's an error */}
        {error &&
          <p>{error}</p>
        }
        {/* Define a button to submit the form */}
        <button onClick={handleSubmit}>SEND</button>
      </form>
    </div>
  );
};

export default Contacts;
