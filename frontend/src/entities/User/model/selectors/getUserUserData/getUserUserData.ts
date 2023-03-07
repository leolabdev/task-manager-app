import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserUserData = (state: StateSchema) => state.user.user;
