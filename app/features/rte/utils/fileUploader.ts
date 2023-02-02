import { isMimeType } from '@lexical/utils';

const ACCEPTABLE_IMAGE_TYPES = [
    'image/',
    'image/heic',
    'image/heif',
    'image/gif',
    'image/webp',
    'image/png'
];

export const uploadFile = async (file: File) => {
    if (!isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
        return
    }
    const formData = new FormData();
    formData.append("image", file);

    const param = {
        method: "PUT",
        body: formData,
    }
    const res = await fetch("/api/notes/images", param)
    const json = await res.json<{ path: string }>()
    return {
        altText: file.name,
        src: json.path
    }
}