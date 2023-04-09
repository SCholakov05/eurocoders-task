import React from "react";
import './Contacts.scss';

const Contacts = () => {

  return (
    <div className='contacts'>
            <h1>SEND EMAIL</h1>
            <form>
            <div>
              <label htmlFor="name">From:</label>
                <input required id="name" type="text" placeholder='Name...' name="name" />
              </div>
              <div>
              <label htmlFor="email">To:</label>
                <input required id="email" type="email" placeholder='Username...' name="username" />
              </div>
              <label htmlFor="message">Message:</label>
                <textarea name="message" id="message" cols="30" rows="10"></textarea>
                <button>SEND</button>
            </form>
        </div>
  );
};

export default Contacts;
