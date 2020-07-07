import React, { Fragment, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Header from '@vkontakte/vkui/dist/components/Header/Header';
import InfoRow from '@vkontakte/vkui/dist/components/InfoRow/InfoRow';
import Progress from '@vkontakte/vkui/dist/components/Progress/Progress';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Gallery from '@vkontakte/vkui/dist/components/Gallery/Gallery';
import List from '@vkontakte/vkui/dist/components/List/List';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import ModalRoot from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot';
import ModalCard from '@vkontakte/vkui/dist/components/ModalCard/ModalCard';
import ModalPageHeader  from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';
import heartSVG  from '../img/HeartButton.svg'
import Snackbar from '@vkontakte/vkui/dist/components/Snackbar/Snackbar';
import Icon28SmileOutline from '@vkontakte/icons/dist/28/smile_outline';
import Separator from '@vkontakte/vkui/dist/components/Separator/Separator';




import catBread from '../img/catBread.svg'
import catInHat from '../img/catInHat.svg'
import catInHelm from '../img/catLiza.svg'
import esseCat from '../img/Esse.svg'




const IS_TAPTIC_SUPPORTED	= bridge.supports('VKWebAppTapticNotificationOccurred');
const DEFAULT_HEARTS_COUNT = 0;
const DEFAULT_NUM_AFTER_TAP = 1;
var NUM_OF_TAPS = 0;

const catCost1 = 1000000000;
const catCost5 = 50000000000;
const catCost6 = 20000000000000;
const catTapCost6 = 100000000;
const esseCost = 60000000000000;
const esseTapCost = 300000000
//const LIMIT  = 900719930000000;


const FIRST_PRICE  =  200;
const SECOND_PRICE =  1500;
const THIRD_PRICE  =  12000;
const FORTH_PRICE  =  1400000; 
const FIFTH_PRICE  =  170000000;
const SIXTH_PRICE  =  850000000;


const MODAL_CARD_BOOSTS= 'boosts-card';



const Home = ({fetchedUser, fetchedState}) => {
	const [slideIndex,setSlideIndex]=useState(fetchedState.hasOwnProperty('slideIndex') ? fetchedState.slideIndex : 0);
	const [snackbar, setSnackbar] = useState(null);
	const [heartsCount, setHeartsCount] = useState(fetchedState.hasOwnProperty('heartsCount') ? fetchedState.heartsCount : DEFAULT_HEARTS_COUNT);
	const [tapValue, setTapValue] = useState(fetchedState.hasOwnProperty('tapValue') ? fetchedState.tapValue : DEFAULT_NUM_AFTER_TAP);	
	const [cat5,setCat5] = useState(fetchedState.hasOwnProperty('cat5') ? fetchedState.cat5 : false);
	const [cat6,setCat6] = useState(fetchedState.hasOwnProperty('cat6') ? fetchedState.cat6 : false);
	const [esse,setEsse] = useState(fetchedState.hasOwnProperty('esse') ? fetchedState.esse : false);
	const [modal, setModal] = useState(false);


	const onHeart = async function () {
			if (IS_TAPTIC_SUPPORTED) {
				await bridge.send('VKWebAppTapticNotificationOccurred', { type: heartsCount <= 0 ? 'error' : 'success' });
			}
			try{
				const newNum = heartsCount + tapValue;
				setHeartsCount(newNum);
				NUM_OF_TAPS = NUM_OF_TAPS+1;
				if (NUM_OF_TAPS === 200){
					NUM_OF_TAPS = 0;
					setSnackbar(<Snackbar
							layout='vertical'
							onClose={() => setSnackbar(null)}
							before={<Avatar size={24} style={{backgroundColor: 'var(--accent)'}}><Icon28SmileOutline fill='#fff' width={14} height={14} /></Avatar>}
							duration={5000}
							action="Сохранить"
							onActionClick = {SaveProgress}
						>
							{fetchedUser.first_name  + ", Вас не остановить! Не забывайте сохранять прогресс."}
						</Snackbar>);
				}
			}
			catch{
				setSnackbar(<Snackbar
					layout='vertical'
					onClose={() => setSnackbar(null)}
					before={<Avatar size={24} style={{backgroundColor: 'var(--accent)'}}><Icon28SmileOutline fill='#fff' width={14} height={14} /></Avatar>}
					duration={5000}
					action="Сохранить"
					onActionClick = {SaveProgress}
				>
					{fetchedUser.first_name  + "Вы достигли максимума!"}
				</Snackbar>);				
			}
	}

	const SaveProgress = async function(){
		if (IS_TAPTIC_SUPPORTED) {
			await bridge.send('VKWebAppTapticNotificationOccurred', { type: heartsCount <= 0 ? 'error' : 'success' });
		}
		try{
			setStorage({
				heartsCount: heartsCount,
				tapValue: tapValue
			});	
		}
		catch(e){
			setSnackbar(<Snackbar
                layout='vertical'
                onClose={() => setSnackbar(null)}
                duration={2000}
            >
                {"Не удалось сохранить"}
            </Snackbar>);


		}
		return;
	}

	const setStorage = async function(properties) {
		await bridge.send('VKWebAppStorageSet', {
			key: 'myState',
			value: JSON.stringify({
				heartsCount,
				tapValue,
				cat5,
				cat6,
				slideIndex,
				...properties
			})
		});
		return;
	}

	const upgradeFirst = async function(){
        if (IS_TAPTIC_SUPPORTED) {
			await bridge.send('VKWebAppTapticNotificationOccurred', { type: heartsCount <= FIRST_PRICE ? 'error' : 'success' });
        }
        if(heartsCount>=FIRST_PRICE){
            const newHeartsCount=heartsCount - FIRST_PRICE;
            const newTapValue=tapValue + 1;
            setHeartsCount(newHeartsCount);
            setTapValue(newTapValue);
        }
		else{
			const difference = FIRST_PRICE - heartsCount;
            setSnackbar(<Snackbar
                layout='vertical'
                onClose={() => setSnackbar(null)}
                duration={2000}
            >
                { "Вам не хватает " + difference + " середечек!"}
            </Snackbar>);
		}
		return;

    }

    const upgradeSecond = async function(){
        if (IS_TAPTIC_SUPPORTED) {
			await bridge.send('VKWebAppTapticNotificationOccurred', { type: heartsCount <= SECOND_PRICE ? 'error' : 'success' });
        }
        if(heartsCount>=SECOND_PRICE){
            const newHeartsCount=heartsCount - SECOND_PRICE;
            const newTapValue=tapValue + 10;
            setHeartsCount(newHeartsCount);
            setTapValue(newTapValue);
        }
		else{
			const difference = SECOND_PRICE - heartsCount;
            setSnackbar(<Snackbar
                layout='vertical'
                onClose={() => setSnackbar(null)}
                duration={2000}
            >
                { "Вам не хватает " + difference + " середечек!"}
            </Snackbar>);
		}
		return;
    }

    const upgradeThird = async function(){
        if (IS_TAPTIC_SUPPORTED) {
			await bridge.send('VKWebAppTapticNotificationOccurred', { type: heartsCount <= THIRD_PRICE ? 'error' : 'success' });
        }
        if(heartsCount>=THIRD_PRICE){
            const newHeartsCount=heartsCount - THIRD_PRICE;
            const newTapValue=tapValue + 100;
            setHeartsCount(newHeartsCount);
            setTapValue(newTapValue);
        }
		else{
			const difference = THIRD_PRICE - heartsCount;
            setSnackbar(<Snackbar
                layout='vertical'
                onClose={() => setSnackbar(null)}
                duration={2000}
            >
                { "Вам не хватает " + difference + " середечек!"}
			</Snackbar>);
			
		}
		return;
    }

    const upgradeForth = async function(){
        if (IS_TAPTIC_SUPPORTED) {
			await bridge.send('VKWebAppTapticNotificationOccurred', { type: heartsCount <= FORTH_PRICE ? 'error' : 'success' });
        }
        if(heartsCount>=FORTH_PRICE){
            const newHeartsCount=heartsCount - FORTH_PRICE;
            const newTapValue=tapValue + 1000;
            setHeartsCount(newHeartsCount);
            setTapValue(newTapValue);
        }
		else{
			const difference = FORTH_PRICE - heartsCount;
            setSnackbar(<Snackbar
                layout='vertical'
                onClose={() => setSnackbar(null)}
                duration={2000}
            >
                { "Вам не хватает " + difference + " середечек!"}
            </Snackbar>);
		}
		return;
	}
	
    const upgradeFifth = async function(){
        if (IS_TAPTIC_SUPPORTED) {
			await bridge.send('VKWebAppTapticNotificationOccurred', { type: heartsCount <= FIFTH_PRICE ? 'error' : 'success' });
        }
        if(heartsCount>=FIFTH_PRICE){
            const newHeartsCount=heartsCount - FIFTH_PRICE;
            const newTapValue=tapValue + 100000;
            setHeartsCount(newHeartsCount);
            setTapValue(newTapValue);
        }
		else{
			const difference = FIFTH_PRICE - heartsCount;
            setSnackbar(<Snackbar
                layout='vertical'
                onClose={() => setSnackbar(null)}
                duration={2000}
            >
                { "Вам не хватает " + difference + " середечек!"}
            </Snackbar>);
		}
		return;
	}

	const upgradeSixth = async function(){
        if (IS_TAPTIC_SUPPORTED) {
			await bridge.send('VKWebAppTapticNotificationOccurred', { type: heartsCount <= SIXTH_PRICE ? 'error' : 'success' });
        }
        if(heartsCount>=SIXTH_PRICE){
            const newHeartsCount=heartsCount - SIXTH_PRICE;
            const newTapValue=tapValue + 500000;
            setHeartsCount(newHeartsCount);
            setTapValue(newTapValue);
        }
		else{
			const difference = SIXTH_PRICE - heartsCount;
            setSnackbar(<Snackbar
                layout='vertical'
                onClose={() => setSnackbar(null)}
                duration={2000}
            >
                { "Вам не хватает " + difference + " середечек!"}
            </Snackbar>);
		}
		return;
	}

	const buyCat5 = async function(){
		if (IS_TAPTIC_SUPPORTED) {
			await bridge.send('VKWebAppTapticNotificationOccurred', { type: heartsCount <=  catCost5 ? 'error' : 'success' });
        }
		if (heartsCount>=catCost5){
			const newHC= heartsCount - catCost5;
			setHeartsCount(newHC);
			const newCat = true;
			setCat5(newCat);
			setStorage({
				heartsCount: newHC,
				cat5: newCat,
				slideIndex: 1
			});	
		}
		else{
			const difference = catCost5 - heartsCount;
            setSnackbar(<Snackbar
                layout='vertical'
                onClose={() => setSnackbar(null)}
                duration={2000}
            >
                { "Вам не хватает " + difference + " середечек!"}
            </Snackbar>);
		}
		return;
	}

	const buyCat6 = async function(){
		if (IS_TAPTIC_SUPPORTED) {
			await bridge.send('VKWebAppTapticNotificationOccurred', { type: heartsCount <=  catCost5 ? 'error' : 'success' });
        }
		if ((heartsCount>=catCost6)&&(tapValue>catTapCost6)){
			const newHCnt= heartsCount - catCost6;
			const newTV= tapValue - catTapCost6;
			setHeartsCount(newHCnt);
			setTapValue(newTV);
			const newCat = true;
			setCat6(newCat);
			setStorage({
				heartsCount: newHCnt,
				tapValue: newTV,
				cat6: newCat,
				slideIndex: 2
			});	
		}
		else{
			const difference = catCost6 - heartsCount;
            setSnackbar(<Snackbar
                layout='vertical'
                onClose={() => setSnackbar(null)}
                duration={2000}
            >
                { "Вам не хватает " + difference + " середечек!"}
            </Snackbar>);
		}
		return;
	}
	const buyEsse = async function(){
		if (IS_TAPTIC_SUPPORTED) {
			await bridge.send('VKWebAppTapticNotificationOccurred', { type: heartsCount <=  esseCost ? 'error' : 'success' });
        }
		if ((heartsCount>=esseCost)&&(tapValue>esseTapCost)){
			const newHCnt= heartsCount - esseCost;
			setHeartsCount(newHCnt);
			const newT = tapValue - esseTapCost;
			const newEsse = true;
			setTapValue(newT);
			setEsse(newEsse);
			setStorage({
				heartsCount: newHCnt,
				tapValue: newT,
				esse: newEsse
			});	
		}
		else{
			const difference = esseCost - heartsCount;
            setSnackbar(<Snackbar
                layout='vertical'
                onClose={() => setSnackbar(null)}
                duration={2000}
            >
                { "Вам не хватает " + difference + " середечек!"}
            </Snackbar>);
		}
		return;
	}

	function round(value, decimals) {
			const a = Number(Math.round(value+'e'+decimals)+'e-'+decimals);
			if (a >=100) {
				return 100;
			}
			else{
				return a;
			}
	}

	const openModal = async function(){
		if (IS_TAPTIC_SUPPORTED) {
			await bridge.send('VKWebAppTapticNotificationOccurred', { type: heartsCount <= 0 ? 'error' : 'success' });
		}
		try{
			setModal(true);
		}
		catch(e){
			console.log(e.message);
		}
		return;
	}

	const closeModal = async function(){
			try{
				setStorage({
					heartsCount: heartsCount,
					tapValue: tapValue
				});	
				setTimeout(() => setModal(false), 10);
			}
			catch(e){
				console.log(e.message);
			}
		return;
	}

	const goCovid = async function(){
		try{
			bridge.send("VKWebAppOpenApp", {"app_id": 7362610});
		}
		catch(e){
			console.log(e.message)
		}
		
	}

	const activeModal = (
		<ModalRoot
		activeModal={MODAL_CARD_BOOSTS}
			>
			<ModalCard id={MODAL_CARD_BOOSTS}	
			header={<ModalPageHeader right={tapValue} noShadow="false">
				Улучшения
				</ModalPageHeader>}
			onClose= {closeModal}
			>
				<Div className="modalContainer">
						<Cell>
							<Button className="modalBoostButtons"  onClick={upgradeFirst}>+1 к нажатию</Button>
						</Cell>
						<Cell>
							<Button className="modalBoostButtons"  onClick={upgradeSecond} >+10 к нажатию</Button>
						</Cell>	
						<Cell>
							<Button className="modalBoostButtons"  onClick={upgradeThird}>+100 к нажатию</Button>	
						</Cell>
						<Cell>
							<Button className="modalBoostButtons"  onClick={upgradeForth} >+1K к нажатию</Button>
						</Cell>						
						<Cell>
							<Button className="modalBoostButtons" onClick={upgradeFifth}>+100K к нажатию</Button>
						</Cell>
						<Cell>
							<Button className="modalBoostButtons"  onClick={upgradeSixth} >+500K к нажатию</Button>
						</Cell>			
						<Cell>
							<Button className="modalBoostButtons covid"  onClick={goCovid} >Главное о COVID-19</Button>
						</Cell>				
				</Div>

			</ModalCard>
	</ModalRoot>
	);



return(
	<Fragment>
		{ (fetchedUser && fetchedState) &&
		<Fragment>
			<div className="myHeader">
								<Group className="counterContainer">
									<p className="CounterHeader main"><span role='img' aria-label='Heart'>💖:  </span>{heartsCount}</p>
									<p className="CounterHeader secondary"><span role='img' aria-label='Heart per Click'>💞:  </span>{tapValue}</p>
								</Group>
								<Div className="headerButtonsContainer">
									<Button className="saveProgressBut" mode="secondary" onClick={SaveProgress}>Сохранить</Button>	
									<Button className="saveProgressBut" mode="secondary" onClick={openModal}>Улучшения</Button>				
								</Div>
			</div>
		<Separator></Separator>
		<Group className='MainView'>
			<Gallery className="CatsGallery"
					slideWidth="100%"
					align="center"
					slideIndex={slideIndex}
					onChange={slideIndex => setSlideIndex({slideIndex})}
					>
				{((heartsCount>=catCost1)||(cat5===true))?<Group className ="IntroCat" header={<Header mode="secondary">Типичный Кот</Header>}><img src={catBread} alt="first cat"/></Group>:<Group>
																																								<List>
																																									<Cell className="textCell" multiline>Кот Хлебушек появится, когда на вашем счету будет 1000000000 сердечек.</Cell><Cell><InfoRow header={round((heartsCount/catCost1)*100, 3) + "%"}><Progress value={(heartsCount/catCost1)*100} /></InfoRow></Cell>
																																																
																																								</List>
																																							</Group>}
				{(cat5 === true)?<Group className ="IntroCat" header={<Header mode="secondary">Кот в шляпе</Header>}><img src={catInHat} alt="cat in hat"/></Group>:<Group>
																																							<List>
																																								<Cell className="textCell" multiline>	Кот в шляпе появится, когда вы сможете позволить себе покупку за 50000000000 сердечек.</Cell><Cell><InfoRow header={round((heartsCount/catCost5)*100, 3) + "%"}><Progress value={(heartsCount/catCost5)*100} /></InfoRow></Cell>
																																								<Cell className="textCell"	> <Button mode="commerce" className="modalBoostButtons" onClick={buyCat5}>Купить кота</Button></Cell>
																																							</List>
																																						</Group>}
				{(cat6 === true)?<Group className ="IntroCat" header={<Header mode="secondary">Кошечка в шлеме</Header>}><img src={catInHelm} alt="cat in helm"/></Group>:<Group>
																																							<List>
																																								<Cell className="textCell" multiline>	Кошечка в шлеме появится, когда вы сможете позволить себе покупку за 20000000000000 сердечек. А еще она отберет 100000000/тап.</Cell><Cell><InfoRow header={round((heartsCount/catCost6)*100, 3) + "%"}><Progress value={(heartsCount/catCost6)*100} /></InfoRow></Cell>
																																								<Cell className="textCell"> <Button mode="commerce" className="modalBoostButtons" onClick={buyCat6}>Купить кота</Button></Cell>
																																							</List>
																																						</Group>}
				{(esse===true)?<Group className ="IntroCat" header={<Header mode="secondary">Эссе по философии</Header>}><img src={esseCat} alt="esse"/></Group>:<Group>
																																																		<List>
																																																			<Cell className="textCell" multiline>	Эссе появятся, когда вы сможете позволить себе покупку за 60000000000000 сердечек. А еще они заберут 300000000/тап.</Cell><Cell><InfoRow header={round((heartsCount/esseCost)*100, 3) + "%"}><Progress value={(heartsCount/esseCost)*100} /></InfoRow></Cell>
																																																			<Cell className="textCell"	> <Button mode="commerce" className="modalBoostButtons" onClick={buyEsse}>Купить эссе по философии</Button></Cell>
																																																		</List>
																																																	</Group>}
			</Gallery>
			<Div className='HeartBtnContainer'>
				<Button  className='HeartBtn' onClick={onHeart}>
						<img className="heart" src = {heartSVG}alt="To Love"/>						
				</Button>
			</Div>
		</Group>
		</Fragment>
		}
		{snackbar}	
		{modal ? activeModal : null}
		
	</Fragment>
);
};

export default Home;