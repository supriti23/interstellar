import React from "react";
import "./AddElement.css";

const AddElement = ({handleChange, elementObj, handleSubmit}) => {
    return(
        <form onSubmit={handleSubmit}
        className="formContainer" data-testid="form">
          {Object.keys(elementObj).map( (val,idx) => (
            <div key={idx} className="add">
            <label htmlFor={val}>{val}*</label>
            <input
              id={val}
              name={val}
              value={elementObj.val}
              onChange={handleChange}
              style={{ marginLeft: "3%" }}
            />
          </div>
          ))}
          <input type="submit" value="Create" data-testid="submit-button" className="create" />
        </form>
    )
}
export default AddElement;