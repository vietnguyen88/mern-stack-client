import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class Navbar extends Component{

render(){
    return(
        <nav>
            <Link to='/'>Exercise Tracker App</Link>
            <ul>
            <li>
                    <Link to='/'>List Exercises</Link>
                </li>
                <li>
                    <Link to='/create'>Create Exercise</Link>
                </li>
                <li>
                    <Link to='/user'>Create User</Link>
                </li>
            </ul>
        </nav>
    )
}
}