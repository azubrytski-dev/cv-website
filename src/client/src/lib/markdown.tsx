import React from 'react';

interface RenderMarkdownOptions {
  mode?: 'light' | 'dark';
}

export function renderMarkdown(markdown: string, options: RenderMarkdownOptions = {}): React.ReactNode[] {
  const mode = options.mode ?? 'light';
  const isDark = mode === 'dark';
  const codeBackground = isDark ? 'rgba(15, 23, 42, 0.96)' : 'rgba(15, 23, 42, 0.06)';
  const codeColor = isDark ? '#e2e8f0' : '#0f172a';
  const quoteBackground = isDark ? 'rgba(59, 130, 246, 0.14)' : 'rgba(59, 130, 246, 0.08)';
  const quoteBorder = isDark ? 'rgba(96, 165, 250, 0.85)' : 'rgba(59, 130, 246, 0.75)';
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: React.ReactNode[] = [];
  let index = 0;

  const parseInline = (input: string): React.ReactNode[] => {
    const tokens = input.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);

    return tokens.filter(Boolean).map((token, tokenIndex) => {
      if (token.startsWith('**') && token.endsWith('**')) {
        return <strong key={`${tokenIndex}-${token}`}>{token.slice(2, -2)}</strong>;
      }

      if (token.startsWith('`') && token.endsWith('`')) {
        return <code key={`${tokenIndex}-${token}`}>{token.slice(1, -1)}</code>;
      }

      if (token.startsWith('[') && token.includes('](') && token.endsWith(')')) {
        const closingLabelIndex = token.indexOf('](');
        const label = token.slice(1, closingLabelIndex);
        const href = token.slice(closingLabelIndex + 2, -1);

        return (
          <a key={`${tokenIndex}-${token}`} href={href} target="_blank" rel="noreferrer">
            {label}
          </a>
        );
      }

      return token;
    });
  };

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const content = headingMatch[2].trim();

      blocks.push(
        React.createElement(
          `h${level}`,
          { key: `heading-${index}`, style: { margin: '1.75rem 0 0.75rem' } },
          content,
        ),
      );
      index += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].startsWith('```')) {
        codeLines.push(lines[index]);
        index += 1;
      }

      blocks.push(
        <pre
          key={`code-${index}`}
          style={{
            overflowX: 'auto',
            padding: '1rem',
            borderRadius: '16px',
            background: codeBackground,
            color: codeColor,
            fontSize: '0.92rem',
            lineHeight: 1.6,
          }}
        >
          <code>{codeLines.join('\n')}</code>
        </pre>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith('> ')) {
      const quoteLines: string[] = [line.slice(2).trim()];
      index += 1;

      while (index < lines.length && lines[index].startsWith('> ')) {
        quoteLines.push(lines[index].slice(2).trim());
        index += 1;
      }

      blocks.push(
        <blockquote
          key={`quote-${index}`}
          style={{
            margin: '1.25rem 0',
            padding: '0.75rem 1rem',
            borderLeft: `4px solid ${quoteBorder}`,
            background: quoteBackground,
            borderRadius: '0 12px 12px 0',
          }}
        >
          {quoteLines.map((quote, quoteIndex) => (
            <p key={`${quoteIndex}-${quote}`} style={{ margin: quoteIndex === 0 ? 0 : '0.5rem 0 0' }}>
              {parseInline(quote)}
            </p>
          ))}
        </blockquote>,
      );
      continue;
    }

    if (/^(\- |\* |\d+\. )/.test(line)) {
      const listItems: string[] = [];
      const ordered = /^\d+\. /.test(line);

      while (index < lines.length && /^(\- |\* |\d+\. )/.test(lines[index])) {
        listItems.push(lines[index].replace(/^(\- |\* |\d+\. )/, '').trim());
        index += 1;
      }

      blocks.push(
        React.createElement(
          ordered ? 'ol' : 'ul',
          {
            key: `list-${index}`,
            style: {
              margin: '0.75rem 0 1.25rem 1.25rem',
              paddingLeft: '1rem',
              display: 'grid',
              gap: '0.5rem',
            },
          },
          listItems.map((item, itemIndex) =>
            React.createElement(
              'li',
              { key: `${itemIndex}-${item}`, style: { lineHeight: 1.7 } },
              parseInline(item),
            ),
          ),
        ),
      );
      continue;
    }

    const paragraphLines = [line.trim()];
    index += 1;

    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,3})\s+/.test(lines[index]) &&
      !lines[index].startsWith('```') &&
      !lines[index].startsWith('> ') &&
      !/^(\- |\* |\d+\. )/.test(lines[index])
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push(
      <p key={`paragraph-${index}`} style={{ margin: '0 0 1rem', lineHeight: 1.75 }}>
        {parseInline(paragraphLines.join(' '))}
      </p>,
    );
  }

  return blocks;
}

