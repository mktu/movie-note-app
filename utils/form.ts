export const getFormData = (object: { [key: string]: number | string | null | undefined }) => {
    const formData = new FormData();
    Object.keys(object).forEach(key => {
        if (typeof object[key] !== 'object') formData.append(key, String(object[key]))
        else formData.append(key, JSON.stringify(object[key]))
    })
    return formData;
}