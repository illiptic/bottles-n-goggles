import { GameObjects, Physics, Scene, Types } from "phaser";

const SPEED = 40;

export function attachCharacterToScene(scene: Scene, x: number, y: number) {
    const char = new Character(scene, x, y);
    scene.add.existing(char);
    scene.physics.add.existing(char);

    return char;
}

export default class Character extends Physics.Arcade.Sprite {
    cursors: Types.Input.Keyboard.CursorKeys;

    constructor(scene: Scene, x: number, y: number) {
        super(scene, x, y, 'char');

        this.setTexture('char');
        this.setScale(2,2);
        this.setPosition(x, y);

        scene.anims.create({
            key: 'walk',
            frames: scene.anims.generateFrameNumbers('char', { start: 0, end: 5 }),
            frameRate: 12,
            repeat: -1
        });
    
        scene.anims.create({
            key: 'walkback',
            frames: scene.anims.generateFrameNumbers('char', { start: 6, end: 11 }),
            frameRate: 12,
            repeat: -1
        });

        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    preUpdate(time: number, delta: number) {
        super.preUpdate(time, delta);

        if (this.cursors.left.isDown) {
            this.setVelocity(-SPEED, SPEED);
            this.anims.play('walk', true);
            this.setFlipX(false);
        } else if (this.cursors.right.isDown) {
            this.setVelocity(SPEED, -SPEED);
            this.anims.play('walkback', true);
            this.setFlipX(true);
        } else if (this.cursors.up.isDown) {
            this.setVelocity(-SPEED, -SPEED);
            this.anims.play('walkback', true);
            this.setFlipX(false);
        } else if (this.cursors.down.isDown) {
            this.setVelocity(SPEED, SPEED);
            this.anims.play('walk', true);
            this.setFlipX(true);
        } else {
            this.anims.stop();
            this.setVelocity(0, 0);
        }
    }
}