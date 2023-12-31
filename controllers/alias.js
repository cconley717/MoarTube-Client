const { 
    logDebugMessageToConsole
} = require('../utils/helpers');
const { 
    node_isAuthenticated, node_getAliaserCaptcha
} = require('../utils/node-communications');


function captcha_GET(req, res) {
    const jwtToken = req.session.jwtToken;
    
    node_isAuthenticated(jwtToken)
    .then(nodeResponseData => {
        if(nodeResponseData.isError) {
            logDebugMessageToConsole(nodeResponseData.message, null, new Error().stack, true);
            
            res.send({isError: true, message: 'error communicating with the MoarTube node'});
        }
        else {
            if(nodeResponseData.isAuthenticated) {
                node_getAliaserCaptcha(jwtToken)
                .then(nodeResponseData => {
                    /*
                    the node's response will be either JSON or a PNG image
                    JSON if there's an error to report (namely an unconfigured node)
                    PNG image is captcha if node has been configured
                    */
                    if(nodeResponseData.headers['content-type'].includes('application/json')) {
                        let data = '';
                        
                        nodeResponseData.on('data', function(chunk) {
                            data += chunk;
                        });
                        
                        nodeResponseData.on('end', function() {
                            try {
                                const jsonData = JSON.parse(data);
                                res.send(jsonData);
                            }
                            catch (error) {
                                logDebugMessageToConsole(null, error, new Error().stack, true);

                                res.send({isError: true, message: 'error communicating with the MoarTube node'});
                            }
                        });
                    }
                    else {
                        res.setHeader('Content-Type', 'image/png');
                        nodeResponseData.pipe(res);
                    }
                })
                .catch(error => {
                    logDebugMessageToConsole(null, error, new Error().stack, true);
                    
                    res.send({isError: true, message: 'error communicating with the MoarTube node'});
                });
            }
            else {
                logDebugMessageToConsole('unauthenticated communication was rejected', null, new Error().stack, true);

                res.send({isError: true, message: 'you are not logged in'});
            }
        }
    })
    .catch(error => {
        logDebugMessageToConsole(null, error, new Error().stack, true);
        
        res.send({isError: true, message: 'error communicating with the MoarTube node'});
    });
}

module.exports = {
    captcha_GET
}