function isBlob(obj: any): obj is Blob {
    return obj instanceof Blob;
}

export const getFormData = (object: { [key: string]: number | string | Blob | boolean | null | undefined }) => {
    const formData = new FormData();
    Object.keys(object).forEach(key => {
        if (object[key] === undefined) return
        const data = object[key]
        if (typeof data !== 'object') formData.append(key, String(data))
        else if (isBlob(data)) {
            formData.append(key, data)
        }
        else formData.append(key, JSON.stringify(data))
    })
    return formData;
}