const express = require('express');
const app = express();
const path = require('path');

// Importe o arquivo api.ts
const api = require('./api');

const frontendBuildPath = path.join(__dirname, '../../frontend/build');

app.use('/static', express.static(path.join(frontendBuildPath, 'static')));
app.get('/', (req: any, res: any) => {
  const indexPath = path.join(frontendBuildPath, 'index.html');
  console.log('Sending index.html from path:', indexPath);
  res.sendFile(indexPath);
});

app.use('/api', api);

app.listen(process.env.PORT || 8080, () => {
  console.log(`running on port: ${process.env.PORT || 8080}`);
});
