import { atom } from 'recoil';

export const loginAtom = atom<boolean>({
    key: 'login',
    default: false,
});