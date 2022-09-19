const getSearchParam = (request: Request, key: string) => {
    const url = new URL(request.url);
    return url.searchParams.get(key);
}

const getSearchParamAsBoolean = (request: Request, key: string) => {
    const value = getSearchParam(request, key)
    return value === 'true'
}

export {
    getSearchParamAsBoolean,
    getSearchParam
}