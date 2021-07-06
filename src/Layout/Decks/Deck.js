import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../../utils/api/index";
import Card from "../Cards/Card";

function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState({});

  useEffect(() => {
    setCards({});
    async function loadData() {
      try {
        const dataFromAPI = await readDeck(deckId);
        setDeck(dataFromAPI);
        setCards(dataFromAPI.cards);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted", deckId);
        } else {
          throw error;
        }
      }
    }
    loadData();
  }, [deckId]);

  const handleDelete = async () => {
    const result = window.confirm(
      `Delete this deck?\nYou will not be able be undone.`
    );
    if (result) {
      async function deleteData() {
        try {
          await deleteDeck(deckId);
          history.push("/");
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Aborted");
          } else {
            throw error;
          }
        }
      }
      deleteData();
    }
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
              {deck.name}
            </li>
          </ol>
        </nav>
      </div>
    );
  }
  return (
    <div>
      <Breadcrumb />
      <h3>{deck.name}</h3>
      <p>{deck.description}</p>
      <div className="row justify-content-between">
        <div className="col-8">
          <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2">
            <span className="oi oi-pencil pr-2" />
            Edit
          </Link>
          <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-2">
            <span className="oi oi-book pr-2 " />
            Study
          </Link>
          <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
            <span className="oi oi-plus pr-2" />
            Add Cards
          </Link>
        </div>
        <div className="col-2">
          <button onClick={handleDelete} className="btn btn-danger">
            <span className="oi oi-trash" />
          </button>
        </div>
      </div>
      <div>
        <h2 className="mt-4">Cards</h2>
      </div>
      {cards.length > 0 ? (
        <section>
          {deck.cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </section>
      ) : (
        <h3>There are currently no cards in this deck.</h3>
      )}
    </div>
  );
}
export default Deck;