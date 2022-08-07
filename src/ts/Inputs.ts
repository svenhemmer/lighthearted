interface Keys {
  W: Phaser.Input.Keyboard.Key;
  A: Phaser.Input.Keyboard.Key;
  S: Phaser.Input.Keyboard.Key;
  D: Phaser.Input.Keyboard.Key;
  Z: Phaser.Input.Keyboard.Key;
  X: Phaser.Input.Keyboard.Key;
  C: Phaser.Input.Keyboard.Key;
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  enter: Phaser.Input.Keyboard.Key;
  space: Phaser.Input.Keyboard.Key;
  comma: Phaser.Input.Keyboard.Key;
  period: Phaser.Input.Keyboard.Key;
}

export default class Inputs {
  private _scene: Phaser.Scene;
  private _keys: Keys;
  
  constructor(scene: Phaser.Scene) {
    this._scene = scene;
    this._keys = this._scene.input.keyboard.addKeys(
      "W,A,S,D,Z,X,C,up,left,down,right,space,enter,comma,period"
    ) as Keys;
  }

  public get keys(): Keys {
    return this._keys;
  }

  public get left(): boolean {
    return this.keys.left.isDown || this.keys.A.isDown;
  }

  public get right(): boolean {
    return this.keys.right.isDown || this.keys.D.isDown;
  }

  public get up(): boolean {
    return this.keys.up.isDown || this.keys.W.isDown;
  }

  public get down(): boolean {
    return this.keys.down.isDown || this.keys.S.isDown;
  }
}
