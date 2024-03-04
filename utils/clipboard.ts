const copyToClipBoardByExecCommand = (value: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();
    const ret = document.execCommand("copy");
    document.body.removeChild(textArea);
    return ret
}

export const copyToClipBoard = (value: string, onSucceeded: () => void) => {
    if (navigator && navigator.clipboard) {
        navigator.clipboard.writeText(value).then(() => {
            onSucceeded()
        });
    } else {
        if (copyToClipBoardByExecCommand(value)) {
            onSucceeded()
        }
    }
}