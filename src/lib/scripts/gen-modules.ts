// src/lib/scripts/gen-modules.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// プロジェクトルートを取得（方法1: process.cwd()）
const rootDir = process.cwd();

// または方法2を使う場合はこちら
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const rootDir = path.resolve(__dirname, '../..');

const lockPath = path.join(rootDir, 'package-lock.json');
const outputPath = path.join(rootDir, 'static', 'modules.json');

try {
    const lockContent = fs.readFileSync(lockPath, 'utf-8');
    const lockData = JSON.parse(lockContent);
    const packages = lockData.packages || {};

    const modules = Object.keys(packages)
        .filter(name => name !== '')
        .map(name => ({
            name: name,
            version: packages[name].version,
            license: packages[name].license,
            resolved: packages[name].resolved,
        }));

    // staticディレクトリがなければ作成
    if (!fs.existsSync(path.dirname(outputPath))) {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }

    fs.writeFileSync(outputPath, JSON.stringify({ modules, generatedAt: new Date().toISOString() }, null, 2));
    console.log(`✅ Generated modules.json with ${modules.length} entries.`);
} catch (error) {
    console.error('❌ Failed to generate modules.json:', error);
    process.exit(1);
}