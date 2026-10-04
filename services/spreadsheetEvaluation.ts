export function evaluateSumFormula(raw: string, values: number[]): number | null {
  const formula = raw.trim().toUpperCase().replace(/\s+/g,'');
  if (!/^=(?:(?:SUM|СУММ)\(D2:D4\)|D2\+D3\+D4)$/.test(formula)) return null;
  return values.reduce((sum,value) => sum+value,0);
}
export function parseIfFormula(raw: string): { threshold:number; inclusive:boolean; passText:string; failText:string } | null {
  const match = raw.trim().match(/^=(?:IF|ЕСЛИ)\s*\(\s*B2\s*(>=|>)\s*(\d+(?:\.\d+)?)\s*([,;])\s*(["'])(.*?)\4\s*\3\s*(["'])(.*?)\6\s*\)$/i);
  return match ? { threshold:Number(match[2]), inclusive:match[1] === '>=', passText:match[5], failText:match[7] } : null;
}
