import React, {useState, useEffect}  from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import CardForm from "./CardForm"
import { readDeck, readCard, updateCard } from "../../utils/api/index";

function EditCard() {
    const params = useParams()
    const history = useHistory();
    const deckId = params.deckId;
    const cardId = params.cardId;
    const [deck, setDeck] = useState({})
    const [card, setCard] = useState({})

    useEffect(() => {
        setDeck({})
        async function loadData() {
            try{
                const dataAPI = await readDeck(deckId);
                setDeck(dataAPI)
                    const moreDataAPI = await readCard(cardId);
                    setCard(moreDataAPI)
            }catch(error) {
                if(error.name === "AbortError") {
                    console.log("Aborted" , "deckId:", deckId, "cardId:", cardId)
                } else {
                    throw error;
                }
            }
        }
        loadData()
    },[deckId, cardId])

    const handleChange = ({target}) => {
        const value = target.value;
        setCard({ ...card,
             [target.name]: value,
             })
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted:", card);
        async function updateData() {
            try {
                const dataFromAPI = await updateCard(card);
                console.log("updated card", dataFromAPI)
                history.push(`/decks/${deckId}`);
            }catch (error) {
                if(error.name === "Aborted") { 
                    console.log("Aborted", card)
                } else {
                    throw error;
                }
            }
        }
        updateData()
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
                  Edit Card {cardId}
                </li>
              </ol>
            </nav>
          </div>
        );
      }
      return (
        <div className="mb-4">
          <Breadcrumb />
          <h2>Edit Card</h2>
          <form onSubmit={handleSubmit}>
            <CardForm formData={card} handleChange={handleChange} />
            <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      );
    }
    export default EditCard;

