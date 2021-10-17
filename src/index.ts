import Phaser, { Scene, Types } from "phaser";
import Character, { attachCharacterToScene } from "./character";

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  antialias: false,
  physics: {
    default: "arcade",
    arcade: {},
  },
  scene: {
    preload,
    create,
    update,
  },
});

function preload(this: Scene) {
  this.load.setPath("assets/");
  this.load.spritesheet("char", "sprites/character.png", {
    frameWidth: 20,
    frameHeight: 40,
    margin: 2,
    spacing: 4,
  });
  this.load.image("background", "bg.jpg");
}

function create(this: Scene) {
  const background = this.add.image(0, 0, "background");
  background.setOrigin(0, 0);
  background.setPosition(0, 0);
  background.setScale(1.42, 1.42);
  background.setSize(this.renderer.width, this.renderer.height);

  attachCharacterToScene(this, 100, 100);
}

function update(this: Scene) {}
