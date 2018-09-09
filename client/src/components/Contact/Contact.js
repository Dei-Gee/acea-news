import React, { Component } from 'react';
import './Contact.css';
import { connect } from 'react-redux';
import { getStories } from '../../actions/storyActions';
import propTypes from 'prop-types';
import ReactContactForm from 'react-mail-form';
//import { Provider } from 'react-redux';

class Contact extends Component {
  
  render()
  {
    
    

      return (
        <div className="content-wrapper">
        <div className="left">
          <ReactContactForm to="thismark4u@gmail.com" />
        </div>
        <div className="right">
          
        </div>
      </div>
      );
    }

}

Contact.propTypes = {
  getStories: propTypes.func.isRequired, 
  story: propTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  story: state.story
});

export default connect(mapStateToProps, { getStories })(Contact);
