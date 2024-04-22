import { User } from '@/interface/types';
import { atom } from 'recoil';

export const filteredUserState = atom<User[] | null>({
  key: 'filteredUserState',
  default: null,
});