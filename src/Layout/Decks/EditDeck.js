import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import DeckForm from "./DeckForm";
import { readDeck, updateDeck } from "../../utils/api/index";

function EditDeck() {
  const initialState = {
    name: "",
    description: "",
  };
  const params = useParams();
  const deckId = params.deckId;
  const [deck, setDeck] = useState({ ...initialState });
  useEffect(() => {
    async function loadData() {
      try {
        const dataFromAPI = await readDeck(deckId);
        setDeck(dataFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadData();
  }, [deckId]);

  const handleChange = ({ target }) => {
    const value = target.value;
    setDeck({
      ...deck,
      [target.name]: value,
    });
  };
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted:", deck);
    async function updateData() {
      try {
        await updateDeck(deck);
        history.push(`/decks/${deckId}`);
      } catch (error) {
        if (error.name === "AbortError") {
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
              Edit Deck
            </li>
          </ol>
        </nav>
      </div>
    );
  }
  return (
    <div>
      <Breadcrumb />
      <h2>Edit Deck</h2>
      <form onSubmit={handleSubmit}>
        <DeckForm formData={deck} handleChange={handleChange} />
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
          Cancel
        </Link>
        <button type="submit" value="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
export default EditDeck;