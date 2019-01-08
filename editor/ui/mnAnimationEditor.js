class mnAnimationEditor extends mnSplitPaneEditor {
    constructor(model) {
        super(model);
        var _Instance = this;

        this.anim = model;
        this.working_model = {
            frames: [],
            image: null,
            name: null
        }
        this.current_frame = 0;
        
        let image_assets = editor.getAssets('images');

        if (model.image == null) {
            model.image = image_assets[0];
        }

        this.image_display = new mnAnimationDisplay(model);
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

        // now let's add the viewSelector
        this.view_selector = new mnViewSelector(this.model.image, this.image_display);
        this.edit_properties_pane.appendChild(this.view_selector.el);

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
        this.seek_widget.setMaxPosition(this.working_model.frames.length);

        this.edit_properties_pane.appendChild(this.seek_widget.el);

        // also add the frame tools
        this.frame_tools = document.createElement('div');
        this.frame_tools.className = 'frame_tools';

        this.frame_tools_add = document.createElement('div');
        this.frame_tools_add.innerHTML = "<i class=\"far fa-plus-square\"></i> Add";
        this.frame_tools_add.className = 'frame_tools_button';

        this.frame_tools_remove = document.createElement('div');
        this.frame_tools_remove.innerHTML = "<i class=\"far fa-minus-square\"></i> Remove";
        this.frame_tools_remove.className = 'frame_tools_button';

        this.frame_tools.appendChild(this.frame_tools_add);
        this.frame_tools.appendChild(this.frame_tools_remove);
        this.edit_properties_pane.appendChild(this.frame_tools);


        window.addEventListener('resize', function() {
            // TO-DO: De-uglify the padding subtraction
            _Instance.image_display.resize(_Instance.edit_main_pane.clientWidth - 20, _Instance.edit_main_pane.clientHeight - 20);
            _Instance.view_selector.resize(_Instance.edit_properties_pane.clientWidth - 20, _Instance.edit_properties_pane.clientWidth - 20);
        });
    }
    save() {
        super.save();
        this.model.frames = this.working_model.frames;
        this.model.name = this.working_model.name;
        this.model.image = this.working_model.image;        
    }
    discard() {
        super.discard();
        this.working_model.frames = this.model.frames;
        this.working_model.name = this.model.name;
        this.working_model.image = this.model.image;
    }
    plusFrame() {
        var f = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            offset_x: 0,
            offset_y: 0
        }
        this.working_model.frames.push(f);
    }
    minusFrame() {

    }
}