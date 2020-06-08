import React, { Component } from "react";
// import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'

export default class CreateExercise extends Component {
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
    axios.get('http://localhost:4000/users')
    .then(res =>{
        if(res.data.length >0){
            this.setState({
                users: res.data.map(user => user.username),
                username: res.data[0].username
            })
        }
    })
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

    axios.post('http://localhost:4000/exercises/add',exercise)
    .then(res => console.log(res.data));

    // window.location = '/';
  }

  render() {
    return (
      <div>
        <h1>Create Exercise</h1>
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
            <input onChange={this.onChangeDescription} name="description" />
          </div>
          <div>
            <label>Duration</label>
            <input onChange={this.onChangeDuration} name="duration" />
          </div>
          <div>
            <label>Date</label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <div>
              <button type='submit'>Create</button>
          </div>
        </form>
      </div>
    );
  }
}
