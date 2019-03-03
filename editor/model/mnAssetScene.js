class mnAssetScene extends mnAsset {
    constructor(name) {
        super(name);
    }
    toJSON() {
        return {
            name: this.name,
            objects: []
        };
    }
    fromJSON(json) {
        this.name = json.name;
        this.object = json.objects;
    }
}