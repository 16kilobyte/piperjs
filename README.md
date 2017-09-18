# PiperJs
Modern Light-weight web server framework

## Dependencies
- NodeJs

## Install via NPM
```shell
npm install piperjs --save
```

## Usage
After you have installed __PiperJs__, you can include __PiperJs__ into your project entry file by
```javascript
const Piper = require('piperjs')
```
#### Create Server
To create a PiperJs server, simply instantiate the included PiperJs object
```javascript
const app = new Piper()

// Use controllers as in the ./controllers folder as routes
app.apply('./controllers') // Could be any folder containing your route files
p.listen(port, bindAddress, () => {
    console.info(`Listening on port ${bindAddress}:${port}`)
})
```
You have to create your controllers as though they are `express ` routes.

An example route in the `./controllers` folder could be

```javascript
const router = require('piperjs').router()

router.get('/', function(req, res, next) {
    res.end('The Piper')
    return
})

router.get('/hi', function(req, res, next) {
    res.end('The Piper says Hi!')
    return
})

router.get('/json', function(req, res, next) {
    res.status(200).json({message: 'The piper sends json'})
    return
})

module.exports= router
```

### `req`
The request object is

### `res`
The response object containers the following methods exposed
###### `.status([integer])`
For specifying server response code

###### `.html([string])`
For return `html` content. The default server response code is 200
Example
```javascript
router.get('/html', function(req, res) {
    res.html('<strong>Hello, PiperJs</strong>')
})
```
###### `.css([string])`, `.js([string])`
