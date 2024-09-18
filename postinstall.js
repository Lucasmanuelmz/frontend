import fse from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
const topDir = path.dirname(fileURLToPath(import.meta.url));
fse.emptyDirSync(path.join(topDir, 'public', 'tinymce'));
fse.copySync(path.join(topDir, 'node_modules', 'tinymce'), path.join(topDir, 'public', 'tinymce'), { overwrite: true });