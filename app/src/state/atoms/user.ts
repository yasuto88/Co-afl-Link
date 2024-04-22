import { User } from '@/interface/types';
import { atom } from 'recoil';

export const userState = atom<User[] | null>({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet(newValue => {
        if (newValue !== null) {
          localStorage.setItem('userData', JSON.stringify(newValue));
        } else {
          localStorage.removeItem('userData');
        }
      });
    },
  ],
});
