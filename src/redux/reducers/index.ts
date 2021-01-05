// @ts-ignore
import { combineReducers } from '@reduxjs/toolkit';
// @ts-ignore
import { WalletReducer } from './wallet';
import { AuthReducer } from './auth';
import { DocumentsReducer } from './documents';
import { DialogsReducer } from './dialogs';

// @ts-ignore
const rootReducer = combineReducers({
    wallet: WalletReducer,
    auth: AuthReducer,
    documents: DocumentsReducer,
    dialogs: DialogsReducer
});

// @ts-ignore
export type RootState = ReturnType<typeof rootReducer>;
// @ts-ignore
export default rootReducer;
