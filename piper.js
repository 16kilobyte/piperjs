const http= require('http')
const path = require('path')
const fs = require('fs')

class Piper {
    constructor() {
        console.log('Piper')
        this.routes = {}
    }

    _createServer(callback) {
        return http.createServer((req, res) => {
            callback(req, res)
        })
    }

    listen(port= '8080', bindAddress= '127.0.0.1', callback= ()=> {}) {
        this._createServer((req, res) => {
            req.method = req.method.toLowerCase()
            Object.keys(this.routes).forEach((key) => {
                const routeArray= this.routes[key]
                if(req.method === key) {
                    routeArray.forEach((route, i) => {
                        if(route[0] === req.url) {
                            let next = null, cb= route[1], status = 200
                            res.status = (statusCode = 200)=> {
                                status = statusCode
                                return res
                            }
                            res.json = (jsonObj) => {
                                res.writeHead(status, {
                                    'Content-Type': 'application/json'
                                })
                                return res.end(JSON.stringify(jsonObj))
                            }
                            res.html = (html) => {
                                res.writeHead(status, {
                                    'Content-Type': 'text/html'
                                })
                                return res.end(html)
                            }
                            res.css = (css) => {
                                res.writeHead(status, {
                                    'Content-Type': 'text/stylesheet'
                                })
                                return res.end(css)
                            }
                            res.js = (js) => {
                                res.writeHead(status, {
                                    'Content-Type': 'application/javascript'
                                })
                                return res.end(js)
                            }
                            res.send = (param1, param2)=> {
                                if(typeof param1 === 'object') {
                                    res.writeHead(param1)
                                    res.send(param2)
                                } else {
                                    res.writeHead
                                }
                                res.writeHead()
                            }
                            cb(req, res, next)
                            return
                        }
                    })
                    return
                }
            })
        }).listen(port, bindAddress)
        callback()
    }

    static router() {
        const routes = {
            'get': [], 'post': [], 'put': [], 'delete': []
        }
        return {
            get: (route, cb)=> {
                routes.get.push([route, cb])
            },
            routes
        }
    }

    middleware(middleware = './middlewares') {
        try {
            
        } catch (e) {

        }
    }

    routes(routeFiles) {

    }

    apply(router = './routes') {
        try {
            if(typeof router === 'object') {
                this.routes = router.routes
            } else if (typeof router === 'string' && fs.existsSync(router)) {
                fs
                .readdirSync(path.resolve(router))
                .filter((file) => {
                    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js')
                })
                .forEach((file) => {
                    let _route = require(path.resolve(router, file))
                    if(Object.keys(_route).length > 0 && _route.constructor === Object) {
                        console.log(_route.routes);
                        this.apply(_route)
                    }
                })
            } else {
                throw new Error('Invalid or no route files specified')
            }
        } catch(e) {
            console.log(e.message)
        }
    }
}

module.exports= Piper
