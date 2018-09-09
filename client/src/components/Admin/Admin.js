import React, { Component } from 'react';
import './Admin.css';
import { connect } from 'react-redux';
import { getStories, deleteStory, postStory } from '../../actions/storyActions';
//import propTypes from 'prop-types';
//import jsonQuery from 'json-query';
//import CreationForm from './create/createForm';



class Admin extends Component {
  componentDidMount()
  {
    this.props.getStories();
  }  

  onDeleteClick = id => {
    this.props.deleteStory(id);
  }
  
  
  onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
  }
  

 
  selectionChanged = (e) => {
      this.setState({selectedValue: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newStory = {
        Title: this.state.Title, 
        Content: this.state.Content,
        ImageURL: this.state.ImageURL, 
        Location: this.state.Location, 
        DateCreated: this.state.DateCreated
    }

    this.props.postStory(newStory);
    document.getElementById('admin-form').reset();
    alert('New Story Posted!');
  }

  

    render(){
        //const { stories } = this.props.story; 
        //const storiesArr = Object.keys(stories);

        //const Title = jsonQuery('[*][Title]', {data: stories} ).value;


        

        const postNewStory = () => {
            return(
                <form className="admin-form" id="admin-form" onSubmit={this.onSubmit} method="POST">
                <table>
                    <thead colSpan="2">
                        <tr>
                            <td colSpan="2">
                                <h2>Create New Post</h2>
                            </td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td colSpan="2">
                                <input type="text" className="inputBoxes" name="Title"onChange={this.onChange} placeholder="Title" />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="2">
                                <textarea type="text" name="Content" onChange={this.onChange} rows="25" cols="100" className="textArea" placeholder="Write something...">
                                
                                </textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                URL to Image
                            </td>
                            <td>
                                <input type="text" name="ImageURL" onChange={this.onChange} className="inputBoxes" placeholder="Url to Image" />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Location
                            </td>
                            <td>
                                <select className="selectLocation" name="Location" onChange={this.onChange}>
                                    <option value="">--Select an option--</option>
                                    <option value="Alberta">Alberta</option>
                                    <option value="British Columbia">British Columbia</option>
                                    <option value="Manitoba">Manitoba</option>
                                    <option value="New Brunswick">New Brunswick</option>
                                    <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                                    <option value="Northwest Territories">Northwest Territories</option>
                                    <option value="Nova Scotia">Nova Scotia</option>
                                    <option value="Nunavut">Nunavut</option>
                                    <option value="Ontario">Ontario</option>
                                    <option value="Prince Edward Island">Prince Edward Island</option>
                                    <option value="Quebec">Quebec</option>
                                    <option value="Saskatchewan">Saskatchewan</option>
                                    <option value="Yukon">Yukon</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                
                            </td>
                            <td>
                                <input type="submit" className="submitBTN" value="Post" />
                                <input type="reset" className="resetBTN" value="Reset" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            );
        }
  

        return(
            <div className="content-wrapper">
                <div className="left">
                    <div className="form-wrapper">
                        { postNewStory() }
                    </div>
                </div>
                <div className="right">
                    <form>
                        <div className="form-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <td>
                                            <h2>Find Posts</h2>
                                        </td>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>
                                            <input type="Search" onSubmit={this.onSearch} className="inputBoxes" name="Search"  placeholder="Search..." />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}



  
  const mapStateToProps = (state) => ({
    story: state.story
  });

  export default connect(mapStateToProps, { getStories, deleteStory, postStory })(Admin);