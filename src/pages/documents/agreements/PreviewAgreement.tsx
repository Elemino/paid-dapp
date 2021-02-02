import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderToString } from 'react-dom/server';
import TemplateComponent from 'react-mustache-template-component';
import { IonButton, IonButtons, IonItem, IonPopover, IonTitle, IonToolbar } from '@ionic/react';
import {
    doSetAgreementFormInfo,
	doCreateAgreement,
    openErrorDialog,
} from '../../../redux/actions/documents';
import { useHistory, useParams } from 'react-router';
import { getContractTemplate } from '../../../redux/actions/template/index';
import SmartAgreementsForm from './smartAgreementsForms/SmartAgreementsForm';


const NDA_TYPE_CODE = "nda";

interface PreviewAgreementProps {
    current: any;
}

const PreviewAgreement: FC<PreviewAgreementProps> = ({ current }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const documentState = useSelector((state: any) => state.documents);
    const wallet = useSelector(
		(state: { wallet: { currentWallet: any, selectedToken: string } }) => state.wallet
    );
    const smartAgreementsState = useSelector(
        (state: { smartAgreements:any }) => state.smartAgreements
    );
    const [showEditPopover, setShowEditPopover] = useState(false);
    const [agreementDocument, setAgreementDocument] = useState('');
    const [agreementData, setAgreementData] = useState({});
    
    const { agreementFormInfo, loading } = documentState;
    const { currentWallet, selectedToken } = wallet;

    const { type } = useParams<{ type: string }>();

    const getDataInfo = useCallback((dataName: string) => {
        const today = new Date();
        const dataInfos = new Map([
            ['date', today.toLocaleDateString()],
            ['createDate', today.toLocaleDateString()],
            ['partyEmail', agreementFormInfo?.email],
            ['partyName', agreementFormInfo?.name],
            ['partyAddress', agreementFormInfo?.address],
            ['partyWallet', currentWallet?.address],
            ['counterPartyEmail',agreementFormInfo?.counterpartyEmail],
            ['counterPartyAddress', agreementFormInfo?.counterpartyAddress],
            ['counterPartyWallet', agreementFormInfo?.counterpartyWallet],
            ['counterPartyName', agreementFormInfo?.counterpartyName],
        ]);

        return dataInfos.get(dataName);
    }, [currentWallet, agreementFormInfo]);

    const agreementTemplate = useCallback(() => {
        return <div style={{width: '100%'}}><TemplateComponent template={agreementDocument} data={agreementData} /></div>;
    }, [agreementDocument, agreementData]);

    const slideNext = useCallback(async () => {
		dispatch(doSetAgreementFormInfo({
			name: '',
			address: '',
			phone: '',
			counterpartyWallet: '',
			counterpartyName: '',
			counterpartyAddress: '',
			counterpartyPhone: '',
			createdAt: null
		}));

		await current.lockSwipeToPrev(false);
		await current.lockSwipeToNext(false);
		await current.slideTo(0).then(() => {
			history.push('/documents');
		});
    }, [current, history, dispatch]);
    
    const slideBack = useCallback(async () => {
		await current.lockSwipeToPrev(false);
		await current.slidePrev();
		await current.lockSwipeToPrev(true);
    }, [current]);


    const onSubmit = useCallback(async () => {
        dispatch(doSetAgreementFormInfo({ createdAt: new Date().toDateString() }));
        dispatch(
            doCreateAgreement({
                signatoryA: currentWallet?.address,
                signatoryB: agreementFormInfo.counterpartyWallet,
                validUntil: 0,
                agreementFormTemplateId: type,
                agreementForm: agreementFormInfo,
                template: renderToString(agreementTemplate()),
                slideNext: slideNext,
                slideBack: slideBack
            })
        );
	}, [type, currentWallet, agreementFormInfo, agreementTemplate, dispatch, slideNext, slideBack]);

    useEffect(() => {
        const templateData = getContractTemplate(type);
        const data: any = {
            ...smartAgreementsState[templateData.dataName]
        };
        for (const key in data) {
            data[key] = getDataInfo(key) ?? data[key];
        }

        setAgreementDocument(templateData.template);
        setAgreementData(data);
    }, [type, smartAgreementsState, getDataInfo]);
    
    return (
        <div className="agreement-content">
            <IonToolbar className="agreement-preview-toolbar">
                <IonTitle className="agreement-form-title">Preview Document</IonTitle>
                {
                    type !== NDA_TYPE_CODE &&
                    <IonButtons slot="end">
                        <IonButton onClick={() => {
                            setShowEditPopover(true)
                        }}>
                            edit
                        </IonButton>
                    </IonButtons>
                }
            </IonToolbar>
            <IonItem class="form-options preview-document">
                {
                    agreementTemplate()
                }
            </IonItem>
            <IonPopover
                mode="md"
                translucent={false}
                isOpen={showEditPopover}
                cssClass="agreements-popover"
                onDidDismiss={() => setShowEditPopover(false)}
            >
                <IonItem class="form-options">
                    <SmartAgreementsForm type={type} onClose={() => setShowEditPopover(false)} />
                </IonItem>
            </IonPopover>
            <IonItem class="form-options preview-document-buttons">
                <IonButton
                    color="danger"
                    shape="round"
                    onClick= { () => slideBack() }
                >
                    Back
                </IonButton>
                <IonButton
                    color="gradient"
                    shape="round"
                    disabled={loading}
                    onClick={ () => onSubmit() }
                >
                    {loading ? 'Loading..' : 'Accept'}
                </IonButton>
            </IonItem>
        </div>
    );
}

export default PreviewAgreement;