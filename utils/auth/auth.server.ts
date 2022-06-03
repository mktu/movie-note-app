import { Authenticator } from "remix-auth";
import * as sessionStorage from "@utils/auth/session";


const authenticator = new Authenticator(sessionStorage)
export default authenticator