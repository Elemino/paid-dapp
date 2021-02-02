import ActionModel from "../../models/ActionModel";
import AdvisorAgreementData from "../../models/AdvisorAgreementData";
import CiiaAgreementData from "../../models/CiiaAgreementData";
import ConsultingAgreementData from "../../models/ConsultingAgreementData";
import NdaAgreementData from "../../models/NdaAgreementData";
import ReferralAgreementData from "../../models/ReferralAgreementData";
import SaftAgreementData from "../../models/SaftAgreementData";
import { SmartAgreementsTypes } from "../actionTypes/smartAgreements";

interface SmartAgreementsState {
    ndaAgreementData: NdaAgreementData;
    advisorAgreementData: AdvisorAgreementData;
    ciiaAgreementData: CiiaAgreementData;
    consultingAgreementData: ConsultingAgreementData;
    referralAgreementData: ReferralAgreementData;
    saftAgreementData: SaftAgreementData;
};

const initialState: SmartAgreementsState = {
    ndaAgreementData: {
        partyName: '[________]',
        partyEmail: '________',
        partyAddress: '________',
        partyWallet: '________',
        date: '________',
        counterPartyName: '________',
        counterPartyEmail: '________',
        counterPartyAddress: '________',
        counterPartyWallet: '________'
    },
    advisorAgreementData: {
        partyName: '[________]',
        partyEmail: '________',
        partyAddress: '________',
        partyWallet: '________',
        date: '________',
        counterPartyName: '________',
        counterPartyEmail: '________',
        counterPartyAddress: '________',
        counterPartyWallet: '________',
        state: '[STATE]',
        typeOfCompany: '[TYPE OF COMPANY]',
        stockPlanName: '[STOCK PLAN NAME]',
        percentageVest: '[VEST%]',
        purchaseOption: '[PURCHASE OPTION]',
        numberOfShares: '[NUMBER OF SHARES]',
        stockPlanNameValue: '[STOCK PLAN NAME VALUE]',
        termsConditions: '[TERMS CONDITIONS]',
        anniversaryMonth: '[ANNIVERSARY MONTH]',
        vestingCommencement: '[VESTING COMMENCEMENT]',
        typeOfTriggerAcceleration: '[TYPE OF TRIGGER ACCELERATION]',
        typeOfPrice: '[TYPE OF PRICE]',
        acceptionOption: '[ACCEPTING OPTION]',
        numberOfYears: '[NUMBER OF YEARS]'
    },
    ciiaAgreementData: {
        partyName: '[________]',
        partyEmail: '________',
        partyAddress: '________',
        partyWallet: '________',
        date: '________',
        counterPartyName: '________',
        counterPartyEmail: '________',
        counterPartyAddress: '________',
        counterPartyWallet: '________',
        effectiveDate: '[EFFECTIVE DATE]',
        companyState: '[COMPANY STATE]',
        stateConsultant: '[STATE]',
        typeOfCompanyConsultant: '[TYPE OF COMPANY]',
        title: '[TITLE]',
        datea: '[DATE]',
        idNumberBriefDesc: '[IDENTIFYING NUMBER OR BRIEF DESCRIPTION]',
        stateCompany: '[STATE]',
        typeOfComapny: '[TYPE OF COMPANY]',
        listCompAgreements: '[LIST OF COMPANIES AND/OR AGREEMENTS EXCLUDED UNDER SECTION 10(B)]'
    },
    consultingAgreementData: {
        partyName: '[________]',
        partyEmail: '________',
        partyAddress: '________',
        partyWallet: '________',
        date: '________',
        counterPartyName: '________',
        counterPartyEmail: '________',
        counterPartyAddress: '________',
        counterPartyWallet: '________',
        state: '[STATE]',
        typeOfCompany: '[TYPE OF COMPANY]',
        descriptionConsulting: '[DESCRIPTION CONSULTING SERVICES]',
        serviceRenderChecked: '',
        serviceRender: 'For Services rendered by Consultant under this Agreement, the Company shall pay Consultant at the rate of $____ per hour, payable _______________.  Unless otherwise agreed upon in writing by Company, Company’s maximum liability for all Services performed during the term of this Agreement shall not exceed $____________.',
        consultantChecked: '',
        consultanShall: 'Consultant shall be paid $____________ upon the execution of this Agreement and $____________ upon completion of the Services specified on Exhibit A to this Agreement.',
        companyWillChecked: '',
        companyWillRecommend: 'The Company will recommend that the Board grant a non-qualified option to purchase _______ shares of the Company’s Common Stock, at an exercise price equal to the fair market value (as determined by the Company’s Board of Directors) on the date of grant, and which will vest and become exercisable as follows: \n\n' +
        '____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________\n' +
        '_______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________.\n\n',
        otherChecked: '',
        other: '',
        companiesExcluded: '___',
        listCompanies: ''
    },
    referralAgreementData: {
        partyName: '[________]',
        partyEmail: '________',
        partyAddress: '________',
        partyWallet: '________',
        date: '________',
        counterPartyName: '________',
        counterPartyEmail: '________',
        counterPartyAddress: '________',
        counterPartyWallet: '________',
        typeOfCompany:'[TYPE OF COMPANY]',
        terminationDate: '[TERMINATION DATE]',
        stateOfCompany:'[STATE OF COMPANY]',
        geographicState:'[GEOGRAPHIC SATE]',
        county:'[COUNTY]',
        commision:'[COMMISION]',
        commisionDate:'[COMMISION DATE]'
    },
    saftAgreementData: {
        partyName: '[________]',
        partyEmail: '________',
        partyAddress: '________',
        partyWallet: '________',
        date: '________',
        counterPartyName: '________',
        counterPartyEmail: '________',
        counterPartyAddress: '________',
        counterPartyWallet: '________',
        purchaseAmount: '[PURCHASE AMOUNT]',
        jurisdiction: '[JURISDICTION (NON US)]',
        tokenAmount: '[TOKEN AMOUNT]',
        typeOfCompany: '[TYPE OF COMPANY]',
        discountRate: '[DISCOUNT RATE]',
        website: '[WEBSITE]',
        paymentOption: 'dollar',
        bankName: '',
        address: '',
        aba: '',
        payeeAccount: '',
        payeeAccountName: '',
        ethereum: '',
        bitcoin: ''
    }
}

