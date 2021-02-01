import { IonButton, IonCheckbox, IonInput, IonItem, IonLabel, IonListHeader, IonRadio, IonRadioGroup, IonSlide, IonSlides, IonTextarea } from '@ionic/react';
import React, { FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConsultingAgreementData from '../../../../models/ConsultingAgreementData';
import { doSetConsultingAgreementData } from '../../../../redux/actions/smartAgreements';

const SlideFirst: FC<{
    state: string;
    typeOfCompany: string;
    descriptionConsulting: string;
    setter: any;
}> = ({ state, typeOfCompany, descriptionConsulting, setter }) => {
    return(<>
        <IonItem>
            <IonLabel position="stacked">State</IonLabel>
            <IonInput
                title="Label"
                type="text"
                placeholder="Enter a state"
                value={state}
                name="state"
                onInput={setter}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">Type of Company</IonLabel>
            <IonInput
                title="Label"
                type="text"
                placeholder="Enter a type of company"
                value={typeOfCompany}
                name="typeOfCompany"
                onInput={setter}
            />
        </IonItem>
        <IonItem>
            <IonLabel position="stacked">
                Description of Consulting Services
            </IonLabel>
            <IonTextarea
                title="Label"
                placeholder="Enter a description"
                rows={12}
                value={descriptionConsulting}
                name="descriptionConsulting"
                onInput={setter}
            />
        </IonItem>
        <br />
    </>);
};

const SlideSecond: FC<{
    serviceRender: string;
    consultanShall: string;
    serviceRenderChecked: boolean;
    consultantChecked: boolean;
    setServiceRenderChecked: any;
    setConsultantChecked: any;
    setter: any;
    setterCheck;
}> = ({ serviceRender, consultanShall, serviceRenderChecked, consultantChecked, setServiceRenderChecked, setConsultantChecked, setter, setterCheck }) => {
    const serviceRenderInitial = 'For Services rendered by Consultant under this Agreement, the Company shall pay Consultant at the rate of $____ per hour, payable _______________.  Unless otherwise agreed upon in writing by Company, Company’s maximum liability for all Services performed during the term of this Agreement shall not exceed $____________.';
    const consultantShallInitial = 'Consultant shall be paid $____________ upon the execution of this Agreement and $____________ upon completion of the Services specified on Exhibit A to this Agreement.';
    return(<>
        <IonItem>
            <IonLabel>For services rendered</IonLabel>
            <IonCheckbox
                slot="start"
                color="primary"
                name="serviceRenderChecked"
                className="item-checklist"
                checked={serviceRenderChecked}
                onIonChange={setterCheck(setServiceRenderChecked, 'serviceRender', serviceRenderInitial)} 
            />
        </IonItem>
        {
            serviceRenderChecked &&
            <IonItem>
                <IonTextarea
                    title="Label"
                    rows={10}
                    value={(serviceRender.length <= 0) ? serviceRenderInitial : serviceRender}
                    name="serviceRender"
                    onInput={setter}
                />
            </IonItem>
        }
        <IonItem>
            <IonLabel>Consultant shall</IonLabel>
            <IonCheckbox
                slot="start"
                color="primary"
                className="item-checklist"
                name="consultantChecked"
                checked={consultantChecked}
                onIonChange={setterCheck(setConsultantChecked, 'consultanShall', consultantShallInitial)} 
            />
        </IonItem>
        {
            consultantChecked &&
            <IonItem>
                <IonTextarea
                    title="Label"
                    rows={10}
                    value={(consultanShall.length <= 0) ? consultantShallInitial : consultanShall}
                    name="consultanShall"
                    onInput={setter}
                />
            </IonItem>
        }
    </>);
};

const SlideThird: FC<{
    companyWillRecommend: string;
    other: string;
    companyWillChecked: boolean;
    otherChecked: boolean;
    setCompanyWillChecked: any;
    setOtherChecked: any;
    setter: any;
    setterCheck;
}> = ({ companyWillRecommend, other, companyWillChecked, otherChecked, setCompanyWillChecked, setOtherChecked, setter, setterCheck }) => {
    const companyWillInitial = 'The Company will recommend that the Board grant a non-qualified option to purchase _______ shares of the Company’s Common Stock, at an exercise price equal to the fair market value (as determined by the Company’s Board of Directors) on the date of grant, and which will vest and become exercisable as follows: \n\n' +
    '____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________\n' +
    '_______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________.\n\n';
    const otherInitial = '';
    return(<>
        <IonItem>
            <IonLabel>The Company will recommend </IonLabel>
            <IonCheckbox
                slot="start"
                color="primary"
                className="item-checklist"
                name="companyWillChecked"
                checked={companyWillChecked}
                onIonChange={setterCheck(setCompanyWillChecked, 'companyWillRecommend', companyWillInitial)} 
            />
        </IonItem>
        {
            companyWillChecked &&
            <IonItem>
                <IonTextarea
                    title="Label"
                    rows={10}
                    value={(companyWillRecommend.length <= 0) ? companyWillInitial : companyWillRecommend}
                    name="companyWillRecommend"
                    onInput={setter}
                />
            </IonItem>
        }
        <IonItem>
            <IonLabel>Other</IonLabel>
            <IonCheckbox
                slot="start"
                color="primary"
                className="item-checklist"
                name="otherChecked"
                checked={otherChecked}
                onIonChange={setterCheck(setOtherChecked, 'other', '')} 
            />
        </IonItem>
        {
            otherChecked &&
            <IonItem>
                <IonTextarea
                    title="Label"
                    rows={10}
                    value={(other.length <= 0) ? otherInitial : other}
                    name="other"
                    onInput={setter}
                />
            </IonItem>
        }
    </>);
};

const VALUE_LIST = '___';

const SlideFour: FC<{
    companiesExcluded: string;
    listCompanies: string;
    setter: any;
}> = ({ companiesExcluded, listCompanies, setter }) => {
    return(<>
        <IonItem>
            <IonRadioGroup name="companiesExcluded" value={companiesExcluded} onIonChange={setter}>
                <IonListHeader>
                    <IonLabel>List Of Companies Excluded</IonLabel>
                </IonListHeader>
                <IonItem>
                    <IonLabel>No conflicts </IonLabel>
                    <IonRadio slot="start" color="primary" value="X"></IonRadio>
                </IonItem>
                <IonItem>
                    <IonLabel>Attach List of Companies</IonLabel>
                    <IonRadio slot="start" color="primary" value={VALUE_LIST}></IonRadio>
                </IonItem>
            </IonRadioGroup>
        </IonItem>
        {
            companiesExcluded === VALUE_LIST &&
            <IonItem>
            <IonTextarea
                title="Label"
                rows={10}
                value={listCompanies}
                name="listCompanies"
                onInput={setter}
            />
        </IonItem>
        }
        <br />
    </>);
};

const ConsultingAgreementForm: FC<{
    onClose: any
}> = ({ onClose }) => {
    const dispatch = useDispatch();
    const smartAgreementsState = useSelector(
        (state: {
            smartAgreements: {
                consultingAgreementData: ConsultingAgreementData
            }
        }) => state.smartAgreements
    );
    const slidesRef = useRef<HTMLIonSlidesElement | null>(null);
    const [isFirstSlide, setIsFirstSlide] = useState(true);
    const [isLastSlide, setIsLastSlide] = useState(false);
    const [serviceRenderChecked, setServiceRenderChecked] = useState(false);
    const [consultantChecked, setConsultantChecked] = useState(false);
    const [companyWillChecked, setCompanyWillChecked] = useState(false);
    const [otherChecked, setOtherChecked] = useState(false);

    const { consultingAgreementData } = smartAgreementsState;

    const {
        state,
        typeOfCompany,
        descriptionConsulting,
        serviceRender,
        consultanShall,
        companyWillRecommend,
        other,
        companiesExcluded,
        listCompanies
    } = consultingAgreementData;

    useEffect(
        () => {
            const bootstrapAsync = async () => {
                await slidesRef.current?.update();
                await slidesRef.current?.lockSwipeToPrev(true);
                await slidesRef.current?.lockSwipeToNext(true);
            }

            bootstrapAsync();

            return () => {};
        },
        [slidesRef]
    );

    const setter = useCallback(
        (event: FormEvent<HTMLIonInputElement>) => {
            const { currentTarget } = event;
            const { name, value } = currentTarget;
            consultingAgreementData[name] = value;
            if (name === 'companiesExcluded' && value !== VALUE_LIST) {
                consultingAgreementData.listCompanies = '';
            }
            dispatch(doSetConsultingAgreementData({
                ...consultingAgreementData
            }));
        },
        []
    );

    const setterCheck = useCallback(
        (set: any, nameParam: string, initialValue: '') => (e: any) => {
            const { detail, target } = e;
            const { checked } = detail;
            const { name } = target;
            if (!checked) {
                consultingAgreementData[nameParam] = initialValue;
            }
            consultingAgreementData[name] = (checked) ? 'X' : '';
            dispatch(doSetConsultingAgreementData({
                ...consultingAgreementData
            }));
            set(checked);
        },
        []
    );

    const slideFirst = {
        state,
        typeOfCompany,
        descriptionConsulting
    };

    const slideSecond = {
        serviceRender,
        consultanShall,
        serviceRenderChecked,
        consultantChecked,
        setServiceRenderChecked,
        setConsultantChecked,
        setter,
        setterCheck
    };

    const slideThird = {
        companyWillRecommend,
        other,
        companyWillChecked,
        otherChecked,
        setCompanyWillChecked,
        setOtherChecked,
        setter,
        setterCheck
    };

    const slideFour = {
        companiesExcluded,
        listCompanies,
        setter
    };

    const slideOptions = {
        initialSlide: 0,
		speed: 400,
        slidesPerView: 1,
        autoHeight: true,
		centeredSlides: true,
		centeredSlidesBounds: true
    }

    const slideNext = async () => {
        if (isLastSlide) {
            onClose();
            return;
        }
        const numberOfSlides = 4;
        await slidesRef.current?.lockSwipeToNext(false);
		await slidesRef.current?.slideNext();
        await slidesRef.current?.lockSwipeToNext(true);
        setIsFirstSlide(false);
        setIsLastSlide(await slidesRef.current?.getActiveIndex() === (numberOfSlides - 1));
    };

    const slideBack = async () => {
        const indexFirstSlide = 0;
        await slidesRef.current?.lockSwipeToPrev(false);
        await slidesRef.current?.slidePrev();
        await slidesRef.current?.lockSwipeToPrev(true);
        setIsLastSlide(false);
        setIsFirstSlide(await slidesRef.current?.getActiveIndex() === indexFirstSlide);
    };

    return(
        <div className="smart-agreements-form">
            <IonSlides pager={false} options={slideOptions} ref={slidesRef}>
                <IonSlide>
                    <SlideFirst {...slideFirst} setter={setter} />
                </IonSlide>
                <IonSlide>
                    <SlideSecond {...slideSecond} />
                </IonSlide>
                <IonSlide>
                    <SlideThird {...slideThird} />
                </IonSlide>
                <IonSlide>
                    <SlideFour {...slideFour} />
                </IonSlide>
            </IonSlides>
            <IonItem class="form-options">
					<IonButton
						color="danger"
						shape="round"
                        onClick= { () => slideBack() }
                        disabled={isFirstSlide}
					>
					 Back
					</IonButton>
					<IonButton
						// routerLink="/phrase/instructions"
						onClick={() => {
							slideNext();
						}}
						color="gradient"
                        shape="round"
					>
						{ isLastSlide ? 'Close' : 'Next' }
					</IonButton>
				</IonItem>
        </div>
    );
};

export default ConsultingAgreementForm;