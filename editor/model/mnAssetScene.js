class mnAssetScene extends mnAsset {
    constructor(name) {
        super(name);
    }
    toJSON() {
        return {
            asset_id: this.asset_id,
            name: this.name,
            objects: []
        };
    }
    fromJSON(json) {
        this.asset_id = json.asset_id;
        this.name = json.name;
        this.object = json.objects;
    }
}