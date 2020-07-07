import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';


import Home from './panels/Home';




const STORAGE_KEYS = {
	MYSTATE:'myState',
	STATUS: 'viewStatus',
};





const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [fetchedState, setFetchedState] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const sheetState = await bridge.send('VKWebAppStorageGet', { keys: [STORAGE_KEYS.MYSTATE, STORAGE_KEYS.STATUS]})
			if (Array.isArray(sheetState.keys)) {
				const data = {};
				sheetState.keys.forEach(({ key, value }) => {
					try {
						data[key] = value ? JSON.parse(value) : {};
						switch (key) {
							case STORAGE_KEYS.MYSTATE:
								setFetchedState(data[STORAGE_KEYS.MYSTATE]);
								break;
							default:
								break;
						}
					} catch (error){
						setFetchedState({});
					}
				});
				
			} else {
				setFetchedState({});
			}
			setUser(user);
			setPopout(null);
			console.log(sheetState);
		}
		fetchData();
	}, []);

	//const go = panel => {
	//	setActivePanel(panel);
	//};

	//const viewHome = async (panel) => {
	//		go(panel);
	//}

	return (
		
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' fetchedUser={fetchedUser} fetchedState={fetchedState}/>
		</View>
	);
}

export default App;

