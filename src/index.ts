import Phaser, { Scene, Types } from "phaser";

let player: Types.Physics.Arcade.SpriteWithDynamicBody;
let cursors: Types.Input.Keyboard.CursorKeys;

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {}
    },
    scene: {
        preload,
        create,
        update
    }
});

function preload(this: Scene) {
    this.load.setPath('assets/')
    this.load.spritesheet('char', 'sprites/character.png', {
        frameWidth: 20,
        frameHeight: 40,
        margin: 3,
        spacing: 4
    });
}

function create(this: Scene) {
    player = this.physics.add.sprite(100, 100, 'char', 2);

    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('char', { start: 1, end: 6 }),
        frameRate: 6,
        repeat: -1
    });

    this.anims.create({
        key: 'walkback',
        frames: this.anims.generateFrameNumbers('char', { start: 6, end: 1 }),
        frameRate: 6,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();
}

function update(this: Scene) {
    if (cursors.left.isDown) {
        player.setVelocity(-10, 10);
        player.anims.play('walk', true);
    } else if (cursors.right.isDown) {
        player.setVelocity(10, -10);
        player.anims.play('walkback', true);
    } else {
        player.anims.stop();
        player.setVelocity(0, 0);
    }
}