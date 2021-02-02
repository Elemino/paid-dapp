import {
	IonButtons,
	IonContent,
	IonHeader,
	IonItem,
	IonLabel,
	IonMenuButton,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButton,
	IonLoading,
	IonIcon,
	IonModal,
	IonCardContent,
	IonCardTitle,
	IonCardSubtitle,
	IonCardHeader,
	IonCard,
	IonPopover,
	IonItemDivider,
	IonFabButton,
	IonFab,
	IonFabList
} from '@ionic/react';
import {
	add,
	caretUp,
	documentsOutline as documentsIcon,
	power,
} from 'ionicons/icons';

import React, {useEffect, useState, useRef} from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
	doGetDocuments,
	doGetSelectedDocument,
	openErrorDialog,
	openSuccessDialog
} from '../../redux/actions/documents';

import MenuAlternate from '../../components/MenuAlternate';
import DocumentsList from './DocumentsList';
import { IonText } from '@ionic/react';
import AgreementType from '../../models/AgreementType';
import { Sessions } from '../../utils/sessions';
import Web3 from 'web3'
import BannerMobileSoon from '../../components/BannerMobileSoon';

function SelectedDocument(payload: {
	show: boolean;
	selectedDocument: any;
	closeShowDocument: () => void;
}) {
	const wallet = useSelector((state: any) => state.wallet);
	const { currentWallet } = wallet;

	const [networkText, setNetWorkText] = useState(currentWallet?.network);
	const { show, selectedDocument, closeShowDocument } = payload;

	useEffect(() => {
		if (currentWallet) {
			setNetWorkText(currentWallet?.network)
		}
	}, [currentWallet]);

	if (!selectedDocument) {
		return null;
	}

	return (
		<div id="modal-container">
			<IonModal isOpen={show} cssClass="document-modal" onDidDismiss={() => {closeShowDocument()}}>
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>
							Document Id: {selectedDocument.event.id}
						</IonCardTitle>
						<IonCardSubtitle>
							Valid until: {selectedDocument.data.validUntil}
						</IonCardSubtitle>
					</IonCardHeader>
					<IonCardContent>
						<h2>Details</h2>
						<div className="details-wrapper">
							<IonItem>
								<IonLabel position="stacked">Signatory A</IonLabel>
								<a href={`https://${networkText}.etherscan.io/address/${selectedDocument.event.from}`} target="_blank" rel="noopener noreferrer" >{selectedDocument.event.from}</a>
							</IonItem>
							<IonItem>
								<IonLabel position="stacked">Signatory B</IonLabel>
								<a href={`https://${networkText}.etherscan.io/address/${selectedDocument.event.to}`} target="_blank" rel="noopener noreferrer" >{selectedDocument.event.to}</a>
							</IonItem>
							<IonItem>
								<IonLabel position="stacked">Transaction Hash</IonLabel>
								<a href={`https://${networkText}.etherscan.io/tx/${selectedDocument.meta.transactionHash}`} target="_blank" rel="noopener noreferrer" >{selectedDocument.meta.transactionHash}</a>
							</IonItem>
						</div>
					</IonCardContent>
				</IonCard>
				<hr />
				<IonItem className="modal-actions">
					<IonButton
						color="secondary"
						shape="round"
						onClick={() => {
							closeShowDocument();
						}}
					>
						<span>Close</span>
					</IonButton>
				</IonItem>
			</IonModal>
		</div>
	);
}

