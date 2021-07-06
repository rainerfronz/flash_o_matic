import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home/Home";
import CreateDeck from "./Decks/CreateDeck";
import EditDeck from "./Decks/EditDeck";
import Study from "./Decks/Study";
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";
import Deck from "./Decks/Deck";
import NotFound from "./NotFound";


function Layout() {
    return (
        
        <Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route exact={true} path="/">
                <Home />
              </Route>
              <Route path="/decks/new">
                <CreateDeck />
              </Route>
              <Route path="/decks/:deckId/edit">
                <EditDeck />
              </Route>
              <Route path="/decks/:deckId/study">
                <Study />
              </Route>
              <Route path="/decks/:deckId/cards/new">
                <AddCard />
              </Route>
              <Route path="/decks/:deckId/cards/:cardId/edit">
                <EditCard />
              </Route>
              <Route path="/decks/:deckId">
                <Deck />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </Fragment>
      );
    }
    
    export default Layout;