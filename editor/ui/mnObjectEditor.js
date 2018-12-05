class mnObjectEditor extends mnSplitPaneEditor {
    constructor(obj) {
        super();
        this.obj = obj;

        let object_assets = editor.getAssets('objects');
        let animation_assets = editor.getAssets('animations');

        // create the name textbox
        this.obj_name = new mnLabeledTextbox(language.strings.object_name, function(text) {
            console.log("Value changed to: " + text);
        });
        this.edit_properties_pane.appendChild(this.obj_name.el);
        this.obj_name.setValue(this.obj.name);

        // create the inheritance dropdown
        this.obj_parent = new mnLabeledDropdown(language.strings.parent_object, function(p) {
            console.log("Value changed to: " + p);
        });
        this.obj_parent.addOption(language.strings.no_parent, "none");
        
        for (let i=0; i<object_assets.length; i++) {
            let p = object_assets[i];
            this.obj_parent.addOption(p.name, p.name);
        }
        this.edit_properties_pane.appendChild(this.obj_parent.el);        

        // create the sprite dropdown
        this.obj_animation = new mnLabeledDropdown(language.strings.default_animation, function(anim) {
            console.log("Value changed to: " + anim);
        });
        for (let i=0; i<animation_assets.length; i++) {
            let anim = animation_assets[i];
            this.obj_animation.addOption(anim.name, anim.name);
        }
        this.edit_properties_pane.appendChild(this.obj_animation.el);        
    }
}