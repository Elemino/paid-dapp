import React, { FC } from 'react';
import AdvisorAgreementForm from './AdvisorAgreementForm';
import ReferralAgreementForm from './ReferralAgreementForm';

interface SmartAgreementsFormProps {
    type: string,
    onClose: any
};

const SmartAgreementsForm: FC<SmartAgreementsFormProps> = ({ type, onClose }) => {
    const mapTypeToComponent = new Map([
        ['advisoragreement', <AdvisorAgreementForm onClose={onClose} />],
        ['referalagreement', <ReferralAgreementForm onClose={onClose} />]
    ]);
    return (<>
     {
         mapTypeToComponent.get(type) ??
         <span>Not found Smart Agreement form</span>
     }
    </>);
}

export default SmartAgreementsForm;