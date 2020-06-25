import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { setSearchField, requestRobots } from '../actions';


const mapStateToProps = state =>{
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error,
    }
}//Returns the Redux state values

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots()),
    }
}//Changes the Redux State value



class App extends Component {
    componentDidMount() {
        this.props.onRequestRobots();
    }//Preia obiectul "robots" din Redux State


    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props; //Props from Redux

        const filteredRobots = robots.filter( robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });//Return a Array of robots that contain the searched name



        return isPending ?
             <h1> Loading ... </h1> : //Pand cand sunt preluate datele necesare, se afiseaza "Loading Screen"
            (
                <div className='tc'>
                    <h1> RoboFriends </h1>
                    <SearchBox searchChange={onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
           
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
//Gives those 2 props to the App