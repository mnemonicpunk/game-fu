class mnObjectEditor extends mnSplitPaneEditor {
    constructor(model) {
        super(model);
        var _Instance = this;

        this.working_model = {
            name: model.name,
            anim: model.anim,
            blocks_xml: model.blocks_xml,
            parent_obj: model.parent_obj,
            code: model.code
        }

        let object_assets = editor.getAssets('objects');
        let animation_assets = editor.getAssets('animations');

        // create the blockly container
        this.blocks_frame = document.createElement('div');
        this.blocks_frame.style = "width: 100%; height: 100%;";
        this.edit_main_pane.appendChild(this.blocks_frame);

        this.blocks_container = document.createElement('div');
        this.blocks_container.style = "position: absolute;";
        this.edit_main_pane.appendChild(this.blocks_container);

        this.blocks_workspace = null;
        this.blockly_injected = false;

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
        this.obj_name = new mnLabeledTextbox(language.strings.object_name, function(text) {
            _Instance.working_model.name = text;
            _Instance.changed();
        });
        this.edit_properties_pane.appendChild(this.obj_name.el);

        // create the inheritance dropdown
        this.obj_parent = new mnLabeledDropdown(language.strings.parent_object, function(p) {
            if (p == "none") {
                _Instance.working_model.parent_obj = null;
            } else {
                _Instance.working_model.parent_obj = p;
            }
            
            _Instance.changed();
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
            _Instance.changed();
        });
        for (let i=0; i<animation_assets.length; i++) {
            let anim = animation_assets[i];
            this.obj_animation.addOption(anim.name, anim.name);
        }
        this.edit_properties_pane.appendChild(this.obj_animation.el);  
        
        window.addEventListener('resize', function(e) {
            _Instance.injectBlockly();
            _Instance.resizeBlockly(e);
        });        

        this.update();
    }
    update() {
        super.update();

        // TO-DO: Finish up the updating part here...
        this.obj_name.setValue(this.working_model.name);
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
        this.model.name = this.working_model.name;
        this.model.anim = this.working_model.anim;
        this.model.blocks_xml = this.working_model.blocks_xml;
        this.model.parent_obj = this.working_model.parent_obj;
        this.model.code = this.working_model.code;
        this.savedel.enable(false);
        editor.assetsChanged();
    }
    discard() {
        super.discard();
        var _Instance = this;

        this.working_model.name = this.model.name;
        this.working_model.anim = this.model.anim;
        this.working_model.blocks_xml = this.model.blocks_xml;
        this.working_model.parent_obj = this.model.parent_obj;
        this.working_model.code = this.model.code;
        this.savedel.enable(false);
        this.update();
    }
    changed() {
        super.changed();
        this.savedel.enable(true);
    }      
    injectBlockly() {
        if (!this.blockly_injected) {
            this.blocks_workspace = Blockly.inject(this.blocks_container, { toolbox: document.getElementById('toolbox') });
            this.resizeBlockly();
            Blockly.svgResize(this.blocks_workspace);
            this.blockly_injected = true;

            var _Instance = this;
            this.blocks_workspace.addChangeListener(function(e) {
                if (e.type == "ui") { return; }
                let ws = _Instance.blocks_workspace;
                console.dir(Blockly.JavaScript.workspaceToCode(ws));
            });
        }
    }
    resizeBlockly() {
        this.blocks_container.style.left = (this.blocks_frame.offsetLeft) + 'px';
        this.blocks_container.style.top = (this.blocks_frame.offsetTop) + 'px';
        this.blocks_container.style.width = this.blocks_frame.offsetWidth + 'px';
        this.blocks_container.style.height = this.blocks_frame.offsetHeight + 'px';
        Blockly.svgResize(this.blocks_workspace);
    }
    blocksToXML() {
        var xml = Blockly.Xml.workspaceToDom(this.blocks_workspace);
        var xml_text = Blockly.Xml.domToText(xml);
        return xml_text;
    }
    blocksToJS() {
        return Blockly.JavaScript.workspaceToCode(this.blocks_workspace);
    }
}