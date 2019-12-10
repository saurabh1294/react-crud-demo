import React, { Component } from "react";
import axios from "axios";
import DocumentService from "./DocumentService";

class EditDocument extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      document_title: "",
      desc: "",
      publisher: ""
    };
  }

  componentDidMount() {
    console.log("this.props", this.props);
    axios
      .get(
        "http://localhost:3456/get-document-by-id?id=" +
          this.props.match.params.id
      )
      .then(response => {
        console.log(response, "response------");
        this.setState({
          document_title: response.data.document_title,
          desc: response.data.desc,
          publisher: response.data.publisher
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // handleSubmit(event) {
  //   event.preventDefault();
  //   this.addDocumentService.updateData(this.state.value,this.props.match.params.id);
  //   this.props.history.push('/index');
  // }

  editDoc = () => {
    console.log(this.props.match.params.id, "--id");
    DocumentService.postApi("update-document", {
      document_title: this.state.document_title,
      desc: this.state.desc,
      publisher: this.state.publisher,
      id: this.props.match.params.id
    })
      .then(json => {
        console.log(json, "response on edit request!!!!!");
        if (json.status === 200) {
          alert("Record updated successfully!!");
          this.props.history.push("/index");
        } else {
          alert("something went wrong!!");
          this.props.history.push("/index");
        }
      })
      .catch(error => {
        console.log("error-----------", error);
      });
  };

  render() {
    return (
      <div>
        <h2 className="text-center">Edit Document Form</h2>
        <div className="row justify-content-md-center">
          <div className="col-md-6 col-md-offset-3">
            <form>
              <div className="form-group">
                <label>Title:</label>
                <input
                  name="document_title"
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.document_title}
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <input
                  name="desc"
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.desc}
                />
              </div>

              <div className="form-group">
                <label>Publisher:</label>
                <input
                  name="publisher"
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.publisher}
                />
              </div>
              <button
                type="button"
                onClick={this.editDoc}
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditDocument;
