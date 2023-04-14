// importing React from react package
import React from "react";

// creating a spinner using bootstrap
const Spinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

// exporting the spinner Component
export default Spinner;
