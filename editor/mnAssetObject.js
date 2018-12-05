class mnAssetObject extends mnAsset {
    constructor(name) {
        super(name);
    }
    toData() {
        return {
            name: this.name,
            blocks_xml: ""
        }
    }
}