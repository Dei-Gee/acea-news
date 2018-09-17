import { GET_STORIES, GET_RESULTS, POST_STORY, DELETE_STORY, STORIES_LOADING} from '../actions/types';

const initialState = {
    stories: [], 
    loading: false, 
    storytitle: '',
    storybody: '', 
    location: '', 
    storyimage: '', 
    storydate: '', 
    currentPage: 1, 
    storiesPerPage: 2, 
    query: '', 
    queryResults: []
};

export default function(state = initialState, action)
{
    switch(action.type)
    {
        case GET_STORIES:
            
            return {
                ...state, 
                stories: action.payload,
                loading: false
            }
            
        case GET_RESULTS:
            
            return {
                ...state, 
                query: '',  
                queryResults: action.payload,
                loading: false
            }
            
        case GET_RESULTS:
            
            return {
                ...state.stories.filter(story => story.query == action.payload), 
                queryResults: action.payload,
                loading: false
            }

        case DELETE_STORY:
            return {
                ...state.stories.filter(story => story.id !== action.payload)
            }

        case POST_STORY:
            return {
                ...state, 
                stories: [action.payload, ...state.stories]
            }

        case STORIES_LOADING:
            return{
                ...state, 
                loading: true
            }

        default:
            return state;
    }
}