import { AccessToken, Credentials, User, 
    UserSessionToken
 } from "./user.resource"; 
 import { jwtDecode } from "jwt-decode";

 class AuthenticationService {

    baseUrl: string = process.env.NEXT_PUBLIC_API_URL + '/v1/users';

    static AUTH_PARAM: string = "_auth";

    async authenticate(credentials: Credentials): Promise<UserSessionToken> {
        const response = await fetch(`${this.baseUrl}/auth`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json"
            }
        });
       
        if(response.status === 401) {
            throw new Error("Invalid credentials");
        }

        return await response.json();

    }


    async save(user: User) : Promise<void> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(response.status === 409) {
            const responseError = await response.json();
            throw new Error(responseError.error);
        }
        
    }

    initSession(token: AccessToken) {
        if(token.accessToken) {
            const decodedToken: any = jwtDecode(token.accessToken);

            const userSessionToken: UserSessionToken = {
                accessToken: token.accessToken,
                email: decodedToken.sub,
                name: decodedToken.name,
                expiration: decodedToken.exp 
            }

            this.setUserSession(userSessionToken);

        }
    }


    setUserSession(userSessionToken: UserSessionToken) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(AuthenticationService.AUTH_PARAM, JSON.stringify(userSessionToken));
        }
    }


    
    getUserSession(): UserSessionToken | null {
        if (typeof window !== 'undefined') {
          const authString = localStorage.getItem(AuthenticationService.AUTH_PARAM);

          if (!authString) {
            return null;
          }

          return JSON.parse(authString);
        }
        
        return null;
    }


    isSessionValid(): boolean {
        if (typeof window === 'undefined') {
          return false; 
        }

        const userSession = this.getUserSession();

        if (!userSession) {
          return false;
        }

        const expiration = userSession.expiration;

        if (expiration) {
          const expirationDateInMillis = expiration * 1000;
          return new Date() < new Date(expirationDateInMillis);
        }

        return false;
    }


    invalidateSession() {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(AuthenticationService.AUTH_PARAM);
        }
    }

 }

 export const useAuth = () => new AuthenticationService();