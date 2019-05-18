import React from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

class SessionInfoTab extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Typography component="div" style={{ padding: 8 * 3 }}>
				{this.props.children}
			</Typography>
		);
	}
}

class SessionInfoTabs extends React.Component {

	constructor(props) {
		// props 
		// ~ session information 
		super(props);
		this.state = {
			value: 0 
		};
	}

	handleChange = (event, value) => {
		this.setState({ value });
	}

	render() {
		return (
			<div className='SessionInfoTabs'>
				<AppBar position="static" color="default">
					<Tabs value={this.state.value} onChange={this.handleChange}>
						<Tab label="Information" />
						<Tab label="Captions" />
						<Tab label="Documents" />
					</Tabs>
				</AppBar>
				{this.state.value === 0 && <SessionInfoTab>Information</SessionInfoTab>}
				{this.state.value === 1 && <SessionInfoTab>Captions</SessionInfoTab>}
				{this.state.value === 2 && <SessionInfoTab>Documents</SessionInfoTab>}
			</div>
		);
	}
}

export default SessionInfoTabs;