import type { SessionStorage } from "@remix-run/server-runtime"
import { Strategy } from "remix-auth"
import type { AuthenticateOptions } from "remix-auth"
import type { AuthUserType } from "@utils/auth/auth.server"


type VerifyParams = {
    email: string,
    password: string
}

export default class EmailSigninStrategy extends Strategy<AuthUserType, VerifyParams> {
    name: string = 'email-signin'
    async authenticate(request: Request, sessionStorage: SessionStorage, options: AuthenticateOptions) {
        let _a;
        const session = await sessionStorage.getSession(request.headers.get("Cookie"));
        const userFromSession = (_a = session.get(options.sessionKey)) !== null && _a !== void 0 ? _a : null;
        // User is already authenticated
        if (userFromSession) {
            return this.success(userFromSession, request, sessionStorage, options);
        }
        const formData = await request.formData();
        const email = (formData.get("email") || '') as string;
        const password = (formData.get("password") || '') as string;
        const user = await this.verify({ email, password })
        if(user){
            return await this.success(user, request, sessionStorage, options);
        }
        return this.failure('failed to signin', request, sessionStorage, options)
    }
}