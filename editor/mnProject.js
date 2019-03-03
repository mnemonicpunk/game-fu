class mnProject {
    constructor(my_data) {
        this.name = "unnamed";
        this.safe_name = "";
        this.assets = {
            objects: [],
            scenes: [],
            animations: [],
            images: []
        };

        if (undefined !== my_data) {
            console.log("Generating project from data");
            this.fromData(my_data);
        }
    }
    addAsset(category, asset) {
        if (this.assets[category]) {
            this.assets[category].push(asset);
            return asset;
        }
    }
    generateSafeName(test_name) {
        // this function sanitizes the chosen project name to something we know can be stored as a localStorage key
        const safe_character = "abcdefghijklmnopqrstuvwxyz0123456789_";

        var name = test_name.toLowerCase();
        var n = "";

        for (var i=0; i<name.length; i++) {
            var c = name[i];
            if (c == " ") {
                c = "_";
            }
            if (safe_character.indexOf(c) != -1) {
                n+=c;
            }
        }

        return n;
    }
    fromData(data) {
        console.dir(data);
        this.name = data.meta.name;
        this.safe_name = data.meta.safe_name;
        //this.assets = my_data.assets;

        let data_assets = {};
        for (let cat in this.assets) {
            let asset_class = null;
            let asset_category = [];
            switch (cat) {
                case "objects":
                    asset_class = mnAssetObject;
                    break;
                case "scenes":
                    asset_class = mnAssetScene;
                    break;
                case "animations":
                    asset_class = mnAssetAnimation
                    break;
                case "images":
                    asset_class = mnAssetImage;
                    break;
            }

            for (let i=0; i<data.assets[cat].length; i++) {
                /*console.dir({
                    'class': asset_class,
                    'asset': data.assets[cat][i]
                });*/

                let next_asset = new asset_class();
                next_asset.fromJSON(data.assets[cat][i]);
                asset_category.push(next_asset);
            }

            data_assets[cat] = asset_category;
        }
        console.dir(data_assets);
        this.assets = data_assets;
    }
    toData() {
        // not much metadata here yet
        var meta = {
            name: this.name,
            safe_name: this.generateSafeName(this.name),
        }

        var assets = {};
        for (let cat in this.assets) {
            let a = this.assets[cat];
            let a_json = [];

            for (let i=0; i<a.length; i++) {
                a_json.push(a[i].toJSON());
            }
            assets[cat] = a_json;

            if (a_json == []) {
                console.log("[NOTICE] Category " + cat + " had no assets to serialize.");
            }
        }

        return {
            meta: meta,
            assets: assets
        };
    }
}