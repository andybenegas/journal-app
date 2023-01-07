import { ReportGmailerrorred } from "@mui/icons-material";

export const initialState = {
    status:'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
};

export const authenticatedState = {
    status:'authenticated',
    uid: '123456',
    email: 'demo@google.com',
    displayName: 'Andrés',
    photoURL: 'https://demo.jpg',
    errorMessage: null,
};

export const notAuthenticatedState = {
    status:'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
};

export const demoUser = {
    uid: 'ABC123',
    email: 'user@gmail.com',
    displayName: 'User123',
    photoURL: 'https://user.jpg',
};
