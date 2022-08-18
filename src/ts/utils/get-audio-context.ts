export const getAudioContext = () => {
	if (window.hasOwnProperty('AudioContext')) {
		return new AudioContext();
	}
	if (window.hasOwnProperty('webkitAudioContext')) {
		return new (<unknown>window as {webkitAudioContext: typeof AudioContext}).webkitAudioContext();
	}
}