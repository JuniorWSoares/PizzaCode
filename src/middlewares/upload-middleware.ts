import multer from "multer"
import path from "node:path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/uploads"))
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}${path.extname(file.originalname)}`
        cb(null, filename)
    }
})

export const upload = multer({storage: storage})