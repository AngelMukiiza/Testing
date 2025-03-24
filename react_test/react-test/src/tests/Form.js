import React, { useState } from 'react';

const Form = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid email');
    } else {
      setError('');
      // Form submission logic here
      console.log('Form submitted');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        aria-label="email-input"
      />
      {error && <span role="alert" aria-live="assertive" style={{ color: 'red' }}>{error}</span>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
