import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

async function getFiles(dir) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  }));
  return Array.prototype.concat(...files);
}

async function optimizeImages() {
  console.log('🖼️  Iniciando optimización de imágenes...\n');
  
  const allFiles = await getFiles(publicDir);
  const imagesToConvert = allFiles.filter(file => /\.(png|jpeg|jpg)$/i.test(file));

  for (const inputPath of imagesToConvert) {
    const relativePath = path.relative(publicDir, inputPath);
    const outputPath = inputPath.replace(/\.(png|jpeg|jpg)$/i, '.webp');
    
    // Si ya existe el webp y es más reciente que el original, saltar (opcional)
    // Pero para asegurar, los procesamos todos.
    
    const inputStats = fs.statSync(inputPath);
    const inputSize = (inputStats.size / 1024).toFixed(2);
    
    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      const outputStats = fs.statSync(outputPath);
      const outputSize = (outputStats.size / 1024).toFixed(2);
      const reduction = (((inputStats.size - outputStats.size) / inputStats.size) * 100).toFixed(1);
      
      console.log(`✅ ${relativePath}`);
      console.log(`   ${inputSize} KB → ${outputSize} KB (${reduction}% reducción)\n`);
    } catch (error) {
      console.log(`❌ Error al convertir ${relativePath}: ${error.message}\n`);
    }
  }
  
  console.log('✨ Optimización completada!');
}

optimizeImages().catch(console.error);
