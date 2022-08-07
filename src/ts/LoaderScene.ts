export default class LoaderScene extends Phaser.Scene {
  public preload() {
    this.load.tilemapTiledJSON("tilemap", "./assets/tilemaps/tilemap.json");
    this.load.image("tiles", "./assets/images/tiles.png");
	this.load.spritesheet("wizard", "./assets/images/wizard.png", {
		frameWidth: 16,
		frameHeight: 32,
	});
  }

  public create() {
    this.scene.start("game");
  }
}
