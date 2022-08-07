import { BlockBox, BorderBlocking } from "../models/block-box";

type TiledObject = {
	id: number;
	x?: number;
	y?: number;
	width?: number;
	height?: number;
}

export const tiledObject2Block = ({ x, y, width, height, id }: TiledObject, blockingString?: string): BlockBox => {
	const correctJson = blockingString? blockingString.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": '): '';
	const blockingBorders: BorderBlocking = { left: true, right: true, top: true, bottom: true, 
		...JSON.parse(correctJson)
	};
	return { id, x: x || 0, y: y || 0, width: width || 0, height: height || 0, blockingBorders };
};
