class mnAssetObject extends mnAsset {
    constructor(name) {
        super(name);

        this.anim = "";
        this.blocks_xml = "";
        this.parent_obj = "";
        this.code = "";
    }
    toJSON() {
        return {
            name: this.name,
            anim: this.anim,
            blocks_xml: this.blocks_xml,
            parent_obj: this.parent_obj,
            code: this.code
        };
    }
    fromJSON(json) {
        this.name = json.name;
        this.anim = json.anim;
        this.blocks_xml = json.blocks_xml;
        this.parent_obj = json.parent_obj;
        this.code = json.code;
    }

}