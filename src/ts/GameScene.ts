import Inputs from "./Inputs";
import Wizzy from "./Player";
import { tiledObject2Block } from "./utils/tiledObject2Block";
import { TrackerWrapper } from "./libs/bassoon-wrapper";

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
	TrackerWrapper.init();
	TrackerWrapper.load(this.cache.binary.get('audio-mod'));
	TrackerWrapper.play();
    const tilemap = this.make.tilemap({
      key: "tilemap",
    });
    const tileset = tilemap.addTilesetImage("tiles");
    tilemap.createLayer(0, tileset, 0, 0);
	const walls = tilemap.createLayer(1, tileset, 0, 0);
	const obs = tilemap.getObjectLayer('Kollision')
		.objects
		.filter(obj => !!obj.properties)
		.map(obj => tiledObject2Block(obj, obj.properties[0].value));

	const staticColGroup = this.physics.add.staticGroup();
	obs.forEach(({ x, y, width, height}) => {
		const wall = staticColGroup.create(x + 16, y + 16, null, null, false)
		wall.body.width = width;
		wall.body.height = height;
	})

    this._inputs = new Inputs(this);

	const player = new Wizzy(this, 100, 40);
    const { widthInPixels, heightInPixels } = tilemap;

    this.physics.world.setBounds(0, -64, widthInPixels, heightInPixels + 64);
    this.physics.world.TILE_BIAS = 8;
	this.physics.add.collider(player, staticColGroup);
    this.cameras.main.setBounds(0, 0, widthInPixels, heightInPixels);
	this.cameras.main.startFollow(player);
  }

  public get inputs() {
    return this._inputs;
  }
}
