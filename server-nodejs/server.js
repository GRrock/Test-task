const http = require('http');
const url = require('url');

http.createServer((request, response) => {
    let urlReq = url.parse(request.url, true)
    response.writeHead(200, {'Access-Control-Allow-Origin': '*'});
    if (request.method == 'GET') {
        try{
        let host = urlReq.query.url.split('//');
        host = host[1].split('/', 1);
        let path = urlReq.query.url.split(host)
        host = host[0]
        path = path[1]

        let options = {
            host: host,
            path: path,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
            let req = http.request(options);

            req.on('response', function (res) {
                let body = ''
                res.on('data', function (chunk) {
                    body += chunk;
                })
                res.on('end', function () {
                    let resp = JSON.parse(body)
                    response.writeHead(200, {'Access-Control-Allow-Origin': '*'});
                    response.end(JSON.stringify(resp.data));
                })
            })
            req.end();
        }
        catch (err){
            response.writeHead(404, {'Access-Control-Allow-Origin': '*'});
            response.end();
        }
    } else {
         response.end();
    }
}).listen(5000, () => console.log('сервер запущен'))