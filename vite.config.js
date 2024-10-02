import laravel from 'laravel-vite-plugin'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { watch } from 'vite-plugin-watch'

import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            ssr: 'resources/js/ssr.tsx',
            refresh: true
        }),
        react(),
        watch({
            pattern: 'routes/web.php',
            command: 'php artisan ziggy:generate'
        }),
        watch({
            pattern: 'app/Models/**/*.php',
            command: 'php artisan generate-permissions'
        })
    ],
    resolve: {
        alias: {
            ui: resolve('resources/js/components/ui/index.ts'),
            layouts: resolve('resources/js/layouts/index.ts'),
            components: resolve('resources/js/components'),
            utils: resolve('resources/js/lib/utils.ts'),
            permission: resolve('resources/js/lib/permission.ts'),
            'ziggy-js': resolve('vendor/tightenco/ziggy')
        }
    }
})
