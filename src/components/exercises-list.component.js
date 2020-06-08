import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
    };

    this.deleteExercise = this.deleteExercise.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/exercises")
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            exercises: res.data,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  deleteExercise(id) {
    axios
      .delete("http://localhost:4000/exercises/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      exercises: this.state.exercises.filter((exercise) => exercise._id !== id),
    });
  }
  render() {
    return (
      <div>
        <h1>Exercises List</h1>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exercises.map((exercise) => {
              return (
                <tr key={exercise._id}>
                  <td>{exercise.username}</td>
                  <td>{exercise.description}</td>
                  <td>{exercise.duration}</td>
                  <td>{new Date(exercise.date).toDateString()}</td>
                  <td>
                    <button>
                      <Link to={"/edit/" + exercise._id}>Edit</Link>
                    </button>
                  </td>
                  <td>
                    <button onClick={() => this.deleteExercise(exercise._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
