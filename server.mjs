import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const port = process.env.PORT || 3000;
const mapKey = process.env.YOUR_API_KEY;
const mapId = process.env.MAP_ID;

app.get('/', (req, res) => {
  const filePath = './web-components/index.html';
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading the HTML file');
      return;
    }
    const updatedData = data.replace('YOUR_API_KEY', mapKey)
      .replace('MAP_ID', mapId);
    res.send(updatedData);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});