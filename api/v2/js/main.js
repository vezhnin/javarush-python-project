const host = "https://vezhnin.github.io/javarush-python-project/api/v2/"

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

async function main() {
    // 1. Prism Core
    await loadScript(host + 'js/prismjs/prism.js');

    // 2. Components
    const components = [
        'java', 'kotlin', 'groovy', 'sql', 'plsql', 'yaml', 'python',
        'c', 'cpp', 'swift', 'go', 'csharp', 'docker', 'bash',
        'shell-session', 'typescript', 'jsx', 'tsx', 'json', 'markdown', 'nginx'
    ];
    for (const component of components) {
        await loadScript(host + `js/prismjs/components/prism-${component}.js`);
    }

    // 3. Plugins
    const plugins = [
        'line-highlight/prism-line-highlight.js',
        'normalize-whitespace/prism-normalize-whitespace.js',
        'keep-markup/prism-keep-markup.js'
    ];
    for (const plugin of plugins) {
        await loadScript(host + `js/prismjs/plugins/${plugin}`);
    }

    // 4. Custom Plugins
    const customPlugins = [
        'prism-line-numbers.js',
        'prism-show-invisibles.js'
    ];
    for (const customPlugin of customPlugins) {
        await loadScript(host + `js/prismjs-custom/${customPlugin}`);
    }

    // 5. Запускаем подсветку, когда все скрипты загружены
    window.Prism = window.Prism || {};
    window.Prism.manual = true;

    const codeElements = document.querySelectorAll("pre[class*=lang] code, pre[class*=line-numbers] code");
    Array.from(codeElements).forEach((codeElement) => {
        Prism.highlightElement(codeElement, false);
    });
}

// Запуск main после загрузки DOM (рекомендовано)
window.addEventListener('DOMContentLoaded', main);
