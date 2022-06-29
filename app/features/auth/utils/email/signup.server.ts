import type { SessionStorage } from "@remix-run/server-runtime"
import { Strategy } from "remix-auth"
import type { AuthenticateOptions } from "remix-auth"
import type { AuthUserType } from "@utils/auth/auth.server"
import { AuthError } from "@utils/exceptions"


type VerifyParams = {
    email: string,
    password: string
}

export default class EmailSignupStrategy extends Strategy<AuthUserType, VerifyParams> {
    name: string = 'email-signup'
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
        //const { user } = await this.supabaseAdmin.auth.signUp({ email, password })
        try {
            const user = await this.verify({ email, password })
            return await this.success(user, request, sessionStorage, options);
        }catch(e){
            if(e instanceof AuthError){
                throw e
            }
            console.error(e)
            return this.failure('failed to signup', request, sessionStorage, options)
        }
        
    }
}