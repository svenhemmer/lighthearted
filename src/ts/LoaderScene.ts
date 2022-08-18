import { initPlayer } from './libs/modplayer-wrapper';
import { getAudioContext } from "./utils/get-audio-context";

export default class LoaderScene extends Phaser.Scene {
  public preload() {
	// prepare mod-player
	const manager = new Phaser.Sound.WebAudioSoundManager(this.game);
	const context = getAudioContext();
	this.game.sound = manager;
	manager.setAudioContext(context);
	initPlayer(context);

    this.load.tilemapTiledJSON("tilemap", "./assets/tilemaps/tilemap.json");
    this.load.image("tiles", "./assets/images/tiles.png");
	this.load.spritesheet("wizard", "./assets/images/wizard.png", {
		frameWidth: 16,
		frameHeight: 32,
	});
    this.load.binary("audio-mod", "./assets/audio/Opal - !Love&devotion!.mod");
  }

  public create() {
    this.scene.start("game");
  }
}
