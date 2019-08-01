import React, { useState } from 'react';
// import ReactPlayer from 'react-player'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  sessionContainer: {
  	height: '100vh'
  },
  sessionHeading: {
  	alignItems: 'center'
  },
  sessionList: {
  	paddingTop: theme.spacing(3)
  },
  sessionRow: {
  	display: 'flex',
  	flexGrow: 1,
  	flexDirection: 'column',
  	alignItems: 'space-around'
  },
  sessionInfoHolder: {
  	paddingTop: theme.spacing(1),
  	height: 80
  },
  video: {},
  videoContainer: {},
  fixedHeight: {
    height: 240,
  },
  leftAlignList: {
  	textAlign: 'left'
  },
  captions: {
  	height: 80,
  	overflowY: 'auto'
  }
}));


function InformationTab(props) {
	const classes = useStyles();
	return (
		<ul className={classes.leftAlignList}>
			<li>Site ID: {props.session.site_id}</li>
			<li><a href={props.session.url} target="_blank">Youtube URL</a></li>
			<li>Created At: {props.session.date}</li>
		</ul>
	);
}

function CaptionTab(props) {
	const classes = useStyles();

	if(props.session.hasOwnProperty('captions')) {
		return (
			<div className={classes.captions}>
				<ul className={classes.leftAlignList}>
			      {props.session.captions.slice(1,3).map(function(caption){
			        return <li>{caption.caption}</li>;
			      })}
			    </ul>
			</div>
		);
	} else {
		return null;
	}
}

function DocumentTab(props) {
	const classes = useStyles();

	if(props.session.hasOwnProperty('documents')) {
		return (
			<ul className={classes.leftAlignList}>
				{props.session.documents.map(function(document){
					return <li><a href={document.url} target="_blank">{document.type}</a></li>;
				})}
			</ul>
		);
	} else {
		return null;
	}
}

function SessionInfoTabs(props) {
	const classes = useStyles();
	const [tabIndex, setTabIndex] = useState(0);

	return (
		<React.Fragment>
			<Tabs 
				value={tabIndex} 
				onChange={(e, v) => setTabIndex(v)}
				variant="fullWidth"
			>
				<Tab label="Information" />
				<Tab label="Captions" />
				<Tab label="Documents" />
			</Tabs>
			<div className={classes.sessionInfoHolder}>
				{tabIndex === 0 && <InformationTab session={props.session} />}
				{tabIndex === 1 && <CaptionTab session={props.session} />}
				{tabIndex === 2 && <DocumentTab session={props.session} />}
			</div>
		</React.Fragment>
	);
}


function SessionListView(props) {
	const classes = useStyles();

	const transformSessionsToListItems = (sessions) => {
		if(sessions.length > 0) {
			const listItems = sessions.map((session) => 
				<React.Fragment>
					<Divider />
					<ListItem className={classes.sessionRow}>
						<Typography variant='h6'>{session.title}</Typography>
						<SessionInfoTabs session={session}/>
					</ListItem>
					<Divider />
				</React.Fragment>
			);
			return listItems;
		} else {
			return null;
		}
	}
	
	return (
		<div className={classes.sessionContainer}>
			<div className={classes.sessionHeading}>
            	<Typography variant="h4">Sessions</Typography>
          	</div>

          	{ props.isLoading ? 
          		(<div>Loading ...</div>) : 
          		<List className={classes.sessionList}>
					{transformSessionsToListItems(props.sessions)}
				</List>
          	}
		</div>
	);
}

export default SessionListView;

 