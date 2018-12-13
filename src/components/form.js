import React from 'react';
const Form = (props) => {
  return(
   <form onSubmit = {props.loadWeather}>
     <input type="text" name="city" placeholder="City..." style={{color:'white'}}/>
     <input type="text" name="country" placeholder="Country..." style={{color:'white'}}/>
     <button>Get Weather</button>
   </form>
  )
}
export default Form;
