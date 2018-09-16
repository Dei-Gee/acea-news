import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postStory } from '../../../actions/storyActions';
import propTypes from 'prop-types';


class Search extends Component{
    render(){
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
                                <input type="text" className="inputBoxes" name="Title" onChange={this.onChange} placeholder="Title" />
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
}

Search.propTypes = { 
    story: propTypes.object.isRequired
  };
  
const mapStateToProps = (state) => ({
story: state.story
});

export default connect(mapStateToProps, { postStory })(Search);