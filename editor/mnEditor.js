class mnEditor {
    constructor() {
        var _Instance = this;

        this.project = new mnProject();
        this.storage = new mnStorage();
        this.ui = new mnEditorUI();

        this.project.name = "Unnamed Project";

        this.assetsChanged();

        this.ui.el.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        this.ui.el.addEventListener('drop', (e) => {
            e.preventDefault();
            for (var i=0; i<e.dataTransfer.items.length; i++) {
                var f = e.dataTransfer.items[i].getAsFile();
                _Instance.createAssetFromFile(f);
            }
            e.dataTransfer.clearData();
        });          
    }
    assetsChanged() {
        this.ui.assetsChanged(this.project.assets);
    }
    addAsset(category, asset) {
        this.project.addAsset(category, asset);
        this.assetsChanged();
        return asset;
    }
    getAssets(category) {
        return this.project.assets[category];
    }
    save() {
        // grab project in a saveable state
        var p = this.project.toData();

        // put it into storage
        this.storage.saveProject(p);
        console.dir(p);
    }
    load() {

    }
    isAssetNameAvailable(category, name) {
        var cat = this.project.assets[category];
        console.log("Testing name: " + name);
        for (var i=0; i<cat.length; i++) {
            if (cat[i].name == name) {
                return false;
            }
        }
        return true;
    }
    createAssetName(category) {
        let n = language.strings.unnamed + " " + language.strings.category[category];
        if (this.isAssetNameAvailable(category, n)) {
            return n;
        }
        let counter = 1;
        while (true) {
            if (this.isAssetNameAvailable(category, n+counter)) {
                return n+counter.toString();
            }
            counter++;
        }
    }
    createAssetFromFile(f) {
        var _Instance = this;

        console.log("File dropped:");
        console.dir(f);

        // is it an image file?
        if (f.type.startsWith("image")) {
            let fr = new FileReader();
            fr.readAsDataURL(f);
            fr.onload = function() {
                let asset_image = new mnAssetImage(_Instance.createAssetName("images"), this.result);
                console.dir(asset_image);
                _Instance.addAsset("images", asset_image);
            };
        }
    }
}