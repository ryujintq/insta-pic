import ErrorResponse from './errorResponse.js';
import { noImage } from './errors.js';
import getStorageBucket from './getStorageBucket.js'

const bucket = getStorageBucket()

const getPublicUrl = fileName => {
    return 'https://storage.googleapis.com/' + bucket.name + '/' + fileName;
}

const uploadImage = (req, res, next) => {
    if (!req.file) return next(noImage())


    const gcsname = req.body.folder + '/' + Date.now() + '-' + req.file.originalname.replace(' ', '_')
    const file = bucket.file(gcsname)

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    })

    stream.on('error', err => {
        req.file.cloudStorageError = err
        next(err)
    })

    stream.on('finish', () => {
        req.file.cloudStorageObject = gcsname
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
        next()
    })

    stream.end(req.file.buffer)

    req.url = getPublicUrl(gcsname)
}

export default uploadImage
