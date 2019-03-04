class mnAssetImage extends mnAsset {
    constructor(name, url) {
        super(name);
        this.url = url;
    }
    toJSON() {
        return {
            asset_id: this.asset_id,
            name: this.name,
            url: this.url
        };
    } 
    fromJSON(json) {
        this.asset_id = json.asset_id;
        this.name = json.name;
        this.url = json.url;
    }
}