import React, { FC } from 'react';
import AdvisorAgreementForm from './AdvisorAgreementForm';
import CiiaAgreementForm from './CiiaAgreementForm';
import ConsultingAgreementForm from './ConsultingAgreementForm';
import ReferralAgreementForm from './ReferralAgreementForm';
import SaftAgreementForm from './SaftAgreementForm';

interface SmartAgreementsFormProps {
    type: string,
    onClose: any
};

const SmartAgreementsForm: FC<SmartAgreementsFormProps> = ({ type, onClose }) => {
    const mapTypeToComponent = new Map([
        ['advisoragreement', <AdvisorAgreementForm onClose={onClose} />],
        ['ciia', <CiiaAgreementForm onClose={onClose} />],
        ['consultingagreement', <ConsultingAgreementForm onClose={onClose} />],
        ['referalagreement', <ReferralAgreementForm onClose={onClose} />],
        ['saftagreement', <SaftAgreementForm onClose={onClose} />]
    ]);
    return (<>
     {
         mapTypeToComponent.get(type) ??
         <span>Not found Smart Agreement form</span>
     }
    </>);
}

export default SmartAgreementsForm;