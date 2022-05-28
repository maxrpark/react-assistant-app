import React from 'react';

const Form = ({ setItemValue, handleSubmit, itemValue }) => {
  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <input
        onChange={(e) => setItemValue(e.target.value)}
        type='text'
        value={itemValue}
        className='input-control'
        placeholder='Type something...'
        maxLength={25}
      />
    </form>
  );
};

export default Form;
