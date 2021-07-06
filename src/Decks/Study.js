import { createReadStream } from "fs";
import React, {useState, useEffect}  from "react";
import { Link, useHistory, useParams} from "react-router-dom";
import  { readDeck } from "../../utils/api/index";

function Study() {
    const params = useParams();
    const deckId = params.deckId;
    const [front, setFront] = useState(true);
    const [ cardNumber, setCardNumber] = useState(0);
    const [card, setCards]= useState({});
    const [deck, setDeck] = useState({});

    useEffect(() => {
         setCards({});
         async function loadData() {
             try {
                 const dataAPI = await readDeck(deckId);
                 setDeck(dataAPI);
             }catch (error) {
                 if(error.name === "Aborted") {
                     console.log("Aboted", "deckId:", deckId);
                 } else { 
                     throw error;
                 }
             }
         }
         loadData();
    }, [deckId]);
    function flipCard() {
        setFront(!front);
    }
    const history = useHistory();
    function nextCart() {
        if(cardNumber + 1 < cards.length) {
            setCardNumber(cardNumber + 1);
            setFront(true);
        }else {
            const result = window.confirm(
            `Restart deck?\nClick 'cancel' to return home.`
            );
        if (result) {
             setCardNumber(0);
             setFront(true);
        } else {
            history.push("/");
        }
        }
    }
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
                    Study
                  </li>
                </ol>
              </nav>
            </div>
          );
        }
      
        if (cards.length > 2) {
          return (
            <div>
              <Breadcrumb />
              <h2>Study: {deck.name}</h2>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Card {cardNumber + 1} of {cards.length}
                  </h5>
                  <p className="card-text">
                    {front
                      ? `${cards[cardNumber].front}`
                      : `${cards[cardNumber].back}`}
                  </p>
                  <button className="btn btn-secondary mr-2" onClick={flipCard}>
                    Flip
                  </button>
                  {front ? (
                    " "
                  ) : (
                    <button className="btn btn-primary" onClick={nextCard}>
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div>
              <Breadcrumb />
              <h2>Study: {deck.name}</h2>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Not Enough Cards.</h5>
                  <p className="card-text">
                    You need at least 3 cards to study. There are {cards.length} cards
                    in this deck.
                  </p>
                  <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
                    <span className="oi oi-plus pr-2" />
                    Add Cards
                  </Link>
                </div>
              </div>
            </div>
          );
        }
      }
      export default Study;