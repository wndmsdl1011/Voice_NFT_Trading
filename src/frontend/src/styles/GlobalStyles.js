import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --emerald-50: #ecfdf5;
    --emerald-100: #d1fae5;
    --emerald-200: #a7f3d0;
    --emerald-300: #6ee7b7;
    --emerald-400: #34d399;
    --emerald-500: #10b981;
    --emerald-600: #059669;
    --emerald-700: #047857;
    --emerald-800: #065f46;
    --emerald-900: #064e3b;
    
    --teal-50: #f0fdfa;
    --teal-100: #ccfbf1;
    --teal-200: #99f6e4;
    --teal-300: #5eead4;
    --teal-400: #2dd4bf;
    --teal-500: #14b8a6;
    --teal-600: #0d9488;
    --teal-700: #0f766e;
    --teal-800: #115e59;
    --teal-900: #134e4a;
    
    --cyan-50: #ecfeff;
    --cyan-100: #cffafe;
    --cyan-200: #a5f3fc;
    --cyan-300: #67e8f9;
    --cyan-400: #22d3ee;
    --cyan-500: #06b6d4;
    --cyan-600: #0891b2;
    --cyan-700: #0e7490;
    --cyan-800: #155e75;
    --cyan-900: #164e63;
    
    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-300: #d1d5db;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;
    
    --white: #ffffff;
    --black: #000000;
    
    --rose-500: #f43f5e;
    
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--white);
    color: var(--gray-900);
  }

  #root {
    height: 100%;
  }

  .App {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  input, textarea, select {
    font-family: inherit;
    border: none;
    outline: none;
  }

  /* Utility classes */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .text-center {
    text-align: center;
  }

  .flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
  }

  .items-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .space-x-2 > * + * {
    margin-left: 0.5rem;
  }

  .space-x-4 > * + * {
    margin-left: 1rem;
  }

  .space-x-8 > * + * {
    margin-left: 2rem;
  }

  .space-y-2 > * + * {
    margin-top: 0.5rem;
  }

  .space-y-3 > * + * {
    margin-top: 0.75rem;
  }

  .space-y-4 > * + * {
    margin-top: 1rem;
  }

  .space-y-6 > * + * {
    margin-top: 1.5rem;
  }

  .space-y-8 > * + * {
    margin-top: 2rem;
  }

  .grid {
    display: grid;
  }

  .gap-2 {
    gap: 0.5rem;
  }

  .gap-3 {
    gap: 0.75rem;
  }

  .gap-4 {
    gap: 1rem;
  }

  .gap-6 {
    gap: 1.5rem;
  }

  .gap-8 {
    gap: 2rem;
  }

  @media (min-width: 768px) {
    .md\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    
    .md\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    
    .md\\:flex-row {
      flex-direction: row;
    }
    
    .md\\:flex {
      display: flex;
    }
  }

  @media (min-width: 1024px) {
    .lg\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  /* Animation keyframes */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }

  /* Responsive text sizes */
  .text-xs { font-size: 0.75rem; line-height: 1rem; }
  .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
  .text-base { font-size: 1rem; line-height: 1.5rem; }
  .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
  .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
  .text-2xl { font-size: 1.5rem; line-height: 2rem; }
  .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
  .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
  .text-6xl { font-size: 3.75rem; line-height: 1; }

  .font-medium { font-weight: 500; }
  .font-semibold { font-weight: 600; }
  .font-bold { font-weight: 700; }

  /* Common margins and paddings */
  .p-2 { padding: 0.5rem; }
  .p-4 { padding: 1rem; }
  .p-6 { padding: 1.5rem; }
  .p-8 { padding: 2rem; }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
  .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
  .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
  .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
  .py-20 { padding-top: 5rem; padding-bottom: 5rem; }

  .m-2 { margin: 0.5rem; }
  .m-4 { margin: 1rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mb-3 { margin-bottom: 0.75rem; }
  .mb-4 { margin-bottom: 1rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .mb-8 { margin-bottom: 2rem; }
  .mb-12 { margin-bottom: 3rem; }
  .mr-1 { margin-right: 0.25rem; }
  .mr-2 { margin-right: 0.5rem; }
  .mr-4 { margin-right: 1rem; }
  .mt-1 { margin-top: 0.25rem; }
  .mt-2 { margin-top: 0.5rem; }
  .mt-3 { margin-top: 0.75rem; }
  .mt-4 { margin-top: 1rem; }
  .mt-6 { margin-top: 1.5rem; }
  .mt-8 { margin-top: 2rem; }
  .mx-auto { margin-left: auto; margin-right: auto; }

  /* Width and height utilities */
  .w-3 { width: 0.75rem; }
  .w-4 { width: 1rem; }
  .w-5 { width: 1.25rem; }
  .w-6 { width: 1.5rem; }
  .w-8 { width: 2rem; }
  .w-12 { width: 3rem; }
  .w-16 { width: 4rem; }
  .w-20 { width: 5rem; }
  .w-32 { width: 8rem; }
  .w-full { width: 100%; }

  .h-2 { height: 0.5rem; }
  .h-3 { height: 0.75rem; }
  .h-4 { height: 1rem; }
  .h-5 { height: 1.25rem; }
  .h-6 { height: 1.5rem; }
  .h-8 { height: 2rem; }
  .h-12 { height: 3rem; }
  .h-16 { height: 4rem; }
  .h-20 { height: 5rem; }
  .h-32 { height: 8rem; }
  .h-64 { height: 16rem; }

  .max-w-xs { max-width: 20rem; }
  .max-w-sm { max-width: 24rem; }
  .max-w-md { max-width: 28rem; }
  .max-w-lg { max-width: 32rem; }
  .max-w-xl { max-width: 36rem; }
  .max-w-2xl { max-width: 42rem; }
  .max-w-3xl { max-width: 48rem; }
  .max-w-4xl { max-width: 56rem; }
  .max-w-6xl { max-width: 72rem; }

  /* Border radius */
  .rounded { border-radius: 0.25rem; }
  .rounded-md { border-radius: 0.375rem; }
  .rounded-lg { border-radius: 0.5rem; }
  .rounded-xl { border-radius: 0.75rem; }
  .rounded-full { border-radius: 9999px; }

  /* Position utilities */
  .relative { position: relative; }
  .absolute { position: absolute; }
  .sticky { position: sticky; }
  .top-0 { top: 0; }
  .top-2 { top: 0.5rem; }
  .right-2 { right: 0.5rem; }
  .left-3 { left: 0.75rem; }
  .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
  .z-10 { z-index: 10; }
  .z-50 { z-index: 50; }

  /* Transform utilities */
  .transform { transform: var(--tw-transform); }
  .scale-105 { transform: scale(1.05); }
  .scale-110 { transform: scale(1.1); }
  .-translate-y-1\/2 { transform: translateY(-50%); }

  /* Overflow */
  .overflow-hidden { overflow: hidden; }

  /* Display utilities */
  .hidden { display: none; }
  .block { display: block; }
  .inline-block { display: inline-block; }

  /* Flex utilities */
  .flex-1 { flex: 1 1 0%; }

  /* Background utilities */
  .bg-white { background-color: var(--white); }
  .bg-transparent { background-color: transparent; }

  /* Transition utilities */
  .transition-all { transition: all 0.15s ease-in-out; }
  .transition-colors { transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out; }
  .transition-transform { transition: transform 0.15s ease-in-out; }
  .duration-300 { transition-duration: 300ms; }

  /* Hover utilities */
  .hover\\:scale-105:hover { transform: scale(1.05); }
  .hover\\:scale-110:hover { transform: scale(1.1); }

  /* Focus utilities */
  .focus\\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }

  /* Border utilities */
  .border { border-width: 1px; }
  .border-0 { border-width: 0; }
  .border-2 { border-width: 2px; }
  .border-b { border-bottom-width: 1px; }
  .border-t { border-top-width: 1px; }
  .border-dashed { border-style: dashed; }

  /* Aspect ratio utilities */
  .aspect-square { aspect-ratio: 1 / 1; }

  /* Shadow utilities */
  .shadow-sm { box-shadow: var(--shadow-sm); }
  .shadow { box-shadow: var(--shadow); }
  .shadow-md { box-shadow: var(--shadow-md); }
  .shadow-lg { box-shadow: var(--shadow-lg); }
  .shadow-xl { box-shadow: var(--shadow-xl); }
  .shadow-2xl { box-shadow: var(--shadow-2xl); }

  /* Backdrop utilities */
  .backdrop-blur-sm { backdrop-filter: blur(4px); }

  @media (min-width: 768px) {
    .md\\:hidden { display: none; }
    .md\\:block { display: block; }
  }
`;

export default GlobalStyles;