export const SmartAgreementsReducer = function (
    state: SmartAgreementsState = initialState,
    action: ActionModel
) {
    const { type, payload } = action;

    switch (type) {
        case SmartAgreementsTypes.SET_NDA_AGREEMENT_DATA:
            const newNdaData = payload;
            return {
                ...state,
                ndaAgreementData: {
                    ...state.ndaAgreementData,
                    newNdaData
                }
            };
        case SmartAgreementsTypes.SET_ADVISOR_AGREEMENT_DATA:
            const newAdvisorData = payload;
            return {
                ...state,
                advisorAgreementData: {
                    ...state.advisorAgreementData,
                    ...newAdvisorData
                }
            };
        case SmartAgreementsTypes.SET_CIIA_AGREEMENT_DATA:
            const newCiiaData = payload;
            return {
                ...state,
                ciiaAgreementData: {
                    ...state.ciiaAgreementData,
                    ...newCiiaData
                }
            };
        case SmartAgreementsTypes.SET_CONSULTING_AGREEMENT_DATA:
            const newConsultingData = payload;
            return {
                ...state,
                consultingAgreementData: {
                    ...state.consultingAgreementData,
                    ...newConsultingData
                }
            };
        case SmartAgreementsTypes.SET_REFERRAL_AGEEMENT_DATA:
            const newReferralData = payload;
            return {
                ...state,
                referralAgreementData: {
                    ...state.referralAgreementData,
                    ...newReferralData
                }
            };
        default:
            return { ...state };
    }
}