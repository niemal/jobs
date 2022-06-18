import fs from 'fs';
import path from 'path';

export const config = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config.json'), 'UTF-8'));