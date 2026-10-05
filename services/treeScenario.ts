import type {Task} from '../types';
export interface SearchNode {value:number;left?:SearchNode;right?:SearchNode}
export interface PositionedNode {val:number;x:number;y:number;left?:PositionedNode;right?:PositionedNode}
export const DEFAULT_SEARCH_TREE:SearchNode={value:50,left:{value:25,left:{value:12},right:{value:37}},right:{value:75,left:{value:63},right:{value:90}}};
export function getTreeScenario(task:Task){
 const source=task.treeConfig?.tree??DEFAULT_SEARCH_TREE;
 const count=(n:SearchNode|undefined):number=>n?1+count(n.left)+count(n.right):0;
 const total=count(source);let index=0;
 const nodes:PositionedNode[]=[];
 const position=(n:SearchNode,depth:number):PositionedNode=>{
  const left=n.left?position(n.left,depth+1):undefined;
  const node:PositionedNode={val:n.value,x:++index*500/(total+1),y:50+depth*80,left};nodes.push(node);
  node.right=n.right?position(n.right,depth+1):undefined;
  return node;
 };
 const root=position(source,0);
 return {root,nodes,target:task.treeConfig?.target??63};
}
