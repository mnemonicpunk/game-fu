class mnAnimationEditor extends mnSplitPaneEditor {
    constructor(anim) {
        super();
        var _Instance = this;

        this.anim = anim;

        let image_assets = editor.getAssets('images');

        // create the name textbox
        this.animation_name = new mnLabeledTextbox(language.strings.animation_name, function(text) {
            console.log("Value changed to: " + text);
        });
        this.edit_properties_pane.appendChild(this.animation_name.el);
        this.animation_name.setValue(this.anim.name);

        // create the image selection dropdown
        this.image_selected = new mnLabeledDropdown(language.strings.using_image, function(p) {
            console.log("Value changed to: " + p);
        });
        for (let i=0; i<image_assets.length; i++) {
            let img = image_assets[i];
            this.image_selected.addOption(img.name, img.name);
        }
        this.edit_properties_pane.appendChild(this.image_selected.el); 
        
        this.seek_widget = new mnSeekWidget();
        this.seek_widget.setPosition(0);
        this.seek_widget.setMaxPosition(19);

        this.edit_properties_pane.appendChild(this.seek_widget.el);

        this.vs = new mnViewSelector();
        this.edit_properties_pane.appendChild(this.vs.el);
        this.vs.setSize(0);
        this.vs.setCursorSize(100, 80);
        
        window.addEventListener('resize', function() {
            _Instance.vs.setSize(_Instance.edit_properties_pane.clientWidth - 40);
        });
    }
}