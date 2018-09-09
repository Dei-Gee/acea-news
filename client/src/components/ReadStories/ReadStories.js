import React, { Component } from 'react';
import '../Home/Home.css'
import './ReadStories.css'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getStories } from '../../actions/storyActions';
import propTypes from 'prop-types';
import jsonQuery from 'json-query';

class ReadStories extends Component{
    constructor(props){
        super(props);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentDidMount(){
        this.props.getStories();
    }

    handlePageClick(e) {
        const linkColor = {
            color: 'red'
        }
        this.props.story.currentPage = Number(e.target.id)
        e.target.style = linkColor
      }

    handleClick = (e) => {
        //e.preventDefault()
        let ref1 = "storytitle" + e.target.id
        let ref2 = "storybody" + e.target.id
        let ref3 = "storylocation" + e.target.id
        let ref4 = "storyimage" + e.target.id
    
        console.log(ref1)
        console.log(e.target.getAttribute('id'))
        this.props.story.storytitle = this.refs[ref1].textContent
        this.props.story.storybody = this.refs[ref2].textContent
        this.props.story.location = this.refs[ref3].textContent
        this.props.story.storyimage = this.refs[ref4].src
      }

      

    render(){

        const { stories, currentPage, storiesPerPage } = this.props.story;
        const storiesArr = Object.keys(stories);

        const Title = jsonQuery('[*][Title]', {data: stories} ).value;
        const Content = jsonQuery('[*][Content]', {data: stories} ).value;
        const ImageURL = jsonQuery('[*][ImageURL]', {data: stories} ).value;
        const location = jsonQuery('[*][Location]', {data: stories} ).value;

        
        
        const indexOfLastStories = currentPage * storiesPerPage;
        const indexOfFirstStories = indexOfLastStories - storiesPerPage;
        const currentStories = stories.slice(indexOfFirstStories, indexOfLastStories);

        // Logic for displaying page numbers
        const pageNumbers = [];
        
        const fillPageNumbers = () => {
            for (let i = 1; i <= Math.ceil(storiesArr.length / storiesPerPage); i++) 
            {
                pageNumbers.push(i)
            }
        }
                console.log(pageNumbers)

        fillPageNumbers();

        const renderPageNumbers = pageNumbers.map(number => {
            return (
              <li key={number} id={number} style={this.blackColor} onClick={this.handlePageClick}>
                Page {number} |
              </li>
            );
          });

        const defaultContent = currentStories.map((eachStory, index) => {
            let i = 1 + index
            return(
                <div className="otherNews" key={i}>
                    <div className="otherNewsImg">
                        <img alt="pix" ref={`storyimage${i}`} src={ImageURL[storiesArr.length - i]} />
                    </div>

                    <div className="otherNewsText">
                        <h3 className="other-title" ref={`storytitle${i}`}>{Title[storiesArr.length - i]}</h3>
                        <span className="hiddenLocation" ref={`storylocation${i}`}>{location[storiesArr.length - i]}</span>
                        <p className="other_text" ref={`storybody${i}`}>
                            {Content[storiesArr.length - i]}
                        </p>
                        
                        <p className="linktofull"><NavLink to="/story" id={i} onClick={this.handleClick}>Read Full Story <span> > </span> </NavLink></p>
                    </div>
                </div>
            );
        });



        return(
            <div className="content-wrapper">
                <div className="left">
                    { defaultContent }
                    <div>
                        <ul id="page-numbers">
                            {renderPageNumbers}
                        </ul>
                    </div>
                </div>

                <div className="right">
                </div>
            </div>
        );
    }
}


ReadStories.propTypes = {
    getStories: propTypes.func.isRequired, 
    story: propTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    story: state.story
  });
  
  export default connect(mapStateToProps, { getStories })(ReadStories);
  