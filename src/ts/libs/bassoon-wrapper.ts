import BassoonTracker from './bassoonplayer-min.js';

const tracker = BassoonTracker();

export const TrackerWrapper = {
	init: () =>  console.log(tracker),//Tracker.init(),
	load: (song) => console.log(song),//BassoonTracker.load(song),
	play: () => tracker.play()
}