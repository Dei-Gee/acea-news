import React, { Component } from 'react';
import '../Home/Home.css'
import './ReadStories.css'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getStories } from '../../actions/storyActions';
import propTypes from 'prop-types';
import Redirect from 'react-router-dom/Redirect';
//import jsonQuery from 'json-query';

class ReadStories extends Component{
    constructor(props) {
        super(props);
        <Redirect to={`/stories/page/1`} />
    }
    
    

    componentDidMount(){
        this.props.getStories();
        //this.props.match.params.page_number = this.props.story.currentPage;
        
    }

    

    handleClick = (e) => {
        //e.preventDefault();
        let ref1 = "storytitle" + e.target.id;
        let ref2 = "storybody" + e.target.id;
        let ref3 = "storylocation" + e.target.id;
        let ref4 = "storyimage" + e.target.id;
        let ref5 = "storydate" + e.target.id
    
        console.log(ref1);
        console.log(e.target.getAttribute('id'));
        this.props.story.storytitle = this.refs[ref1].textContent;
        this.props.story.storybody = this.refs[ref2].textContent;
        this.props.story.location = this.refs[ref3].textContent;
        this.props.story.storyimage = this.refs[ref4].src;
        this.props.story.storydate = this.refs[ref5].textContent;
    };

    changePage = (e) => {
        //e.preventDefault();
        let myID = e.target.id;
    
        //console.log(e.target.getAttribute('id'));
        this.props.story.currentPage = myID;
    };

    toPrev = (e) => {
        this.props.story.currentPage = this.props.story.currentPage - 1;
    }

    toNext = (e) => {
        
        //let leCurrentPage = parseInt(this.props.story.currentPage, 10) + 1;
        
        let myStoriesArr = Object.keys(this.props.story.stories);
        let numOfPages = Math.ceil(myStoriesArr.length / this.props.story.storiesPerPage);
        if(parseInt(this.props.story.currentPage, 10) > numOfPages)
        {
            console.log(this.props.story.currentPage + ' is larger than ' + numOfPages);
            return <Redirect to={`/stories/page/${this.props.story.currentPage - 1}`} />;
        }
        else
        {
            this.props.story.currentPage = this.props.story.currentPage + 1;
            console.log(this.props.story.currentPage + ' is smaller than ' + numOfPages);
        }
    }

    render(){

        const { stories } = this.props.story.stories;
        let currentPage = this.props.story.currentPage;
        const storiesPerPage = this.props.story.storiesPerPage;
        const storiesArr = Object.keys(this.props.story.stories);
        //const numOfPages = Math.ceil(storiesArr.length / storiesPerPage);

        if(currentPage === 0)
        {
            this.props.story.currentPage = currentPage + 1;
            return <Redirect to={`/stories/page/${this.props.story.currentPage}`} />;
        }

        
        
        
        const indexOfLastStories = currentPage * storiesPerPage;
        const indexOfFirstStories = indexOfLastStories - storiesPerPage;
        const currentStories = this.props.story.stories.slice(indexOfFirstStories, indexOfLastStories);

        // Logic for displaying page numbers
        const pageNumbers = [];
        const fillPageNumbers = () => {
            for (let i = 1; i <= Math.ceil(storiesArr.length / storiesPerPage); i++) 
            {
                pageNumbers.push(i);
            }
        }
                

        fillPageNumbers();  
        const renderPageNumbers = pageNumbers.map(number => {
            return (
              <li key={number}>
                <NavLink to={`/stories/page/${number}`} id={number} className="pagelink" onClick={this.changePage}> {number} </NavLink>
              </li>
            );
          });
          
        const defaultContent = currentStories.map((eachStory, index) => {
            let i = currentStories.length - ( index );
            
            return(
                <div className="otherNews" key={i}>
                    
                    <div className="otherNewsImg">
                        <img alt="pix" ref={`storyimage${i}`} src={eachStory.ImageURL} />
                    </div>

                    <div className="otherNewsText">
                        <h3 className="other-title" ref={`storytitle${i}`}>{eachStory.Title}</h3>
                        <span className="hiddenLocation" ref={`storylocation${i}`}>{eachStory.Location}</span>
                        <div className="hiddenLocation" ref={`storydate${i}`}>{eachStory.DateCreated}</div>
                        <p className="other_text" ref={`storybody${i}`}>
                            {eachStory.Content}
                        </p>
                        
                        <p className="linktofull"><NavLink to="/story" id={i} onClick={this.handleClick}>Read Full Story <span> > </span> </NavLink></p>
                    </div>
                </div>
            );
        });

        const prevBTN = () => {
            let numOfPages = Math.ceil(this.props.story.stories.length / this.props.story.storiesPerPage);
            if(this.props.story.currentPage > 1)
            {
                return  <li>
                            <NavLink to={`/stories/page/${parseInt(this.props.story.currentPage, 10) - 1}`} id={parseInt(this.props.story.currentPage, 10) - 1} className="pagelink" onClick={this.toPrev}> Previous </NavLink>
                        </li>;
            }
            else{
                return  <li></li>;
            }
        }

        const nextBTN = () => {
            let numOfPages = Math.ceil(this.props.story.stories.length / this.props.story.storiesPerPage);
            if(this.props.story.currentPage < numOfPages)
            {
                return  <li>
                            <NavLink to={`/stories/page/${parseInt(this.props.story.currentPage, 10) + 1}`} id={parseInt(this.props.story.currentPage, 10) + 1} className="pagelink" onClick={this.toNext}> Next </NavLink>
                        </li>;
            }
            else{
                return  <li></li>;
            }
        }


        return(
            <div className="content-wrapper">
                <div className="left">
                    { defaultContent }
                    <div>
                        <ul id="page-numbers">
                            {prevBTN()}
                                
                            {renderPageNumbers}

                            {nextBTN()}
                            
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
  
  const mapStateToProps = (state, ownProps) => ({
    story: state.story
  });
  
  export default connect(mapStateToProps, { getStories })(ReadStories);
  