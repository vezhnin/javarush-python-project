// Объединение всех скриптов PrismJS и плагинов
//https://vezhnin.github.io/javarush-python-project/style/v1/style.css
const host = "https://vezhnin.github.io/javarush-python-project/api/v2/"

// Подключаем основной файл PrismJS
const prismScript = document.createElement('script');
prismScript.src = host + 'js/prismjs/prism.js';
document.head.appendChild(prismScript);

// Подключаем компоненты синтаксиса
const components = [
    'java', 'kotlin', 'groovy', 'sql', 'yaml', 'python', 
    'c', 'cpp', 'swift', 'go', 'csharp', 'docker', 
    'shell-session', 'typescript', 'json'
];

components.forEach(component => {
    const script = document.createElement('script');
    script.src = host + `js/prismjs/components/prism-${component}.js`;
    document.head.appendChild(script);
});

// Подключаем плагины PrismJS
const plugins = [
    'line-highlight/prism-line-highlight.js',
    'normalize-whitespace/prism-normalize-whitespace.js',
    'keep-markup/prism-keep-markup.js'
];

plugins.forEach(plugin => {
    const script = document.createElement('script');
    script.src = host + `js/prismjs/plugins/${plugin}`;
    document.head.appendChild(script);
});

// Подключаем кастомные плагины
const customPlugins = [
    'prism-line-numbers.js',
    'prism-show-invisibles.js'
];

customPlugins.forEach(customPlugin => {
    const script = document.createElement('script');
    script.src = host + `js/prismjs-custom/${customPlugin}`;
    document.head.appendChild(script);
});

// Инициализация Prism после загрузки всех скриптов
prismScript.onload = function() {
    window.Prism = window.Prism || {};
    window.Prism.manual = true;

    // Подсвечиваем код на странице
    const codeElements = document.querySelectorAll("pre[class*=lang] code, pre[class*=line-numbers] code");
    Array.from(codeElements).forEach((codeElement) => {
        Prism.highlightElement(codeElement, false);
    });
};
