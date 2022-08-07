import Inputs from "./Inputs";
import Wizzy from "./Player";

export default class GameScene extends Phaser.Scene {
  private _inputs: Inputs;

  constructor() {
    super({
      key: "game",
      active: false,
      visible: false,
    });
  }

  public create() {
    const tilemap = this.make.tilemap({
      key: "tilemap",
    });
    const tileset = tilemap.addTilesetImage("tiles");
    tilemap.createLayer(0, tileset, 0, 0);
	tilemap.createLayer(1, tileset, 0, 0);
	console.log(tilemap.getObjectLayer('Kollision'));
	console.log(tilemap)

    this._inputs = new Inputs(this);

	const player = new Wizzy(this, 100, 20);
    const { widthInPixels, heightInPixels } = tilemap;

    this.physics.world.setBounds(0, -64, widthInPixels, heightInPixels + 64);
    this.physics.world.TILE_BIAS = 8;

    this.cameras.main.setBounds(0, 0, widthInPixels, heightInPixels);
	this.cameras.main.startFollow(player);
  }

  public get inputs() {
    return this._inputs;
  }
}
