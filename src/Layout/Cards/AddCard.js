import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck, createCard } from "../../utils/api/index";

function AddCard() {
  const { deckId } = useParams();
  const initialState = {
    front: "",
    back: "",
  };
  const [deck, setDeck] = useState([]);
  const [formData, setFormData] = useState({ ...initialState });

  const handleChange = ({ target }) => {
    const value = target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };
  useEffect(() => {
    async function loadData() {
      try {
        const dataFromAPI = await readDeck(deckId);
        setDeck(dataFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          // Ignore `AbortError`
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadData();
  }, [deckId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    async function updateData() {
      try {
        await createCard(deckId, formData);
        setFormData(initialState);
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
            <li className="breadcrumb-item" key="1">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page" key="2">
              Add Card
            </li>
          </ol>
        </nav>
      </div>
    );
  }
  return (
    <div className="mb-4">
      <Breadcrumb />
      <br />
      <h2>{deck.name}: Add Card</h2>
      <form onSubmit={handleSubmit}>
        <CardForm formData={formData} handleChange={handleChange} />
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
          Done
        </Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCard;