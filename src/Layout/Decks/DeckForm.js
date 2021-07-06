import React from "react";

const DeckForm = ({ formData, handleChange }) => {
  return (
    <div>
      <label>Name:</label>
      <input
        id="name"
        type="text"
        name="name"
        onChange={handleChange}
        value={formData.name}
        style={{ width: "100%" }}
        placeholder="Deck name"
        clasName="form-control mb-3"
      />
      <label>Description:</label>
      <textarea
        id="description"
        type="textarea"
        name="description"
        rows="3"
        onChange={handleChange}
        value={formData.description}
        style={{ width: "100%" }}
        placeholder="Brief description of the deck"
        className="form-control mb-3"
      />
    </div>
  );
};
export default DeckForm;