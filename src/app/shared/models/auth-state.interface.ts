import { ICurrentUser } from './current-user.interface';
import { IBackendErrors } from './backend-errors.interface';

export interface IAuthState {
  isSubmitting: boolean;
  isLoading: boolean;
  currentUser: ICurrentUser | null;
  isLoggedIn: boolean | null;
  validationErrors: IBackendErrors | null;
}
