class mnAssetScene extends mnAsset {
    constructor(name) {
        super(name);
    }
    toData() {
        return {
            name: this.name,
            objects: []
        }
    }
}