import React, { Component } from "react";
// import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: "",
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/exercises/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date),
        });
      })
      .catch((err) => console.log(err));

    axios.get("http://localhost:4000/users").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
        });
      }
    });
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    axios
      .put(
        "http://localhost:4000/exercises/update/" + this.props.match.params.id,
        exercise
      )
      .then((res) => console.log(res.data));

    // window.location = '/';
  }

  render() {
    return (
      <div>
        <h1>Edit Exercise</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>User name</label>
            <select
              required
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>Description</label>
            <input
              onChange={this.onChangeDescription}
              value={this.state.description}
              name="description"
            />
          </div>
          <div>
            <label>Duration</label>
            <input
              onChange={this.onChangeDuration}
              value={this.state.duration}
              name="duration"
            />
          </div>
          <div>
            <label>Date</label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <div>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    );
  }
}
