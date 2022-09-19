import type * as localstorage from "@utils/localstorage";

type LocalstorageType = typeof localstorage

const storage: LocalstorageType = {
    getSidebarWidth: () => 0,
    saveSidebarWidth: () => { },
    saveVisibleSidebarWidth: () => { },
    getVisibleSidebarWidth: () => 0,
    isKvDisabled: () => false,
    setKvDisabled: () => { }
}

export default storage