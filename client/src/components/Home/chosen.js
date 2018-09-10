import React, { Component } from 'react';
import './Home.css';
import './Chosen.css'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getStories } from '../../actions/storyActions';
import propTypes from 'prop-types';
import jsonQuery from 'json-query';


class Chosen extends Component{


    componentDidMount() {
        this.props.getStories();
        window.scrollTo(0,0);
    }

    handleClick = (e) => {
    e.preventDefault()
    let ref1 = "storytitle" + e.target.id
    //let ref2 = "storybody" + e.target.id
    //let ref3 = "storylocation" + e.target.id

    console.log(ref1)
    console.log(e.target.getAttribute('id'))
    //this.props.story.storytitle = this.refs[ref1].textContent
    //this.props.story.storybody = this.refs[ref2].textContent
    //this.props.story.location = this.refs[ref3].textContent
    //alert(this.props.story.storytitle)
    //alert(this.props.story.storybody)
  }

    render(){
        
        const { stories } = this.props.story; 
        //const storiesArr = Object.keys(stories);
        
        const Title = jsonQuery('[*][Title]', {data: stories} ).value;
        //const Content = jsonQuery('[*][Content]', {data: stories} ).value;
        //const ImageURL = jsonQuery('[*][ImageURL]', {data: stories} ).value;
        const storylocation = jsonQuery('[*][Location]', {data: stories} ).value;

        
        const getContent = stories.map((eachStory, i) => {
            let index = i + 3
            return(
                <NavLink to="/story" id={index} className="navLink" onClick={this.handleClick}>
                    <div className="news-item" key={i}>
                    <p className="origin">Canada-{storylocation[i]}</p>
                    <p className="item-title" ref={`storytitle${i+3}`}>
                        {Title[i]}
                    </p>
                    </div>
                </NavLink>
            );
          });

        return(
            <div className="content-wrapper">
                <div className="left">
                    <div className="story-div">
                        <h3 className="story-title">{this.props.story.storytitle}</h3>
                        <span className="location-span">Canada - {this.props.story.location} | {this.props.story.storydate}</span>
                        <p className="story-body">
                            <img alt="nitpix" src={this.props.story.storyimage} />
                            {this.props.story.storybody}
                        </p>
                    </div>
                </div>

                <div className="right">
                    <div className="feed home-top">
                        <h3>Older Stories</h3>
                        { getContent }
                    </div>

                    <div className="feed bottom">
                        <h3>Twitter Feed</h3>

                        
                    </div>
                </div>
            </div>
        );
    }
}

Chosen.propTypes = {
    getStories: propTypes.func.isRequired, 
    story: propTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    story: state.story
  });
  
  export default connect(mapStateToProps, { getStories })(Chosen);