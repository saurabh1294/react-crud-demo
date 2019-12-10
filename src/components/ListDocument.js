import React, { Component } from "react";
import DocumentService from "./DocumentService";
import axios from "axios";
import TableRow from "./TableRow";
import { Link } from "react-router-dom";

let styles = {
  marginTop: "100px"
};
class ListDocument extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", items: "" };
    this.addDocumentService = new DocumentService();
  }
  componentDidMount() {
    axios
      .get("http://localhost:3456/get-document")
      .then(response => {
        console.log("got doc list", response);
        this.setState({ items: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  tabRow() {
    if (this.state.items instanceof Array) {
      return this.state.items.map(function(object, i) {
        return <TableRow obj={object} key={i} />;
      });
    }
  }

  render() {
    return (
      <div className="container" style={styles}>
        <h3>List of Documents</h3>
        <Link to={"/add-document/"}>Add New Document</Link>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Title</td>
              <td>Description</td>
              <td>Publisher</td>
              <td />
            </tr>
          </thead>
          <tbody>{this.tabRow()}</tbody>
        </table>
      </div>
    );
  }
}

export default ListDocument;
