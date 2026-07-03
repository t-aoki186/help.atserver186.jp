// src/routes/site/licence/+page.server.ts
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function load() {
    try {
        // __dirname が build/server/chunks/ なら ../../client、build/server/ なら ../client でOK
        // 安全のため process.cwd() を使う（プロジェクトルートからの絶対パス）
        const clientDir = path.join(process.cwd(), 'build', 'client');
        const filePath = path.join(clientDir, 'modules.json');
        const content = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(content);
        return { modules: data.modules || [], generatedAt: data.generatedAt };
    } catch (error) {
        console.error('Error loading modules:', error);
        return { modules: [], generatedAt: null };
    }
}