export type BorderBlocking = {
	left: boolean;
	right: boolean;
	top: boolean;
	bottom: boolean;
}

export type BlockBox = {
	id: number;
	x: number;
	y: number;
	width: number;
	height: number;
	blockingBorders: BorderBlocking;
}