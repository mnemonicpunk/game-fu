class mnImageEditor extends mnSplitPaneEditor {
    constructor(model) {
        super(model);

        var _Instance = this;

        this.image_display = new mnImageDisplay(model);
        this.edit_main_pane.appendChild(this.image_display.el);

        // add the delete/save toolstrip
        this.savedel = new mnSaveDelBar();
        this.savedel.discard_btn.addEventListener('click', function() {
            _Instance.discard();
        });        
        this.savedel.save_btn.addEventListener('click', function() {
            _Instance.save();
        });
        this.edit_properties_pane.appendChild(this.savedel.el);

        // create the name textbox
        this.image_name = new mnLabeledTextbox(language.strings.image_name, function() {
            _Instance.changed();
        });
        this.edit_properties_pane.appendChild(this.image_name.el);
        this.image_name.setValue(this.model.name);

        // now let's add the viewSelector
        this.view_selector = new mnViewSelector(this.model, this.image_display);
        //this.view_selector.setCursorSize(100, 80);
        this.edit_properties_pane.appendChild(this.view_selector.el);

        window.addEventListener('resize', function() {
            _Instance.image_display.resize(_Instance.edit_main_pane.clientWidth, _Instance.edit_main_pane.clientHeight);
            //_Instance.view_selector.resize(1000, 1000);
            _Instance.view_selector.resize(_Instance.edit_properties_pane.clientWidth, _Instance.edit_properties_pane.clientWidth);
            //_Instance.view_selector.setSize(_Instance.edit_properties_pane.clientWidth - 40);
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
        console.dir(this.model);
        this.savedel.enable(false);
        editor.assetsChanged();
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
    wheelZoom(deltaY) {
        console.log(deltaY);
        this.img_sprite.scale_x += deltaY * 0.01;
        this.img_sprite.scale_y += deltaY * 0.01;

        if (this.img_sprite.scale_x < 0.1) {
            this.img_sprite.scale_x = 0.1;
        }
        if (this.img_sprite.scale_y < 0.1) {
            this.img_sprite.scale_y = 0.1;
        }
        if (this.img_sprite.scale_x > 3) {
            this.img_sprite.scale_x = 3;
        }
        if (this.img_sprite.scale_y > 3) {
            this.img_sprite.scale_y = 3;
        }
    }
}