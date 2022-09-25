import cookie from 'cookie'
import { SIDEBAR_WIDTH_KEY } from './constants'
import { InitialSidebarWidth } from "@utils/constants";

// should move to freature or sidebar?
export const getSidebarSettings = (request: Request) => {
    const cookies = cookie.parse(request.headers.get("Cookie") || '') || {}
    const sidebarWidth = cookies[SIDEBAR_WIDTH_KEY] ? Number(cookies[SIDEBAR_WIDTH_KEY]) : InitialSidebarWidth
    return {
        sidebarWidth
    }
}




