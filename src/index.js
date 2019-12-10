import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "glyphicons-only-bootstrap/css/bootstrap.min.css";

// import App from './App';
import AddDocument from "./components/AddDocument";
import ListDocument from "./components/ListDocument";
import EditDocument from "./components/EditDocument";

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={ListDocument} />
      <Route path="/add-document" component={AddDocument} />
      <Route path="/index" component={ListDocument} />
      <Route path="/edit-document/:id" component={EditDocument} />
    </div>
  </Router>,
  document.getElementById("root")
);
