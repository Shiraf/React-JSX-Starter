import _ from 'loadash'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'

import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'

const API_KEY = 'AIzaSyB6QsWHSjbZq9wEaDUd41tvPn-xwVmDcXA';


// Creating the component
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos:[],
            selectedVideo:null
        };

        this.videoSerach('surfboarding');
    }
    
    videoSerach(term) {
        YTSearch({key:API_KEY, term:term}, (videos) => {
            this.setState({
                videos:videos,
                selectedVideo:videos[0]
            });
        });
    }

    render(){
        return (
        <div>
            <SearchBar onSearchTermChange={term => this.videoSerach(term)}/>
            <VideoDetail video={this.state.selectedVideo} />
            <VideoList 
                onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                videos={this.state.videos} />
        </div>
        );
    }
}

// Render in to DOM
ReactDOM.render(<App />, document.querySelector('.container'));