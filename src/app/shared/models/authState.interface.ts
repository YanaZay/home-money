import { ICurrentUser } from './currentUser.interface';
import { IBackendErrors } from './backendErrors.interface';

export interface IAuthState {
  isSubmitting: boolean;
  currentUser: ICurrentUser | null;
  isLoggedIn: boolean | null;
  validationErrors: IBackendErrors | null;
}
