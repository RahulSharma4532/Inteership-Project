const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
};

function request(method, path, data) {
    return new Promise((resolve, reject) => {
        const reqOptions = { ...options, method, path };
        const req = http.request(reqOptions, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, body: body ? JSON.parse(body) : {} });
                } catch (e) {
                    resolve({ status: res.statusCode, body });
                }
            });
        });
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function runTests() {
    try {
        console.log('--- Testing GET /books ---');
        let res = await request('GET', '/books');
        console.log('Status:', res.status);
        console.log('Body:', res.body);

        console.log('\n--- Testing POST /books ---');
        res = await request('POST', '/books', { title: 'New Book', author: 'New Author' });
        console.log('Status:', res.status);
        console.log('Body:', res.body);
        const newBookId = res.body.id;

        console.log('\n--- Testing PUT /books/:id ---');
        res = await request('PUT', `/books/${newBookId}`, { title: 'Updated Title' });
        console.log('Status:', res.status);
        console.log('Body:', res.body);

        console.log('\n--- Testing DELETE /books/:id ---');
        res = await request('DELETE', `/books/${newBookId}`);
        console.log('Status:', res.status);
        console.log('Body:', res.body);

        console.log('\n--- Testing GET /books again to verify deletion ---');
        res = await request('GET', '/books');
        console.log('Status:', res.status);
        console.log('Body:', res.body);

    } catch (error) {
        console.error('Test failed:', error);
    }
}

// Wait for server to start
setTimeout(runTests, 2000);
