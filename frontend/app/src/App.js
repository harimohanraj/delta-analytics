import React from 'react';
import axios from 'axios';

import logo from './omf_logo.png';
import VideoDetail from './VideoDetail';
import SessionListView from './SessionListView';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import './App.css';

class App extends React.Component {

  // See this for state-change code:
  // ~ https://reactjs.org/docs/lifting-state-up.html
  // ~ https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#fetching-external-data
  
  constructor(props) {
  	super(props);
  	this.state = { 
  		sessions: [], 
  		request_url: '' 
  	};
  }

  componentDidMount() {
  	// returns a promise, so don't do anything after and expect it to happen synchronously
  	axios.get(`https://open.ompnetwork.org/api/site/400/sessions?limit=3&live=0`)
  		.then((res) => {
  			this.setState({
  				sessions: res.data.results,
  				request_url: 'https://open.ompnetwork.org/api/site/400/sessions?limit=10&live=0'
  			});
  		});
  }

  
  render() {

  	return (

	    <div className="AppContainer"> 

			<AppBar position = "static">
				<Toolbar>
					<img src={logo} alt="logo" height="10%" width="10%"/>
				</Toolbar>
			</AppBar>
      	 

	    	<div className="ContentContainer">

	      		<div className="SessionContainer">
				    <SessionListView 
				    	request_url = {this.state.request_url}
				    	sessions = {this.state.sessions}
				    />
			    </div>

			 	<div className="AnalyticsContainer">
			 	 	<Paper elevation={1}>
			 	 		<div>
			 	 			<Typography> Graphs go here! </Typography> 
			 	 		</div> 
			 	 	</Paper>
			 	</div>

		    </div>
		</div>
	);
  }
}

export default App;
