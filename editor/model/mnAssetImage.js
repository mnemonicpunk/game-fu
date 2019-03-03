class mnAssetImage extends mnAsset {
    constructor(name, url) {
        super(name);
        this.url = url;
    }
    toJSON() {
        return {
            name: this.name,
            url: this.url
        };
    } 
    fromJSON(json) {
        this.name = json.name;
        this.url = json.url;
    }
}