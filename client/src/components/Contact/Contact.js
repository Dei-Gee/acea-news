import React, { Component } from 'react';
import './Contact.css';
import { connect } from 'react-redux';
import { getStories } from '../../actions/storyActions';
import propTypes from 'prop-types';
import axios from 'axios';
//import { Provider } from 'react-redux';

class Contact extends Component {
  
  

  onContactSubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    //const location = document.getElementById('location').value;


    const headers = new Headers({
      'Content-Type': 'application/json'
    })

    axios({
        method: "POST", 
        url:"/api/emailroute", 
        data: {
            name: name,   
            email: email,  
            messsage: message
        }, 
        headers: new Headers({
            'Content-Type': 'application/json'
          })
    }).then((response)=>{
        if (response.data.msg === 'success'){
            alert("Message Sent."); 
            this.resetForm()
        }else if(response.data.msg === 'fail'){
            alert("Message failed to send.")
        }
    }).catch(
        error => {if(error.response){
        console.log(error.response.data)
        }
      });
    }
  

  render()
  {
    

      return (
        <div className="content-wrapper">
        <div className="left">
        <form className="admin-form" id="admin-form" onSubmit={this.onContactSubmit} method="POST" action="/api/emailroute">
                <table>
                    <thead colSpan="2">
                        <tr>
                            <td colSpan="2">
                                <h2>Contact Us</h2>
                            </td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td colSpan="2">
                                <input type="text" className="inputBoxes" id="name"  placeholder="Name..." />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="2">
                                <input type="email" className="inputBoxes" id="email"  placeholder="Email..." />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="2">
                                <textarea type="text" id="message"  rows="15" cols="100" className="textArea" placeholder="Your message...">
                                
                                </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                
                            </td>
                            <td>
                                <input type="submit" className="submitBTN" value="Send Message" />
                                <input type="reset" className="resetBTN" value="Reset" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
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
