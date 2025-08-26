/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    theme: { extend: {} },
    // content is ignored by v4 runtime scanning but harmless to keep
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    plugins: [require('@tailwindcss/typography')],
};
