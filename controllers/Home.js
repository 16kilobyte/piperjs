const router = require('../piper').router()

router.get('/', (req, res, next) => {
    res.end('The Piper')
    return
})

router.get('/hi', (req, res, next) => {
    res.end('The Piper says Hi!')
    return
})

router.get('/json', (req, res, next) => {
    res.status(200).json({message: 'The piper sends json'})
    return
})

module.exports= router
