// Das ist unsere Anfangsszene
class StartingScene extends mnGameScene {
	create() {
		this.sprite.setImage(document.querySelector("#bg_img"));
		this.sprite.x = (1920 / 2);
		this.sprite.y = (1080 / 2);

		// wenn die Szene erstellt wird fügen wir einen Yoshi ein
		this.createObject(Yoshi);

		for (var i=0; i<5; i++) {
			var block = this.createObject(Block);
			block.x = Math.random() * 1920;
			block.y = Math.random() * 1080;
		}
	}
}

class YoshiAnimation extends mnAnimation {
	constructor() {
		var image = document.querySelector("#yoshi_anim2");

		var w = 31;
		var h = 38;

		super(image);
		for (var i=0; i<6; i++) {
			this.addFrame(i * w, 2*h, w, h, -(w/2) + 3, -(h/2));
		}
		this.animation_length = 50;
	}
}

class Yoshi extends mnGameObject {
	// Das hier passiert wenn unser Yoshi erstellt wird
	create(scene) {
		// Hier weisen wir dem Yoshi Objekt das Bild eines Yoshi zu, die Formulierung wird noch vereinfacht
		//this.sprite.setImage(document.querySelector("#yoshi_img"));
		this.sprite._animation = new YoshiAnimation();

		// Hier setzen wir den Yoshi auf die obere linke Bildschirmecke
		this.x = 100;
		this.y = 100;
		this.sprite.scale_x = 4;
		this.sprite.scale_y = 4;

		this.setBoundingBox(-48, -48, 96, 112);
		//this.sprite._render_bounding_box = true;

		this.has_collision = true;
		this.sprite._render_bounding_box = true;
	}
	// Das hier wird immer ausgeführt
	tick(scene, controls) {
		var move_speed = 8;

		this.old_x = this.x;
		this.old_y = this.y;

		if (controls.key("arrow_left")) {
			this.x -= move_speed;
		}
		if (controls.key("arrow_right")) {
			this.x += move_speed;
		}
		if (controls.key("arrow_down")) {
			this.y += move_speed;
		}
		if (controls.key("arrow_up")) {
			this.y -= move_speed;
		}
	}
	collisionWith(obj) {
		// if we are inside a solid object, return to previous position
		if (obj.hasTag("solid")) {
			this.x = this.old_x;
			this.y = this.old_y;

			//this.direction += 1;
		}
	}
}

class Block extends mnGameObject {
	create() {
		this.sprite.setImage(document.querySelector("#block_img"));
		this.sprite.scale_x = 0.5;
		this.sprite.scale_y = 0.5;
		this.setBoundingBox(-62, -62, 125, 125);
		//this.sprite._render_bounding_box = true;

		this.has_collision = true;
		this.addTag("solid");
	}
	tick(scene, controls) {

	}
}

// Damit die Engine weiß womit das Spiel beginnt legen wir eine Start Scene fest
var start_scene = StartingScene;