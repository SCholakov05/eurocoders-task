import React, { useState } from "react";
import axios from "axios";
import './Contacts.scss';

const Contacts = () => {

  const [inputs, setInputs] = useState({
    from: '',
    to: '',
    message: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(inputs.from === '' && inputs.to === '' && inputs.message === ''){
      setError('All fields are mandatory');
    }

    try {
      await axios.post(`/emails`, inputs);
      setInputs({
        from: '',
        to: '',
        message: ''
      });
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  return (
    <div className='contacts'>
      <h1>SEND EMAIL</h1>
      <form>
        <label htmlFor="name">From:</label>
        <input required id="name" type="text" value={inputs.from} placeholder='Name...' name="from" onChange={handleChange} />
        <label htmlFor="email">To:</label>
        <input required id="email" type="email" value={inputs.to} placeholder='Username...' name="to" onChange={handleChange} />
        <label htmlFor="message">Message:</label>
        <textarea name="message" id="message" cols="30" rows="10" value={inputs.message} onChange={handleChange} />
        {
          error && 
            <p>{error}</p>
        }
        <button onClick={handleSubmit}>SEND</button>
      </form>
    </div>
  );
};

export default Contacts;
