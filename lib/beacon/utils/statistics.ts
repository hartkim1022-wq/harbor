export function clamp(value:number,min=0,max=100){return Math.min(max,Math.max(min,value));}
export function percentChange(current:number,previous:number){if(previous===0)return current===0?0:100;return (current-previous)/Math.abs(previous)*100;}
export function standardDeviation(values:number[]){if(values.length<2)return 0;const mean=values.reduce((a,b)=>a+b,0)/values.length;return Math.sqrt(values.reduce((s,v)=>s+(v-mean)**2,0)/values.length);}
