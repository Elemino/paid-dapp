import AdvisorAgreementData from "../../models/AdvisorAgreementData";
import CiiaAgreementData from "../../models/CiiaAgreementData";
import ConsultingAgreementData from "../../models/ConsultingAgreementData";
import NdaAgreementData from "../../models/NdaAgreementData";
import ReferralAgreementData from "../../models/ReferralAgreementData";
import SaftAgreementData from "../../models/SaftAgreementData";
import { SmartAgreementsTypes } from "../actionTypes/smartAgreements";

export const doSetNdaAgreementData = (payload: NdaAgreementData) => (dispatch: any) => {
    dispatch({
        type: SmartAgreementsTypes.SET_NDA_AGREEMENT_DATA,
        payload
    });
}

export const doSetAdvisorAgreementData = (payload: AdvisorAgreementData) => (dispatch: any) => {
    dispatch({
        type: SmartAgreementsTypes.SET_ADVISOR_AGREEMENT_DATA,
        payload
    });
}

export const doSetCiiaAgreementData = (payload: CiiaAgreementData) => (dispatch: any) => {
    dispatch({
        type: SmartAgreementsTypes.SET_CIIA_AGREEMENT_DATA,
        payload
    });
}

export const doSetConsultingAgreementData = (payload: ConsultingAgreementData) => (dispatch: any) => {
    dispatch({
        type: SmartAgreementsTypes.SET_CONSULTING_AGREEMENT_DATA,
        payload
    });
}

export const doSetReferralAgreementData = (payload: ReferralAgreementData) => (dispatch: any) => {
    dispatch({
        type: SmartAgreementsTypes.SET_REFERRAL_AGEEMENT_DATA,
        payload
    });
}

export const doSetSaftAgreementData = (payload: SaftAgreementData) => (dispatch: any) => {
    dispatch({
        type: SmartAgreementsTypes.SET_SAFT_AGEEMENT_DATA,
        payload
    });
}