class mnEditor {
    constructor() {
        this.project = new mnProject();
        this.storage = new mnStorage();
        this.ui = new mnEditorUI();

        this.project.name = "Unnamed Project";

        this.assetsChanged();
    }
    assetsChanged() {
        this.ui.assetsChanged(this.project.assets);
    }
    addAsset(category, asset) {
        this.project.addAsset(category, asset);
        this.assetsChanged();
    }
    getAssets(category) {
        return this.project.assets[category];
    }
    save() {
        // grab project in a saveable state
        var p = this.project.toData();
        console.log(p);

        // put it into storage
        this.storage.saveProject(p);
        console.dir(localStorage);
    }
    load() {

    }
}