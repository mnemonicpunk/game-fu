class mnAssetAnimation extends mnAsset {
    constructor(name) {
        super(name);
    }
    toData() {
        return {
            name: this.name,
            image: null,
            frames: []
        }
    }    
}