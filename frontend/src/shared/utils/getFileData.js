// ----------------------------------------------------------------------

export default function getFileData(file, index) {
    if (typeof file === 'string') {
        return {
            key: index ? `${file}-${index}` : file,
            preview: file,
        };
    }

    return {
        key: index ? `${file.name}-${index}` : file.name,
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        name: file.name,
        path: file.path,
        preview: file.preview,
        size: file.size,
        type: file.type,
    };
}
