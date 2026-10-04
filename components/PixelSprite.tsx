import React from 'react';

// Hand-drawn pixel grids. Runs of equal pixels become rectangles, so edges stay
// sharp at every resolution without loading or enlarging raster images.
const SPRITES: Record<string, string[]> = {
  bot: [
    '..........yy............','..........yy............','..........kk............','....kkkkkkkkkkkkkk......','...kwwwwwwwwwwwwwwk.....','..kwwccccccccccccwwk....','..kwccccccccccccccwk....','.bkwckkkkkkkkkkkkcwkb...','.bkwckdddkkdddkkkcwkb...','.bkwckdcckkdcckkkcwkb...','.bkwckdcckkdcckkkcwkb...','..kwckkkkkkkkkkkkcwk....','..kwckkmmmmmmkkkkcwk....','..kwwccccccccccccwwk....','...kkkkkkkkkkkkkkkk.....','......kccccccck.........','...kkkwwccccwwkkk.......','..kcckwccccccwkcck......','..kcckwccyyccwkcck......','..kkkkwccccccwkkkk......','......kkkkkkkk..........','.....kcccckcccck........','.....kbbbbkbbbbk........','.....kkkkkkkkkkk........',
  ],
  computer: [
    '..kkkkkkkkkkkkkkkkkkkk..','.kwwwwwwwwwwwwwwwwwwwwk.','.kwccccccccccccccccccwk.','.kwckkkkkkkkkkkkkkkkcwk.','.kwckdddddkkkkkkkkkkcwk.','.kwckdmmmddkkmmmmmmkcwk.','.kwckdmmmddkkkkkkkkkcwk.','.kwckdddddkkmmmmkkkcwk..','.kwckkkkkkkkkkkkkkkkcwk.','.kwckkkkmmkkkkkkkkkkcwk.','.kwckkkkkmmkkkkkkkkkcwk.','.kwckkkkkkmmkkkkkkkkcwk.','.kwckkmmmmmmkkkkkkkkcwk.','.kwckkkkkkkkkkkkkkkkcwk.','.kwccccccccccccccccccwk.','..kkkkkkkkkkkkkkkkkkkk..','..........kbbbk.........','........kkkbbbkkk.......','...kkkkkkkkkkkkkkkkkk...','..kwwwwwwwwwwwwwwwwwwk..','.kwbbbbbbbbbbbbbbbbbbwk.','.kwwwwwwwwwwwwwwwwwwwwk.','..kkkkkkkkkkkkkkkkkkkk..','........................',
  ],
  rocket: [
    '..........yy............','.........ywwy...........','........ywwwwy..........','.......kwwwwwwk.........','.......kwwwwwwk.........','......kwwwwwwwwk........','......kwwkkkkwwk........','......kwkcccckwk........','......kwkcwwckwk........','......kwkcccckwk........','......kwwkkkkwwk........','.....pkwwwwwwwwkp.......','....ppkwwwwwwwwkpp......','...pppkwwwwwwwwkppp.....','..ppppkwwwwwwwwkpppp....','..pbbpkwwwwwwwwkpbbp....','..pbbpkkwwwwwwkkpbbp....','..pppk..kkkkkk..kppp....','........ryyyyr..........','........rywwyr..........','.........ryyr...........','.........ryyr...........','..........rr............','........................',
  ],
  shield: [
    '..........cc............','........ccwwcc..........','......ccwwwwwwcc........','....ccwwccccwwwwcc......','..ccwwccccccccwwwwcc....','..cwccccccccccccccwc....','..cwccccccccccccccwc....','..cwccccccccccmmccwc....','..cwcccccccccmmcccwc....','..cwcccmccccmmccccwc....','..cwcccmmccmmcccccwc....','..cwccccmmmmccccccwc....','..cwcccccmmcccccccwc....','..cwccccccccccccccwc....','...cwccccccccccccwc.....','...cwccccccccccccwc.....','....cwccccccccccwc......','.....cwccccccccwc.......','......cwccccccwc........','.......cwccccwc.........','........cwwwwc..........','.........cwwc...........','..........cc............','........................',
  ],
  trophy: [
    '........................','....yyyyyyyyyyyyyyyy....','....ywwwwwwwwwwwwyy.....','.yyyyyyyyyyyyyyyyyyyyy..','.ywkyyyyyyyyyyyyyykwyy..','.ywkyyyyyyyyyyyyyykwyy..','.ywkyyyyyyyyyyyyyykwyy..','.yykyyyyyyyyyyyyyykyyy..','..yykyyyyyyyyyyyykyyy...','...yyyyyyyyyyyyyyyyy....','.....yyyyyyyyyyyyyy.....','......yyyyyyyyyyyy......','........yyyyyyyy........','..........yyyy..........','..........yyyy..........','..........yyyy..........','........yyyyyyyy........','.......yyyyyyyyyy.......','......kkkkkkkkkkkk......','......kbbbbbbbbbbk......','......kbbyyyyyybbk......','......kkkkkkkkkkkk......','........................','........................',
  ],
  coin: [
    '........................','.......yyyyyyyy.........','.....yywwwwwwyyyy.......','....ywwyyyyyyyyyyy......','...ywwyyyyyyyyyyyby.....','..ywwyyyyywwyyyyyyby....','..ywyyyyyywwyyyyyyby....','..ywyyyywwwwwwyyyyby....','..ywyyywwyyyyyyyyyby....','..ywyyywwyyyyyyyyyby....','..ywyyyywwwwwyyyyyby....','..ywyyyyyyyywwyyyyby....','..ywyyyyyyyywwyyyyby....','..ywyyywwwwwwyyyyyby....','..ywyyyyyywwyyyyyyby....','..ywyyyyyywwyyyyyyby....','..ywwyyyyyyyyyyyyyby....','...ywwyyyyyyyyyyyby.....','....ywwyyyyyyyyyby......','.....yybbbbbbbbyy.......','.......yyyyyyyy.........','........................','........................','........................',
  ],
};

const BASE: Record<string, string> = { k:'#071021', b:'#286084', c:'#42dcee', w:'#d5fbff', m:'#8cffbe', d:'#267989', y:'#ffd85d', p:'#b47bff', r:'#ff7b66' };
export function PixelSprite({ kind = 'bot', x = 0, y = 0, size = 24, accent }: { kind?: string; x?: number; y?: number; size?: number; accent?: string }) {
  const rows = SPRITES[kind] || SPRITES.bot;
  const palette = accent ? {...BASE,c:accent} : BASE;
  const runs: React.ReactNode[]=[];
  rows.forEach((row,ry)=>{for(let rx=0;rx<row.length;){const char=row[rx];let end=rx+1;while(end<row.length&&row[end]===char)end++;if(char!=='.')runs.push(<rect key={`${rx}-${ry}`} x={rx} y={ry} width={end-rx} height={1} fill={palette[char]}/>);rx=end;}});
  return <g transform={`translate(${x} ${y}) scale(${size / 24})`} shapeRendering="crispEdges">{runs}</g>;
}
export function PixelIcon({ kind, className = '' }: { kind: string; className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} width="24" height="24" aria-hidden="true" shapeRendering="crispEdges"><PixelSprite kind={kind}/></svg>;
}
