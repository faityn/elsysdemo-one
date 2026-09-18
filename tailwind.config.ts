import type { Config } from 'tailwindcss'
const config:Config={content:['./app/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}'],theme:{extend:{fontFamily:{sans:['Arial','Segoe UI','sans-serif']},boxShadow:{soft:'0 10px 30px rgba(10,20,30,.08)'}}},plugins:[]}
export default config
