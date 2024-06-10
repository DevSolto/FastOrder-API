import multer from "multer"
import { join } from "node:path"

const profile_image_storage_config = multer.diskStorage({
    destination(req, file, callback) {
        const path = join(__dirname, "../", "/storage/profile_images")
        callback(null, path)
    },

    filename(req, file, callback) {
        const extension = file.mimetype.split('/')[1]

        callback(null, file.fieldname + "-" + Date.now() + "." + extension)
    },
})


const profile_image_upload = multer({
    storage: profile_image_storage_config,

    fileFilter(req, file, callback) {
        const file_extension = file.mimetype
        const available_extensions = ["image/jpg", "image/png", "image/jpeg"]

        if (available_extensions.includes(file_extension ?? ""))
            return callback(null, true) //Aceita

        return callback(null, false) //Rejeita
    },
})

export {
    profile_image_upload
}