class mnRender {
	constructor(canvas) {
		var _Instance = this;

		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
		this.width = 0;
		this.height = 0;

		this.layers = [];
		this.images = {};

		var _render = function() {
			_Instance.render();
			window.requestAnimationFrame(_render);
		};
		_render();
	}
	setSize(w, h) {
		this.width = w;
		this.height = h;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	}
	render() {
		this.ctx.clearStyle = "#000";
		this.ctx.clearRect(0, 0, this.width, this.height);

		for (var i=0; i<this.layers.length;i++) {
			this.layers[i].render(this.ctx);
		}
	}
	createLayer(name) {
		var layer = new mnRenderLayer(name);
		this.layers.push(layer);
	}
	getLayer(name) {
		for (var i=0;i<this.layers.length;i++) {
			if (this.layers[i].name == name) {
				return this.layers[i];
			}
		}

		return null;
	}
	loadImages(images) {
		console.dir(images);

		// first iterate through all images, chromakeying them if need be
		for (var i in images)  {
			var img = images[i];
			console.dir(img.dataset);
			if (img.dataset.chromaKey != undefined) {
				console.log("Has chroma key, keying");
				img = this.chromaKey(img, img.dataset.chromaKey);
			}
		}

		this.images = images;

		//this.images = images;
	}
	chromaKey(img, key) {
		var canvas = document.createElement('canvas');
		canvas.width = img.width;
		canvas.height = img.height;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0);

		var idata = ctx.getImageData(0, 0, img.width, img.height);

		var c = {
			r: 0,
			g: 0,
			b: 0
		};
		if (key == "top-left") {
			c = {
				r: idata.data[0],
				g: idata.data[1],
				b: idata.data[2]
			};
		} else {
			var components = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(key);
			c = {
				r: parseInt(components[1], 16),
				g: parseInt(components[2], 16),
				b: parseInt(components[3], 16),
			};		
		}

		for (var i=0; i<idata.data.length; i+=4) {
			if ((idata.data[i] == c.r) && (idata.data[i+1] == c.g) && (idata.data[i+2] == c.b)) {
				idata.data[i+3] = 0;
				//console.dir("Pixel set to transparent");
			}
		}
		ctx.putImageData(idata, 0, 0);
		img.src = canvas.toDataURL();
	}
}

class mnAnimation {
	constructor(image) {
		this.image = image;
		this.frames = [];
		this.current_frame = 0;
		this.animation_speed = 1;
		this.animation_location = 0;
		this.animation_length = 0;
	}
	addFrame(x, y, width, height, offset_x, offset_y) {
		if (undefined == offset_x) {
			offset_x = -(width/2);
		}

		if (undefined == offset_y) {
			offset_y = -(height/2);
		}

		this.frames.push({
			'x': x,
			'y': y,
			'width': width,
			'height': height,
			'offset_x': offset_x,
			'offset_y': offset_y
		});
	}
	getImage() {
		return this.image;
	}
	getFrame() {
		if (this.frames.length == 0) {
			return {
				'x': 0,
				'y': 0,
				'width': 0,
				'height': 0,
				'offset_x': 0,
				'offset_y': 0
			};
		}

		return this.frames[this.current_frame];
	}	
	animate(speed) {
		this.animation_location += (this.animation_speed * speed);
		if (this.animation_location >= this.animation_length) {
			this.animation_location = 0;
		}
		if (this.animation_length == 0) {
			this.current_frame = 0;
			return;
		}
		this.current_frame = Math.floor(this.frames.length * (this.animation_location / this.animation_length));
	}
}

class mnStaticFullImage extends mnAnimation {
	constructor(image) {
		super(image);
		this.addFrame(0, 0, this.image.width, this.image.height);

		console.log("Image set to");
		console.dir(this.getImage());
		console.dir(this.getFrame());
	}
}

class mnRenderSprite {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.rotation = 0;
		this.scale_x = 1;
		this.scale_y = 1;
		this.source_x = 0;
		this.source_y = 0;
		this.source_width = 0;
		this.source_height = 0;

		// if the sprite is instructed to render a boundbing box use these variables
		this._render_bounding_box = false;
		this._bb_x = 0;
		this._bb_y = 0;
		this._bb_width = 0;
		this._bb_height = 0;
		this._animation = new mnAnimation();

		this.children = [];
	}
	render(ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation);
		ctx.scale(this.scale_x, this.scale_y);
		//ctx.translate(-(frame.offset_x * this.scale_x), -(frame.offset_y * this.scale_y));

		this.draw(ctx);
		for (var i=0; i<this.children.length;i++) {
			this.children[i].render(ctx);	
		}

		if (this._render_bounding_box) {
			ctx.restore();				
			ctx.save();
			ctx.translate(this.x, this.y);
			this.drawBoundingBox(ctx);
		}

		ctx.restore();
	}
	draw(ctx) {
		var image = this._animation.getImage();

		if (image != null) {
			var frame = this._animation.getFrame();
			ctx.drawImage(image, frame.x, frame.y, frame.width, frame.height, frame.offset_x, frame.offset_y, frame.width, frame.height);
		}
	}
	drawBoundingBox(ctx) {
		ctx.strokeStyle = "#f00";
		ctx.strokeRect(this._bb_x, this._bb_y, this._bb_width, this._bb_height);	
	}
	addChild(child) {
		this.children.push(child);
	}
	setImage(image) {
		this._animation = new mnStaticFullImage(image);
	}
	setSource(source_x, source_y, source_width, source_height) {
		this.source_x = source_x;
		this.source_y = source_y;
		this.source_width = source_width;
		this.source_height = source_height;
	}
	animate(speed) {
		this._animation.animate(speed);
	}
}

class mnRenderLayer extends mnRenderSprite {
	constructor(name) {
		super();
		this.name = name;
	}
	createSprite() {
		var s = new mnRenderSprite();
		this.children.push(s);
		return s;
	}
	removeSprite(sprite) {
		this.sprites = this.sprites.splice(this.sprites.indexOf(sprite), 1);
	}
}