class mnAssetAnimation extends mnAsset {
    constructor(name) {
        super(name);

        // the image asset we're going to use for this animation
        this.image = null;

        // the frame data for the animation, does not depend on image
        this.frames = [];
    }
    toJSON() {
        return {
            asset_id: this.asset_id,
            name: this.name,
            image: this.image,
            frames: this.frames
        };
    }
    fromJSON(json) {
        this.asset_id = json.asset_id;
        this.name = json.name;
        this.image = json.image;
    }
    addFrame(x, y, width, height, offset_x, offset_y) {
        this.frames.push({
			'x': x,
			'y': y,
			'width': width,
			'height': height,
			'offset_x': offset_x,
			'offset_y': offset_y
		});
    }
    setImage(image) {
        this.image = image;
    }
    getImage() {
        return this.image;
    }
    getFrame(index) {
        return this.frames[index];
    }
    setFrame(index, frame) {
        // make sure the frame exists
        if (this.frames[index] == undefined) { return; }

        this.frames[index] = frame;
    }    
}