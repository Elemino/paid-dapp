import ActionModel from '../../models/ActionModel';
import { DialogsActionTypes } from '../actionTypes/dialogs';

const initialState = {
    openSuccessDialog: false,
    successText: ''
};

export const DialogsReducer = (state = initialState, action: ActionModel) => {
    const { type, payload } = action;
    switch (type) {
        case DialogsActionTypes.OPEN_SUCCESS_DIALOG:
            return { ...state, openSuccessDialog: true, successText: payload };
        case DialogsActionTypes.CLOSE_SUCCESS_DIALOG:
            return { ...state, openSuccessDialog: false, successText: '' };
        default:
            return { ...state };
    }
};