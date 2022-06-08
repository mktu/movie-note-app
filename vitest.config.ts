/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'

export default defineConfig({
    test: {
        /* for example, use global to avoid globals imports (describe, test, expect): */
        // globals: true,
        exclude: [...configDefaults.exclude, 'tests/*'],
    },
})