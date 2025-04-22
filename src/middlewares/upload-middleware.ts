import multer from "multer";
import path from "node:path";

// Configura o armazenamento dos arquivos utilizando o diskStorage do multer.
const storage = multer.diskStorage({
    // Define o diretório de destino onde os arquivos serão armazenados.
    destination: (req, file, cb) => {
        // O caminho é definido como "../../public/uploads" relativo ao diretório atual.
        cb(null, path.join(__dirname, "../../public/uploads"))
    },
    // Define o nome do arquivo armazenado.
    filename: (req, file, cb) => {
        // O nome do arquivo será composto pelo timestamp atual e a extensão original do arquivo.
        const filename = `${Date.now()}${path.extname(file.originalname)}`
        cb(null, filename)
    }
})

// Exporta o middleware de upload configurado com o armazenamento definido.
export const upload = multer({ storage: storage })