class mnObjectEditor extends mnSplitPaneEditor {
    constructor(model) {
        super(model);
        var _Instance = this;

        this.obj = model;

        let object_assets = editor.getAssets('objects');
        let animation_assets = editor.getAssets('animations');

        // create the blockly container
        this.blocks_frame = document.createElement('div');
        this.blocks_frame.style = "width: 100%; height: 100%;";
        this.edit_main_pane.appendChild(this.blocks_frame);

        this.blocks_container = document.createElement('div');
        this.blocks_container.style = "position: absolute;";
        this.edit_main_pane.appendChild(this.blocks_container);

        this.blocks_toolbox = '<xml>';
        this.blocks_toolbox += '  <block type="controls_if"></block>';
        this.blocks_toolbox += '  <block type="controls_whileUntil"></block>';
        this.blocks_toolbox += '</xml>';

        this.blocks_workspace = null;
        this.blockly_injected = false;

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
        
        window.addEventListener('resize', function(e) {
            _Instance.injectBlockly();
            _Instance.resizeBlockly(e);
        });        
    }
    injectBlockly() {
        if (!this.blockly_injected) {
            this.blocks_workspace = Blockly.inject(this.blocks_container, { toolbox: document.getElementById('toolbox') });
            this.resizeBlockly();
            Blockly.svgResize(this.blocks_workspace);
            this.blockly_injected = true;
        }
    }
    resizeBlockly() {
        this.blocks_container.style.left = (this.blocks_frame.offsetLeft) + 'px';
        this.blocks_container.style.top = (this.blocks_frame.offsetTop) + 'px';
        this.blocks_container.style.width = this.blocks_frame.offsetWidth + 'px';
        this.blocks_container.style.height = this.blocks_frame.offsetHeight + 'px';
        Blockly.svgResize(this.blocks_workspace);
    }
}