const https = require('https');
const http = require('http');

exports.handler = async function(event, context) {
  // Only allow POST requests for login
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const targetUrl = 'http://35.92.149.12:8000/api/auth/login/';

  try {
    const response = await new Promise((resolve, reject) => {
      const req = http.request(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }, (res) => {
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
        reject(error);
      });

      req.write(event.body);
      req.end();
    });

    return {
      statusCode: response.statusCode,
      body: response.body,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to proxy request' })
    };
  }
}; 