const Documents: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const slidesRef = useRef<HTMLIonSlidesElement | null>(null);
	const documentsState = useSelector((state: any) => state.documents);
	const {
		documentsFrom,
		documentsTo,
		selectedDocument,
		loading,
		agreementTypes
	} = documentsState;
	const wallet = useSelector((state: any) => state.wallet);
	const { currentWallet } = wallet;

	const [showModal, setShowModal] = useState(false);
	const [showPopOver, setShowPopover] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const wssUrl = `${process.env.REACT_APP_WEB3_WSS}`;
	
	useEffect(() => {
		if(!Sessions.getTimeoutBool()&&(window.ethereum.isConnected())){
			Sessions.setTimeoutCall();
			dispatch(doGetDocuments(currentWallet));
		}
		else{
			history.push('/');
		}
		slidesRef.current?.lockSwipes(true)
	}, [dispatch, slidesRef, currentWallet]);

	function showDocument(item: any) {
		dispatch(doGetSelectedDocument(item));
		setShowModal(true);
	}

	function closeShowDocument() {
		dispatch(doGetSelectedDocument(null));
		setShowModal(false);
	}

	function trigger(id: string, name: string) {
		return (
			<button className="document-trigger">
				<IonIcon icon={documentsIcon} />
				<span className="document-id">{id}</span>
				<span>{name}</span>
			</button>
		);
	}

	function chooseOption(type: string) {
		setShowPopover(false);
		history.push('/agreements/' + type.toLowerCase());
	}

	function runShowPopover(show: boolean){
		if(!Sessions.getTimeoutBool()){
			Sessions.setTimeoutCall();
		}
		else{
			history.push('/');
		}
		// if (currentWallet?.network != "rinkeby") {
		// 	dispatch(openErrorDialog('You are in a Demo MVP, only Create Smart Agreements in Rinkeby'));
		// 	history.push('/');
		// }
		setShowPopover(show);
	}

	function runDisconnetWallet(show: boolean){
		if((!Sessions.getTimeoutBool()) && (!show)){
			Sessions.setTimeoutCall();
		}
		else {
			dispatch(openSuccessDialog('Pls Disconnect your Wallet'));
			window.ethereum = null
			window.web3 = new Web3 (new Web3.providers.WebsocketProvider(wssUrl));
			currentWallet.web3 = new Web3 (new Web3.providers.WebsocketProvider(wssUrl));
			history.push('/');
		}
	}

	const slideOpts = {
		initialSlide: 0,
		speed: 400,
		height: 500,
		slidesPerView: 1,
		navigation: {
			nextEl: '.swipper-btn',
			prevEl: '.swipper-btn'
		}
	};

	async function slideTo(i: number) {
		await slidesRef.current?.lockSwipes(false)
		setCurrentIndex(i)
		await slidesRef.current?.slideTo(i)
		await slidesRef.current?.lockSwipes(true)

	}
	return (
		<IonPage className="documents-page content-page">
			<BannerMobileSoon />
			<IonContent fullscreen>
				<IonHeader translucent={false} mode="md">
					<IonToolbar>
						<IonButtons slot="start">
							<IonMenuButton/>
						</IonButtons>
						<IonTitle>Documents | <IonText color="primary"> {currentWallet?.address.slice(0,7)}...</IonText></IonTitle>
						<MenuAlternate/>
					</IonToolbar>
				</IonHeader>
				<IonLoading
					cssClass="loader-spinner"
					mode="md"
					isOpen={loading}
				/>
				<div>
					<DocumentsList
						documentsTo={documentsTo}
						documentsFrom={documentsFrom}
						type="from"
						counterType="to"
						agreementTypes={agreementTypes}
						onClickAgreementType={chooseOption}
					/>

					<IonPopover mode="md" translucent={false} isOpen={showPopOver} cssClass="agreements-popover" onDidDismiss={() => {
						setShowPopover(false)
					}}>
						<IonItemDivider>
							<IonItem>Select Agreement type</IonItem>
						</IonItemDivider>
						{agreementTypes.map((type: AgreementType, index: number) => {
							return (
								<IonItem
									key={index}
									className="cursor-pointer"
									onClick={() => {
										chooseOption(type.code);
									}}
								>
									{type.name}
								</IonItem>
							);
						})}
					</IonPopover>
					<SelectedDocument
						show={showModal}
						selectedDocument={selectedDocument}
						closeShowDocument={closeShowDocument}
					/>
					<IonFab vertical="bottom" horizontal="end" slot="fixed">
						<IonFabButton color="gradient">
							<IonIcon style={{pointerEvents: 'none'}} icon={caretUp}></IonIcon>
						</IonFabButton>
						<IonFabList side="top">
							<IonFabButton color="gradient" onClick={() => {
								runShowPopover(true);
							}}>
								<IonIcon style={{pointerEvents: 'none'}} icon={add}/>
							</IonFabButton>
							<IonFabButton color="gradient" onClick={() => {
								runDisconnetWallet(true);
							}}>
								<IonIcon style={{pointerEvents: 'none'}} icon={power} title="close network" ariaLabel="close network"></IonIcon>
							</IonFabButton>
						</IonFabList>
					</IonFab>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Documents;
