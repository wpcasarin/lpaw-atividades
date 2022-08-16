export let canvas: HTMLCanvasElement;
export let ctx: CanvasRenderingContext2D | null;

canvas = document.getElementById('canvas') as HTMLCanvasElement;
ctx = canvas.getContext('2d');
