import axios from 'axios';
import { GET_STORIES, GET_RESULTS, POST_STORY, DELETE_STORY, STORIES_LOADING} from './types';



export const getStories = () => dispatch => {
    dispatch(setStoriesLoading()); 
    try{axios
        .get('/api/stories')
        .then(res => 
            dispatch({
                type: GET_STORIES, 
                payload: res.data
            })
        )}catch (err) {
            console.error(`Error received from axios.post: ${JSON.stringify(err)}`);
          }
};
/*
dispatch({
                type: GET_RESULTS, 
                payload : res.data
            })
*/

export const getResults = (query) => dispatch => {
    console.log(query + ' my query');
        try{axios.get('api/stories?Title=' + query)
            .then(res => dispatch({
                type: GET_RESULTS, 
                payload : res.data
            })
            )}catch (err)
            {
                console.error(`Error received from axios.get: ${JSON.stringify(err)}`);
            }
};

export const deleteStory = (id) => {
    return{
        type: DELETE_STORY, 
        payload: id
    };
};

export const postStory = (story) => dispatch => {
    axios
        .post('/api/stories', story)
        .then(res =>
            dispatch({
                type: POST_STORY, 
                payload: res.data
            })
        )
};

export const setStoriesLoading = () => {
    return{
        type: STORIES_LOADING
    };
};