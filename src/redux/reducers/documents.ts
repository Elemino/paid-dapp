import { DocumentsActionTypes } from '../actionTypes/documents';

const initialState = {
	loading: false,
	error: null,
	creatingAgreement: false,
	documentsFrom: [],
	documentsTo: [],
	selectedDocument: null,
	agreementTypes: [
		{
			code: 'nda',
			name: 'Mutual-NDA'
		},
		{
			code: 'advisorAgreement',
			name: 'Advisor'
		},
		{
			code: 'ciia',
			name: 'CIIA'
		},
		{
			code: 'consultingAgreement',
			name: 'Consulting'
		},
		{
			code: 'referalAgreement',
			name: 'Referral'
		},
		{
			code: 'saftAgreement',
			name: 'SAFT'
		}
	],
	agreementFormInfo: {
		email: '',
		confirmEmail: '',
		name: '',
		address: '',
		phone: '',
		counterpartyEmail: '',
		counterpartyConfirmEmail: '',
		counterpartyWallet: '',
		counterpartyName: '',
		counterpartyAddress: '',
		counterpartyPhone: '',
		createdAt: null
	},
	keepMyInfo: false
};

export const DocumentsReducer = function (state = initialState, action: any) {
	const { type, payload } = action;
	switch (type) {
		case DocumentsActionTypes.GET_DOCUMENTS_LOADING:
			return { ...state, loading: true };

		case DocumentsActionTypes.GET_DOCUMENTS_SUCCESS:
			return { ...state, documentsFrom: payload.from, documentsTo: payload.to, loading: false };

		case DocumentsActionTypes.GET_DOCUMENTS_FAILURE:
			return { ...state,  documentsFrom: [], documentsTo: [], error: payload, loading: false };

		case DocumentsActionTypes.UPLOAD_DOCUMENTS_LOADING:
			return { ...state, loading: true };

		case DocumentsActionTypes.UPLOAD_DOCUMENTS_SUCCESS: {
			return { ...state, loading: false };
		}

		case DocumentsActionTypes.UPLOAD_DOCUMENTS_FAILURE:{
			return { ...state, documentsFrom: [], documentsTo: [], error: payload, loading: false };
		}

		case DocumentsActionTypes.COUNTERPARTY_SIGNED_LOADING: {
			return { ...state, loading: true };
		}

		case DocumentsActionTypes.COUNTERPARTY_SIGNED_SUCCESS: {
			return { ...state, showVerified: true, selectedDocument: payload, loading: false };
		}

		case DocumentsActionTypes.COUNTERPARTY_SIGNED_FAILURE: {
			return { ...state, error: payload, loading: false  };
		}

		case DocumentsActionTypes.COUNTERPARTY_REJECT_SIGNED_LOADING: {
			return { ...state, loading: true };
		}

		case DocumentsActionTypes.COUNTERPARTY_REJECT_SIGNED_SUCCESS: {
			return { ...state, showVerified: true, selectedDocument: payload, loading: false };
		}

		case DocumentsActionTypes.COUNTERPARTY_REJECT_SIGNED_FAILURE: {
			return { ...state, error: payload, loading: false  };
		}

		case DocumentsActionTypes.GET_SELECTED_DOCUMENT_LOADING: {
			return { ...state, loading: true };
		}

		case DocumentsActionTypes.GET_SELECTED_DOCUMENT_SUCCESS: {
			return { ...state, showVerified: true, selectedDocument: payload, loading: false };
		}

		case DocumentsActionTypes.SET_AGREEMENT_FORM_INFO: {
			let info = {
				...state.agreementFormInfo,
				...payload
			};
			
			return { ...state, agreementFormInfo: info };
		}

		case DocumentsActionTypes.CREATE_AGREEMENT_LOADING: {
			return { ...state, loading: true, creatingAgreement: true };
		}

		case DocumentsActionTypes.CREATE_AGREEMENT_SUCCESS: {
			return { ...state, loading: false, creatingAgreement: false };
		}

		case DocumentsActionTypes.CREATE_AGREEMENT_FAILURE:
			return {
				...state,
				error: payload,
				loading: false,
				creatingAgreement: false
			};
		case DocumentsActionTypes.SET_KEEP_MY_INFO:
			return {
				...state,
				loading: true,
			};
		case DocumentsActionTypes.SET_KEEP_MY_INFO_SUCCESS:
			return {
				...state,
				keepMyInfo: payload,
				loading: false
			}
		case DocumentsActionTypes.SET_KEEP_MY_INFO_FAILURE:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};
