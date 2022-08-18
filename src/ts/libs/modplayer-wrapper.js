import { ModPlayer } from './headless-player';

export const initPlayer = (context) => {
	const audioWorkletSupport = !!AudioWorkletNode.toString().match(/native code/);
    ModPlayer.init({
        audioWorkletSupport
    }, context).catch((err) => {
        console.log(`Error loading module: ${err}`);
    });
}

export const setPlayerBuffer = (buffer) => {
    if (ModPlayer.ready && buffer) {
        ModPlayer.setBuffer(buffer);
    }
}

export const play = () => ModPlayer.play();

export const stop = () => ModPlayer.stop();