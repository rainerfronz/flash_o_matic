import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index";
import DeckForm from "./DeckForm";

function CreateDeck() {
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    const value = target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    async function updateData() {
      try {
        const output = await createDeck(formData);
        history.push(`/decks/${output.id}`);
      } catch (error) {
        if (error.name === "AbortError") {
          // Ignore `AbortError`
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    updateData();
  };
  function Breadcrumb() {
    return (
      <div className="navigation">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" key="0">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page" key="1">
              Create Deck
            </li>
          </ol>
        </nav>
      </div>
    );
  }
  return (
    <div>
      <Breadcrumb />
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <DeckForm formData={formData} handleChange={handleChange} />
        <Link to="/" className="btn btn-secondary mr-2">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
