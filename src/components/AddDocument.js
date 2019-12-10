import React from "react";
import DocumentService from "./DocumentService";

class AddDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      document_title: "",
      desc: "",
      publisher: ""
    };
  }

  addDoc = () => {
    DocumentService.postApi("create-document", {
      document_title: this.state.document_title,
      desc: this.state.desc,
      publisher: this.state.publisher
    })
      .then(json => {
        console.log("json", json);
        if (json.status === 200) {
          alert("document successfully added");
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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h2 className="text-center">Add Document Form</h2>
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
                onClick={this.addDoc}
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

export default AddDocument;
