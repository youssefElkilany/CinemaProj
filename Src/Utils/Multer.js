import multer from 'multer'


export const fileValidation = {
    image: ['image/jpeg', 'image/png', 'image/gif','image/jpg','image/JPG'],
    file: ['application/pdf', 'application/msword'],
    video: ['video/mp4','Video/mp4',"video/Wmv","video/mpeg","video/ogg","audio/mp4"],
    media:['image/jpeg', 'image/png', 'image/gif','image/jpg','image/JPG','video/mp4',"video/Wmv","video/mpeg","video/ogg","audio/mp4"]
}

export function fileUpload(customValidation = []) {
    const storage = multer.diskStorage({})
    function fileFilter(req, file, cb) {
        if (customValidation.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb('In-valid file format', false)
        }
    }
    const upload = multer({ fileFilter, storage })
    return upload
}