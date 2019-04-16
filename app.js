var https = require('https');
var express = require('express');
//var subdomain = require('express-subdomain');
var app = express();
var router = express.Router();
var fs = require('fs');
var bp = require('body-parser');

app.use(router);
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


var server = https.createServer({
    key: fs.readFileSync('/mnt/DATOS Linux/Dropbox/Documentos/2019/Projects 2019/Certificado HTTPS/clave_priv.key'),
    cert: fs.readFileSync('/mnt/DATOS Linux/Dropbox/Documentos/2019/Projects 2019/Certificado HTTPS/certificado.crt'),
},app).listen(443,()=>{
    console.info("Servidor Seguro Escuchando ...");
});

app.get('/emit',(req,res)=>{
    res.sendfile('emit.html');
    console.log('Conexion a Pagina de Emision');
});

app.get('/capture',(req,res)=>{
    res.sendfile('recieve.html');
    console.log('Conexión a Pagina de Recepción');
})

var frames = [];
var crfr = 0;
var csfr = 0;

router.get('/upframe',(req,res)=>{
    frames[crfr] = req.query.dtaurl;
    console.log("Rcvd Frame: "+crfr);
    crfr++;
    res.send('OK');
    res.end();
});

router.get('/gfram',(req,res)=>{
    console.log('Snt Frame: '+csfr);
    csfr++;
    res.json({
        fr: frames[csfr],
    });
    res.end();
});