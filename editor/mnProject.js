class mnProject {
    constructor() {
        this.name = "";
        this.safe_name = "";
        this.assets = {
            objects: [],
            scenes: [],
            animations: [],
            images: []
        };
    }
    addAsset(category, asset) {
        if (this.assets[category]) {
            this.assets[category].push(asset);
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
        }

        return {
            meta: meta,
            assets: assets
        };
    }
}