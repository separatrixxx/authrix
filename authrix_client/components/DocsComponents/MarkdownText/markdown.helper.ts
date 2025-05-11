export function preprocessMarkdown(md: string) {
    return md.replace(/\{\{\{(?:\((\w+)\))?([\s\S]*?)\}\}\}/g, (_, lang, code) => {
        const language = lang || 'typescript';

        return `\n\`\`\`${language}\n${code.trim()}\n\`\`\`\n`;
    });
}