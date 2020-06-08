import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from 'axios'

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };


    axios.post('http://localhost:4000/users/add',user)
    .then(res => console.log(res.data));
    
    this.setState({
      username: "",
    });
  }
  render() {
    return (
      <div>
        <h1>Create User</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>User name</label>
            <input onChange={this.onChangeUsername} name="username" />
          </div>
          <div>
              <button type='submit'>Create</button>
          </div>
        </form>
      </div>
    );
  }
}
