import {
	IonButton,
	IonContent,
	IonImg,
	IonLoading,
	IonPage,
	IonRouterLink
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import BannerMobileSoon from '../components/BannerMobileSoon';
import Terms from '../components/Terms';
import { doConnectWallet } from '../redux/actions/wallet';

declare global {
	interface Window { web3: any; ethereum: any;}
}

const Landing: React.FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const wallet = useSelector(
		(state: { wallet: { connectedWallet: boolean ; currentWallet: any } }) =>
			state.wallet
	);
	const [showTermsModal, setShowTermsModal] = useState(false);
	const { connectedWallet, currentWallet } = wallet;
	
	return (
		<IonPage>
			<BannerMobileSoon />
			<IonContent fullscreen class="landing-content">
				<div className="landing-logo">
					<IonImg src="/assets/images/logo-full.png" />
				</div>

				{/* <IonLoading
					cssClass="loader-spinner"
					mode="md"
					isOpen={loading}
				/> */}
						<IonButton
						onClick={() => {
							dispatch(doConnectWallet(window.ethereum, history));
						}}
						className="enableEthereumButton"
						color="secondary"
						shape="round"
						>
							Connect to Wallet Metamask
						</IonButton>
				<div className="terms">
					By continuing you agree to our <IonRouterLink onClick={() => setShowTermsModal(true)}>T&Cs.</IonRouterLink>
					We use your data to offer you a personalized experience.
					<IonRouterLink onClick={() => setShowTermsModal(true)}>Find out more.</IonRouterLink>
					<Terms show={showTermsModal} dismiss={() => {setShowTermsModal(false)}} />

				</div>
			</IonContent>
		</IonPage>
	);
};

// @ts-ignore
export default Landing;
