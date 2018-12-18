class mnAssetImage extends mnAsset {
    constructor(name, url) {
        super(name);
        this.url = url;
    }
    toData() {
        return {
            name: this.name,
            url: this.url
        }
    }    
}