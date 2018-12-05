class mnAssetImage extends mnAsset {
    constructor(name) {
        super(name);
    }
    toData() {
        return {
            name: this.name,
            url: ""
        }
    }    
}