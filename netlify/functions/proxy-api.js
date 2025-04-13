const https = require('https');
const http = require('http');
const url = require('url');

exports.handler = async function(event, context) {
  // Only allow POST requests for login
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const targetUrl = url.parse('http://35.92.149.12:8000/api/auth/login/');
  
  try {
    const response = await new Promise((resolve, reject) => {
      const options = {
        hostname: targetUrl.hostname,
        port: targetUrl.port || 8000,
        path: targetUrl.path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Content-Length': Buffer.byteLength(event.body)
        }
      };

      const req = http.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            body: body,
            headers: res.headers
          });
        });
      });

      req.on('error', (error) => {
        console.error('Error in proxy request:', error);
        reject(error);
      });

      // Write the request body
      req.write(event.body);
      req.end();
    });

    return {
      statusCode: response.statusCode,
      body: response.body,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Accept',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    };
  } catch (error) {
    console.error('Proxy error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to proxy request',
        details: error.message 
      })
    };
  }
}; 