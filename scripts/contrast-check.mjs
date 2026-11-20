import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function parseBlockTokens(css, selectorPattern) {
  const match = css.match(selectorPattern);
  if (!match) {
    throw new Error(`Token block not found: ${selectorPattern}`);
  }
  const tokens = {};
  const propRegex = /--([a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{6})\s*;/g;
  let m;
  while ((m = propRegex.exec(match[1])) !== null) {
    tokens[m[1]] = m[2].toUpperCase();
  }
  return tokens;
}

function linearize(channel) {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function contrastRatio(fg, bg) {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

const cssPath = resolve(process.cwd(), 'src/index.css');
const css = readFileSync(cssPath, 'utf8');

const themes = {
  light: parseBlockTokens(css, /:root\s*\{([\s\S]*?)\}/),
  dark: parseBlockTokens(css, /\.dark\s*\{([\s\S]*?)\}/),
};

const checks = [
  ['ink', 'bg', 7.0],
  ['ink', 'surface', 7.0],
  ['ink', 'gold-soft', 7.0],
  ['muted', 'bg', 7.0],
  ['muted', 'surface', 7.0],
  ['muted', 'gold-soft', 6.5],
  ['gold-ink', 'bg', 4.5],
  ['gold-ink', 'surface', 4.5],
  ['gold-ink', 'gold-soft', 4.5],
  ['gold', 'bg', 3.0],
  ['gold', 'surface', 3.0],
];

let failed = false;

for (const [themeName, tokens] of Object.entries(themes)) {
  console.log(`\n=== ${themeName.toUpperCase()} THEME ===`);
  for (const [fgKey, bgKey, minRatio] of checks) {
    const fg = tokens[fgKey];
    const bg = tokens[bgKey];
    if (!fg || !bg) {
      console.error(`FAIL Missing token: ${fgKey} (${fg}) or ${bgKey} (${bg})`);
      failed = true;
      continue;
    }
    const ratio = contrastRatio(fg, bg);
    const ok = ratio >= minRatio;
    if (!ok) failed = true;
    const status = ok ? 'PASS' : 'FAIL';
    console.log(
      `${status}  ${fgKey.padEnd(8)} (${fg}) on ${bgKey.padEnd(9)} (${bg}) = ${ratio.toFixed(2)}:1 (min ${minRatio.toFixed(1)}:1)`,
    );
  }
}

if (failed) {
  console.error('\nContrast check failed.');
  process.exit(1);
}

console.log('\nAll contrast checks passed.');
