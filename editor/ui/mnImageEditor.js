class mnImageEditor extends mnSplitPaneEditor {
    constructor(model) {
        super(model);

        var _Instance = this;

        this.image_display = new mnImageDisplay(model);
        this.edit_main_pane.appendChild(this.image_display.el);

        // add the delete/save toolstrip
        this.savedel = new mnSaveDelBar(this);
        this.edit_properties_pane.appendChild(this.savedel.el);

        // now let's add the viewSelector
        this.view_selector = new mnViewSelector(this.model, this.image_display);
        this.edit_properties_pane.appendChild(this.view_selector.el);

        // create the name textbox
        this.image_name = new mnLabeledTextbox(language.strings.image_name, function() {
            _Instance.changed();
        });
        this.edit_properties_pane.appendChild(this.image_name.el);
        this.image_name.setValue(this.model.name);

        window.addEventListener('resize', function() {
            // TO-DO: De-uglify the padding subtraction
            _Instance.image_display.resize(_Instance.edit_main_pane.clientWidth, _Instance.edit_main_pane.clientHeight);
            _Instance.view_selector.resize(_Instance.edit_properties_pane.clientWidth - 20, _Instance.edit_properties_pane.clientWidth - 20);
        });
    }
    onBlur(new_destination) {
        // if we have unsaved changes, display a confirmation dialog
        
        if (this.has_changes) {
            return new mnSaveDiscardDialog(this, new_destination);
        } else {
            return new_destination;
        }
    }
    save() {
        super.save();
        this.model.name = this.image_name.getValue();
        this.savedel.enable(false);
        editor.assetsChanged();
        editor.save();
    }
    discard() {
        super.discard();
        var _Instance = this;

        this.image_name.setValue(this.model.name);

        var temp_img = document.createElement('img');
        temp_img.src = this.model.url;

        temp_img.onload = function() {
            _Instance.img_sprite._animation = new mnStaticFullImage(temp_img);            
        };       

        this.savedel.enable(false);
    }
    changed() {
        super.changed();
        this.savedel.enable(true);
    }
}