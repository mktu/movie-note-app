export const copyToClipBoard = (value: string, onSucceeded: () => void) => {
    if (navigator && navigator.clipboard) {
        navigator.clipboard.writeText(value).then(() => {
            onSucceeded()
        });
    }
}