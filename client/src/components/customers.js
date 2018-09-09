import React, { Component } from 'react';
import './customers.css';

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      stories: []
    };
  }

  componentDidMount() {
    fetch('/api/stories')
      .then(res => res.json())
      .then(stories => this.setState({stories}, () => console.log('stories fetched...', stories)));
  }

  render() {
    return (
      <div>
        <h2>stories</h2>
        <ul>
        {this.state.stories.map(stories => 
          <li key={stories._id}>{stories.Title} {stories.Content}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default Customers;
