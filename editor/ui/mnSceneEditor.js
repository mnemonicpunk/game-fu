class mnSceneEditor extends mnSplitPaneEditor {
    constructor(scene) {
        super();
        this.scene = scene;

        let object_assets = editor.getAssets('objects');

        // create the name textbox
        this.scene_name = new mnLabeledTextbox(language.strings.scene_name, function(text) {
            console.log("Value changed to: " + text);
        });
        this.edit_properties_pane.appendChild(this.scene_name.el);
        this.scene_name.setValue(this.scene.name);

        // create the object selection dropdown
        this.obj_selected = new mnLabeledDropdown(language.strings.selected_object, function(p) {
            console.log("Value changed to: " + p);
        });
        for (let i=0; i<object_assets.length; i++) {
            let p = object_assets[i];
            this.obj_selected.addOption(p.name, p.name);
        }
        this.edit_properties_pane.appendChild(this.obj_selected.el);       
    }
}