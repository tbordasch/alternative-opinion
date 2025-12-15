export default function ThemeScript() {
  const codeToRun = `
    (function() {
      try {
        const theme = localStorage.getItem('theme') || 'light';
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        console.log('Theme set to:', theme);
      } catch (e) {
        console.error('Theme script error:', e);
      }
    })();
  `;
  
  return <script dangerouslySetInnerHTML={{ __html: codeToRun }} />;
}

