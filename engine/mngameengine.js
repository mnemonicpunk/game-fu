class mnGameEngine {
	constructor(canvas, screen_width, screen_height) {
		var _Instance = this;

		// first we need to extract our images from the HTML to be able to use them without cumbersome query selector shenanigans moving forward
		this.images = {};
		this.importImages();

		console.dir(this.images);

		// initialize renderer
		this.renderer = new mnRender(canvas);
		this.renderer.setSize(screen_width, screen_height);
		this.renderer.createLayer("main");
		this.renderer.loadImages(this.images);

		// initialize controls
		this.controls = new mnControls(canvas);

		this.scene = null;

		var _tick = function() {
			if (_Instance.running == true) {
				_Instance.tick();	
			}
			window.setTimeout(_tick, (1000/60));
		};
		_tick();

		this.setScene(start_scene);
		this.running(true);
	}
	tick() {
		if (this.scene != null) {
			this.scene.tick(this.controls);
		}
		this.controls.update();
	}
	running(state) {
		this.running = state;
	}
	setScene(scene_class) {
		this.scene = new scene_class(this.renderer);
		this.scene.createSprite(this.renderer);
		this.scene.create();
	}
	importImages() {
		// import basic images
		var img_sel = document.querySelector("#image_imports");
		var images = {};
		for (var i=0; i<img_sel.children.length; i++) {
			var img = img_sel.children[i];
			images[img.id] = img;
		}

		this.images = images;
	}
}

class mnGameObject {
	constructor() {
		this.sprite = null;
		this.x = 0;
		this.y = 0;
		this.direction = 0;
		this.has_collision = false;		

		this._bb_x = 0;
		this._bb_y = 0;
		this._bb_width = 0;
		this._bb_height = 0;
		this._collides_with = [];
		this._tags = [];
	}
	_updateSprite() {
		this.sprite.x = this.x;
		this.sprite.y = this.y;
		this.sprite.rotation = (this.direction / 360);

		// if we ever need to adjust the speed of animation we can do that by changing the variable we pass in here
		this.sprite.animate(1);
	}
	_checkCollisions(scene)	{
		this._collides_with = [];
		if (!this.has_collision) {
			return;
		}

		for (var i=0; i<scene.objects.length; i++) {
			if ((scene.objects[i] === this) || (!scene.objects[i].has_collision)) { continue; }

			var other = scene.objects[i];
			var intersects  = true;

			var l1 = {
				'x': this._bb_x + this.x,
				'y': this._bb_y + this.y
			};

			var r1 = {
				'x': this._bb_x + this.x + this._bb_width,
				'y': this._bb_y + this.y + this._bb_height
			};

			var l2 = {
				'x': other._bb_x + other.x,
				'y': other._bb_y + other.y
			};

			var r2 = {
				'x': other._bb_x + other.x + other._bb_width,
				'y': other._bb_y + other.y + other._bb_height
			};			

		    // If one rectangle is on left side of other 
		    if ((l1.x > r2.x) || (l2.x > r1.x)) {
		    	intersects = false; 
		    }
		  
		    // If one rectangle is above other 
		    if ((l1.y > r2.y) || (l2.y > r1.y)) {
		    	intersects = false; 
		    }

			if (intersects == true) {
				this._collides_with.push(other);
			}

		}
	}
	_doCollisions(scene) {
		for (var i=0; i<this._collides_with.length; i++) {
			this.collisionWith(this._collides_with[i]);
		}
	}
	createSprite(renderer) {
		this.sprite = renderer.getLayer("main").createSprite();
	}
	removeSprite(renderer) {
		renderer.getLayer("main").removeSprite(this.sprite);
	}
	setBoundingBox(x_offset, y_offset, width, height) {
		this._bb_x = x_offset;
		this._bb_y = y_offset;
		this._bb_width = width;
		this._bb_height = height;

		this.sprite._bb_x = this._bb_x;
		this.sprite._bb_y = this._bb_y;
		this.sprite._bb_width = this._bb_width;
		this.sprite._bb_height = this._bb_height;
	}
	create() {

	}
	collisionWith(obj) {

	}
	tick(scene) {

	}
	addTag(tag) {
		if (!this.hasTag(tag)) {
			this._tags.push(tag);
		}
	}
	hasTag(tag) {
		return this._tags.includes(tag);
	}
}

class mnGameScene extends mnGameObject {
	constructor(renderer) {
		super(renderer);
		this.objects = [];
		this.renderer = renderer;
	}
	create() {

	}
	createObject(obj_class) {
		var obj = new obj_class();
		obj.createSprite(this.renderer);
		this.objects.push(obj);
		obj.create(this);

		return obj;
	}
	removeObject(obj) {
		this.objects = this.objects.splice(this.objects.indexOf(obj), 1);
		obj.removeSprite(this.renderer);
	}
	tick(controls) {
		// first execute object game logic
		for (var i=0; i<this.objects.length; i++) {
			this.objects[i].tick(this, controls);
		}

		// now check for collisions making a list of objects we collided with
		for (var i=0; i<this.objects.length; i++) {
			this.objects[i]._checkCollisions(this);
		}

		// now that we know who collides with whom we can actually act on it
		for (var i=0; i<this.objects.length; i++) {
			this.objects[i]._doCollisions(this);
		}

		// then update object sprites
		for (var i=0; i<this.objects.length; i++) {
			this.objects[i]._updateSprite();
		}
	}
}