import {Nda} from "./nda.html"
import {AdvisorAgreem} from "./advisor-agreem.html"
import {Ciia} from "./ciia.html"
import {ConsultingAgreement} from "./consulting-agreement.html"
import {ReferalAgreement} from "./referral-agreement.html"
import {Saft} from "./saft.html"

enum contractsTemplates {
    TemplateNda = "nda",
    TemplateAdvisorAgreem = "advisoragreement",
    TemplateCiia = "ciia",
    TemplateConsultingAgreement = "consultingagreement",
    TemplateReferalAgreement = "referalagreement",
    TemplateSaft = "saftagreement",
}

interface contractTemplate {
    title: string;
    interpolationFields: Object;
    template: string;
    dataName: string;
}

const findElementsInterpolation = (html:String) : Object => {
    let obj : Object = {}
    let regexExp = /\{\{[a-zA-Z0-9]+\}\}/gi
    html.match(regexExp)?.forEach(element => {
        let value = element.replace(/[^a-z0-9]/gi,"")
        obj[value] = ""
    });
    return obj
}  

export const getContractTemplate = (contractName:String) :contractTemplate => {
    let contractTemplate;
    let title;
    let dataName = '';
    try {
        switch (contractName) {
            case contractsTemplates.TemplateNda:
                title = 'MUTUAL NONDISCLOSURE AGREEMENT';
                contractTemplate = Nda;
                dataName = 'ndaAgreementData';
                break;
        
            case contractsTemplates.TemplateAdvisorAgreem:
                title = 'ADVISOR AGREEMENT';
                contractTemplate = AdvisorAgreem;
                dataName = 'advisorAgreementData';
                break;
        
            case contractsTemplates.TemplateCiia:
                title = 'CONFIDENTIAL INFORMATION AND INVENTION ASSIGNMENT AGREEMENT';
                contractTemplate = Ciia;
                dataName = 'ciiaAgreementData';
                break;
        
            case contractsTemplates.TemplateConsultingAgreement:
                title = 'CONSULTING AGREEMENT';
                contractTemplate = ConsultingAgreement;
                dataName = 'consultingAgreementData';
                break;
        
            case contractsTemplates.TemplateReferalAgreement:
                title = 'SALES COMMISSION AGREEMENT';
                contractTemplate = ReferalAgreement;
                dataName = 'referralAgreementData';
                break;
        
            case contractsTemplates.TemplateSaft:
                title = 'SIMPLE AGREEMENT FOR FUTURE TOKENS';
                contractTemplate = Saft;
                dataName = 'saftAgreementData';
                break;
        
            default:
                throw new Error("No template Found");
        }
        return {
            title,
            interpolationFields: findElementsInterpolation(contractTemplate),
            template: contractTemplate,
            dataName
        };
    } catch (error) {
        throw error;
    }
}