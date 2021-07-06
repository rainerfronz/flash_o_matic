import React, {useEffect} from "react"
import {Link, useParams, useHistory } from "react-router-dom"
import { deleteCard, listCards  } from "../../utils/api/index"

export default function Card({card}) {
    const { deckId } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function loadData() {
          try {
            await listCards(deckId);
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

      const handleDelete = () => {
          const result = window.confirm(`Delete this card?\n\You will not be able to undo it.`);
          if(result) {
              deleteCard(card.id).then(history.go(0))
          }
      };
      return (
        <div className="card mb-3">
        <div className="card-body">
          <div className="container">
            <div className="row justify-content-start">
              <div className="col-6">{card.front}</div>
              <div className="col-6">{card.back}</div>
            </div>
            <div className="row">
              <div className="col-9"></div>
              <div className="col-3">
                <Link
                  to={`/decks/${deckId}/cards/${card.id}/edit`}
                  className="btn btn-secondary mr-2"
                >
                  <span className="oi oi-pencil pr-2" />
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  value={card.id}
                  className="btn btn-danger ml-1"
                >
                  <span className="oi oi-trash" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }