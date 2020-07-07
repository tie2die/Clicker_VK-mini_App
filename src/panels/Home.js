import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Main from '../components/Main';

import './Home.css';

const Home = ({ id, fetchedState, fetchedUser}) => {

	return (
		<Panel id={id}>
			<PanelHeader>Сердечки</PanelHeader>
			{fetchedState && <Main fetchedState={fetchedState} fetchedUser={fetchedUser}/>}
		</Panel>
	);
};

export default Home;