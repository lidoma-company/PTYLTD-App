type FormDataConvertible =
    | string
    | number
    | boolean
    | null
    | undefined
    | File
    | Blob
    | FormDataConvertible[]
    | { [key: string]: FormDataConvertible };

export default function objectToFormData(
    obj: FormDataConvertible,
    formData: FormData = new FormData(),
    parentKey?: string,
): FormData {
    if (obj === null || obj === undefined) {
        return formData;
    }

    // اگر فایل یا Blob بود
    if (obj instanceof File || obj instanceof Blob) {
        if (!parentKey) {
            throw new Error('parentKey is required for File or Blob');
        }
        formData.append(parentKey, obj);
        return formData;
    }

    // اگر آرایه بود
    if (Array.isArray(obj)) {
        obj.forEach((value, index) => {
            const key = parentKey ? `${parentKey}[${index}]` : String(index);
            objectToFormData(value, formData, key);
        });
        return formData;
    }

    // اگر آبجکت بود
    if (typeof obj === 'object') {
        Object.entries(obj).forEach(([key, value]) => {
            const formKey = parentKey ? `${parentKey}[${key}]` : key;
            objectToFormData(value, formData, formKey);
        });
        return formData;
    }

    // مقادیر ساده
    if (!parentKey) {
        throw new Error('parentKey is required for primitive values');
    }

    formData.append(parentKey, String(obj));
    return formData;
}