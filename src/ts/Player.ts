import GameScene from "./GameScene";

enum States {
  STANDING,
  WALKING,
}

export default class Wizzy extends Phaser.Physics.Arcade.Sprite {
  public scene: GameScene;
  public body: Phaser.Physics.Arcade.Body;

  constructor(scene: GameScene, x: number, y: number) {
    const texture = "wizard";

    super(scene, x, y, texture);

    Object.entries({
      stand: { frames: [0] },
      walk: { frameRate: 12, frames: [1, 2, 3, 0], repeat: -1 },
    }).forEach(([key, data]) => {
      const { frameRate, frames, repeat } = data;

      this.scene.anims.create({
        key,
        frameRate,
        repeat,
        frames: this.scene.anims.generateFrameNumbers(texture, { frames }),
      });
    });

    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

	this.body.setSize(8, 8).setOffset(4, 20);
    this.body.setAllowDrag(true).setMaxVelocityX(160).setMaxVelocityY(160);

    this
      .setCollideWorldBounds(true)
      .setDragX(Math.pow(16, 2))
      .setDragY(Math.pow(16, 2))
      .setState(States.STANDING);
  }

  public setState(value: States) {
    switch (value) {
      case States.STANDING:
        this.setVelocityX(this.body.velocity.x * 0.5)
			.setVelocityY(this.body.velocity.y * 0.5)
			.play("stand");
        break;

      case States.WALKING:
        this.play("walk");
        break;
    }

    return super.setState(value);
  }

  public preUpdate(time: number, delta: number) {
    const { left, right, down, up } = this.scene.inputs;
    const flipX = left && !right ? true : right ? false : this.flipX;
    const directionX = -Number(left) + Number(right);
    const directionY = -Number(up) + Number(down);
    const accelerationX = directionX * Math.pow(16, 2);
    const accelerationY = directionY * Math.pow(16, 2);

    switch (this.state) {
      case States.STANDING:
        if (left || right || up || down) {
          this.setState(States.WALKING);
        }
        break;

      case States.WALKING:
        this.setFlipX(flipX).setAccelerationX(accelerationX).setAccelerationY(accelerationY);
		if (!left && !right && !up && !down) {
            this.setState(States.STANDING);
        }
        break;
    }

    super.preUpdate(time, delta);
  }
}
