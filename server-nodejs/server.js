const http = require('http');
const url = require('url');

http.createServer((request, response) => {
    let url = request.url;
    const header = { 'Access-Control-Allow-Origin': '*' };

    if (request.method == 'GET') {
        try {
            let host = url.split('//');
            host = host[1].split('/', 1);
            let path = url.split(host)
            host = host[0]
            path = path[1]
            // config
            let options = {
                host: host,
                path: path,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            // запрос по url
            let req = http.request(options);

            req.on('error', (err) => {
                response.writeHead(400, header);
                response.end(JSON.stringify(err));
            })

            req.on('response', function (res) {
                let body = '';

                res.on('error', (err) => {
                    response.writeHead(400, header);
                    response.end(JSON.stringify(err));
                })
                res.on('data', function (chunk) {
                    body += chunk;
                })
                res.on('end', function () {
                    try {
                        let resp = JSON.parse(body)
                        response.writeHead(200, header);
                        response.end(JSON.stringify(resp.data));
                    } catch (err) {
                        response.writeHead(400, header);
                        response.end(JSON.stringify(err));
                    }
                })
            })

            req.end();
            
        } catch (error) {
            response.writeHead(400, header);
            response.end(JSON.stringify(error));
        }

    } else {
        response.writeHead(200, header);
        response.end();
    }
}).listen(5000, () => console.log('сервер запущен'))