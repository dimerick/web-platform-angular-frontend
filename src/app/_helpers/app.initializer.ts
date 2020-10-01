import { AuthService } from '../services/auth.service';

export function appInitializer(authservice: AuthService) {
    return () => new Promise(resolve => {
        // attempt to refresh token on app start up to auto authenticate
        console.log("app initializer");
        authservice.refreshToken().subscribe().add(resolve);;
    });
}