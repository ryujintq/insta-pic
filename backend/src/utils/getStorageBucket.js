import { Storage } from '@google-cloud/storage'
import path from 'path'

const __dirname = path.resolve(path.dirname(''))

const getStorageBucket = () => {
    const storage = new Storage({
        keyFilename: path.join(__dirname, `${process.env.GOOGLE_STORAGE_KEY}`),
        projectId: process.env.GOOGLE_PROJECT_ID
    })

    const bucket = storage.bucket(process.env.IMAGE_BUCKET_NAME)

    return bucket
}

export default getStorageBucket
