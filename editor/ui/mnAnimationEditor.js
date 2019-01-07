class mnAnimationEditor extends mnSplitPaneEditor {
    constructor(model) {
        super(model);
        var _Instance = this;

        this.anim = model;
        
        let image_assets = editor.getAssets('images');

        if (model.image == null) {
            model.image = image_assets[0];
        }

        this.image_display = new mnAnimationDisplay(model);
        this.edit_main_pane.appendChild(this.image_display.el);        

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

        // now let's add the viewSelector
        this.view_selector = new mnViewSelector(this.model.image, this.image_display);
        this.edit_properties_pane.appendChild(this.view_selector.el);

        window.addEventListener('resize', function() {
            // TO-DO: De-uglify the padding subtraction
            _Instance.image_display.resize(_Instance.edit_main_pane.clientWidth - 20, _Instance.edit_main_pane.clientHeight - 20);
            _Instance.view_selector.resize(_Instance.edit_properties_pane.clientWidth - 20, _Instance.edit_properties_pane.clientWidth - 20);
        });
    }
}