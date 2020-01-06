import React from "react";

const FormErrors = ({ formErrors }) => (
  <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', fontSize: '1.5em'}} >
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <p style={{color:'rgb(207, 222, 0)'}} key={i}>
            {uppercaseFirst(fieldName)} {formErrors[fieldName]}
          </p>
        );
      } else {
        return "";
      }
    })}
  </div>
);
const  uppercaseFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1);
export default FormErrors;
