// uno.config.ts
import { defineConfig } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'
import presetUno from '@unocss/preset-uno'


export default defineConfig({
    // ...UnoCSS options
    theme: {
        extend: {
            textShadow: {
                sm: '0 1px 2px grey',
                default: '0 2px 4px grey',
                lg: '0 8px 16px grey',
            },
        },
    },
    presets: [
        presetUno(),
        presetWebFonts({
            provider: 'google',
            fonts: {
                sans: 'Roboto',
                mono: ['Fira Code', 'Fira Mono:400,700'],
            },
        }),
    ],
})