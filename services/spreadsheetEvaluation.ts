export function evaluateSumFormula(raw: string, values: number[]): number | null {
  const formula = raw.trim().toUpperCase().replace(/\s+/g,'');
  if (!/^=(?:(?:SUM|СУММ)\(D2:D4\)|D2\+D3\+D4)$/.test(formula)) return null;
  return values.reduce((sum,value) => sum+value,0);
}
export function parseIfFormula(raw: string): { threshold:number; inclusive:boolean; passText:string; failText:string } | null {
  const match = raw.trim().match(/^=(?:IF|ЕСЛИ)\s*\(\s*B2\s*(>=|>)\s*(\d+(?:\.\d+)?)\s*([,;])\s*(["'])(.*?)\4\s*\3\s*(["'])(.*?)\6\s*\)$/i);
  return match ? { threshold:Number(match[2]), inclusive:match[1] === '>=', passText:match[5], failText:match[7] } : null;
}
export function formulaRefs(formula: string): Set<string> {
  const refs = new Set<string>();
  const clean = formula.toUpperCase().replace(/"[^"]*"|'[^']*'/g, ' ');
  const rest = clean.replace(/([A-Z])(\d+):([A-Z])(\d+)/g, (_m, c1: string, r1: string, c2: string, r2: string) => {
    const a = +r1, b = +r2, x = c1.charCodeAt(0), y = c2.charCodeAt(0);
    if (c1 === c2) { for (let r = Math.min(a, b); r <= Math.max(a, b); r++) refs.add(c1 + r); }
    else if (a === b) { for (let c = Math.min(x, y); c <= Math.max(x, y); c++) refs.add(String.fromCharCode(c) + a); }
    else { refs.add(c1 + a); refs.add(c2 + b); }
    return ' ';
  });
  for (const match of rest.matchAll(/[A-Z]\d+/g)) refs.add(match[0]);
  return refs;
}
