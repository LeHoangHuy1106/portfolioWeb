import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {localEditor} from './plugins/localEditor';
import {fileURLToPath,URL} from 'node:url';
export default defineConfig({plugins:[react(),localEditor()],base:'/',resolve:{alias:{'@':fileURLToPath(new URL('./src',import.meta.url))}},server:{host:'127.0.0.1',port:5173}});
