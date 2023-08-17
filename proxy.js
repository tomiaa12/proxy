import http from "http";
import httpProxy from "http-proxy";
const server = http.createServer(); // 创建服务器
var proxy = httpProxy.createProxyServer({});

// proxy.on('proxyReq', (proxyReq, req, res, options) => {
//   proxyReq.setHeader('Authorization', 'xxx');
// });

server
  .on("request", (req, res) => {
    try{
      const origin = req.url.match(/(?<=\/proxy\/)[^\/]+/)?.[0];
      if (origin) {
        let url = req.url.replace("/proxy/", "");
        proxy.web(req, res, {
          target: `http://${url}`,
          changeOrigin: true,
        });
      } else {
        res.end();
      }
    }catch(e){
      console.log('err',e)
    }
  })
  .listen(6666);
