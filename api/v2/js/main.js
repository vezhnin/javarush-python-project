const host = "https://vezhnin.github.io/javarush-python-project/api/v2/";

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

async function main() {
    // 0) Prism ручной режим
    window.Prism = window.Prism || {};
    window.Prism.manual = true;

    // 1) Prism Core
    await loadScript(host + 'js/prismjs/prism.js');

    // 2) Components
    const components = [
        'java', 'kotlin', 'groovy', 'sql', 'plsql', 'yaml', 'python',
        'c', 'cpp', 'swift', 'go', 'csharp', 'docker', 'bash',
        'shell-session', 'typescript', 'jsx', 'tsx', 'json', 'markdown', 'nginx'
    ];
    await Promise.all(components.map(c => loadScript(host + `js/prismjs/components/prism-${c}.js`)));

    // 3) Plugins
    const plugins = [
        'line-highlight/prism-line-highlight.js',
        'normalize-whitespace/prism-normalize-whitespace.js',
        'keep-markup/prism-keep-markup.js'
    ];
    for (const p of plugins) {
        await loadScript(host + `js/prismjs/plugins/${p}`);
    }

    // 4) Custom Plugins
    const custom = ['prism-line-numbers.js', 'prism-show-invisibles.js'];
    for (const cp of custom) {
        await loadScript(host + `js/prismjs-custom/${cp}`);
    }

    // 5) Mermaid.js
    await loadScript("https://cdn.jsdelivr.net/npm/mermaid@11.10.1/dist/mermaid.min.js");
    mermaid.initialize({
        startOnLoad: true,
        theme: "default"
    });

    // 6) Prism подсветка
    const codeElements = document.querySelectorAll(
        'pre[class*="language-"] code, pre[class*="lang"] code, pre[class*="line-numbers"] code'
    );
    codeElements.forEach(code => Prism.highlightElement(code, false));
}

// DOM Ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}