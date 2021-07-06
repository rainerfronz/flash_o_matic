import React from "react";

const CardForm = ({ formData, handleChange }) => {
  return (
    <div>
      <label>Front:</label>
      <textarea
        id="front"
        type="textarea"
        name="front"
        onChange={handleChange}
        value={formData.front}
        style={{ width: "100%" }}
        placeholder="Front side of card"
        class="form-control mb-3"
      />
      <label>Back:</label>
      <textarea
        id="back"
        type="textarea"
        name="back"
        onChange={handleChange}
        value={formData.back}
        style={{ width: "100%" }}
        placeholder="Back side of card"
        class="form-control mb-3"
      />
    </div>
  );
};
export default CardForm;