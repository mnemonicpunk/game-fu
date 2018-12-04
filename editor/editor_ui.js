class mnWidget {
    constructor() {
        this.el = document.createElement('div');
        this.el.className = "";
    }
}

class mnIdentityWIdget extends mnWidget {
    constructor() {
        super();
        this.el.className = 'identity_widget';

        this.user_portrait = document.createElement('div');
        this.user_portrait.className = 'idw_user_portrait';

        this.user_portrait_image = document.createElement('img');
        this.user_portrait_image.className = 'idw_user_portrait_image';
        this.user_portrait_image.src = "editor/anon_icon.png";
        this.user_portrait.appendChild(this.user_portrait_image);

        this.user_badge = document.createElement('div');
        this.user_badge.className = 'idw_user_badge';

        this.user_name = document.createElement('div');
        this.user_name.className = 'idw_user_name';
        this.user_name.innerHTML = "Guest";
        this.user_badge.appendChild(this.user_name);

        this.project_name = document.createElement('div');
        this.project_name.className = 'idw_project_name';
        this.project_name.innerHTML = "Test Project";

        this.el.appendChild(this.user_portrait);
        this.el.appendChild(this.user_badge);
        this.el.appendChild(this.project_name);
    }
}

class mnProjectExplorerItem extends mnWidget {
    constructor(name, handler) {
        super();
        this.item_name = name;
        this.handler = handler;

        this.el = document.createElement('div');
        this.el.className = "project_explorer_item";
        this.el.innerHTML = this.item_name;

        this.el.addEventListener('click', this.handler);
    }
}

class mnProjectExplorerCategory extends mnWidget {
    constructor(name) {
        super();

        var _Instance = this;
        this.state = false;
        this.items = [];

        this.category_name = name;
        this.el = document.createElement('div');
        this.el.className = "project_explorer_category";
        //this.el.innerHTML = this.name;

        this.name = document.createElement('div');
        this.name.className = "project_explorer_category_name";
        this.name.innerHTML = this.category_name;
        this.el.appendChild(this.name);

        this.content = document.createElement('div');
        this.content.className = "project_explorer_category_content";
        this.el.appendChild(this.content);        

        this.update();

        this.name.addEventListener('click', function() {
            _Instance.toggle();
        });
    }
    toggle() {
        this.state = !this.state;
        this.update();
    }
    clear() {
        this.items = [];
    }
    addItem(name, handler) {
        var item = new mnProjectExplorerItem(name, handler);
        this.items.push(item);
    }
    update() {
        this.content.style = this.state?"":"display: none;";

        while (this.content.hasChildNodes()) {
            this.content.removeChild(this.content.firstChild);
        }

        for (var i=0; i<this.items.length; i++) {
            this.content.appendChild(this.items[i].el);
        }
    }
}

class mnProjectExplorer extends mnWidget {
    constructor() {
        super();
        this.el = document.createElement('div');
        this.el.className = "project_explorer";

        this.identity_widget = new mnIdentityWIdget();
        this.el.appendChild(this.identity_widget.el);

        this.categories = {
            project: new mnProjectExplorerCategory(language.strings.categories.project),
            objects: new mnProjectExplorerCategory(language.strings.categories.objects),
            scenes: new mnProjectExplorerCategory(language.strings.categories.scenes),
            animations: new mnProjectExplorerCategory(language.strings.categories.animations),
            images: new mnProjectExplorerCategory(language.strings.categories.images)        
        };

        this.categories.project.addItem(language.strings.general_properties, function() {
            alert("Opening general properties");
        });
        this.categories.project.addItem(language.strings.graphics_settings, {});

        for (var i in this.categories) {
            this.el.appendChild(this.categories[i].el);
        }
    }
    addCategory(category) {
        this.categories.push(category);
        this.updateCategories();
    }
    updateCategories() {
        while (this.el.hasChildNodes()) {
            this.el.removeChild(this.el.firstChild);
        }

        this.el.appendChild(this.identity_widget.el);

        for (var i=0; i<this.categories.length; i++) {
            this.el.appendChild(this.categories[i].el);
        }
    }
    update() {
        for (var i=0; i<this.categories.length; i++) {
            this.categories[i].update();
        }
    }
}

class mnLabelledTextbox extends mnWidget {
    constructor(name, on_change_handler) {
        super();

        var _Instance = this;

        this.el.className = "labelled_textbox";

        this.label = document.createElement('div');
        this.label.className = 'labelled_textbox_label';
        this.label.innerHTML = name;
        this.el.appendChild(this.label);

        this.text = document.createElement('input');
        this.text.type = "text";
        this.text.className = 'labelled_textbox_text';
        this.el.appendChild(this.text);

        this.text.addEventListener('change', function() {
            on_change_handler(_Instance.text.value);
        });
    }
    setValue(val) {
        this.text.value = val;
    }
}

class mnLabelledDropdown extends mnWidget {
    constructor(name, on_change_handler) {
        super();

        var _Instance = this;

        this.el.className = "labelled_textbox";

        this.label = document.createElement('div');
        this.label.className = 'labelled_dropdown_label';
        this.label.innerHTML = name;
        this.el.appendChild(this.label);

        this.dropdown = document.createElement('select');
        this.dropdown.className = 'labelled_dropdown_select';
        this.el.appendChild(this.dropdown);

        this.dropdown.addEventListener('change', function() {
            on_change_handler(_Instance.dropdown.value);
        });
    }
    setValue(val) {
        //this.text.value = val;
    }
    addOption(name, option) {
        var o = document.createElement('option');
        o.innerHTML = name;
        o.value = option;

        this.dropdown.appendChild(o);
    }
}

class mnBasicEditor extends mnWidget {
    constructor() {
        super();
        this.el = document.createElement('div');
        this.el.className = "editor";
    }
}

class mnSplitPaneEditor extends mnBasicEditor {
    constructor() {
        super();
        this.edit_main_pane = document.createElement('div');
        this.edit_main_pane.className = "edit_main_pane";
        this.el.appendChild(this.edit_main_pane);

        this.edit_properties_pane = document.createElement('div');
        this.edit_properties_pane.className = "edit_properties_pane";
        this.el.appendChild(this.edit_properties_pane);   
    }
}

class mnObjectEditor extends mnSplitPaneEditor {
    constructor(obj) {
        super();
        this.obj = obj;

        let object_assets = editor.getAssets('objects');
        let animation_assets = editor.getAssets('animations');

        // create the name textbox
        this.obj_name = new mnLabelledTextbox(language.strings.object_name, function(text) {
            console.log("Value changed to: " + text);
        });
        this.edit_properties_pane.appendChild(this.obj_name.el);
        this.obj_name.setValue(this.obj.name);

        // create the inheritance dropdown
        this.obj_parent = new mnLabelledDropdown(language.strings.parent_object, function(p) {
            console.log("Value changed to: " + p);
        });
        this.obj_parent.addOption(language.strings.no_parent, "none");
        
        for (let i=0; i<object_assets.length; i++) {
            let p = object_assets[i];
            this.obj_parent.addOption(p.name, p.name);
        }
        this.edit_properties_pane.appendChild(this.obj_parent.el);        

        // create the sprite dropdown
        this.obj_animation = new mnLabelledDropdown(language.strings.default_animation, function(anim) {
            console.log("Value changed to: " + anim);
        });
        for (let i=0; i<animation_assets.length; i++) {
            let anim = animation_assets[i];
            this.obj_animation.addOption(anim.name, anim.name);
        }
        this.edit_properties_pane.appendChild(this.obj_animation.el);        
    }
}

class mnSceneEditor extends mnSplitPaneEditor {
    constructor(scene) {
        super();
        this.scene = scene;

        let object_assets = editor.getAssets('objects');

        // create the name textbox
        this.scene_name = new mnLabelledTextbox(language.strings.scene_name, function(text) {
            console.log("Value changed to: " + text);
        });
        this.edit_properties_pane.appendChild(this.scene_name.el);
        this.scene_name.setValue(this.scene.name);

        // create the object selection dropdown
        this.obj_selected = new mnLabelledDropdown(language.strings.selected_object, function(p) {
            console.log("Value changed to: " + p);
        });
        for (let i=0; i<object_assets.length; i++) {
            let p = object_assets[i];
            this.obj_selected.addOption(p.name, p.name);
        }
        this.edit_properties_pane.appendChild(this.obj_selected.el);       
    }
}

class mnAnimationEditor extends mnSplitPaneEditor {
    constructor(anim) {
        super();
        this.anim = anim;

        let image_assets = editor.getAssets('images');

        // create the name textbox
        this.animation_name = new mnLabelledTextbox(language.strings.animation_name, function(text) {
            console.log("Value changed to: " + text);
        });
        this.edit_properties_pane.appendChild(this.animation_name.el);
        this.animation_name.setValue(this.anim.name);

        // create the image selection dropdown
        this.image_selected = new mnLabelledDropdown(language.strings.using_image, function(p) {
            console.log("Value changed to: " + p);
        });
        for (let i=0; i<image_assets.length; i++) {
            let img = image_assets[i];
            this.image_selected.addOption(img.name, img.name);
        }
        this.edit_properties_pane.appendChild(this.image_selected.el);       
    }
}

class mnImageEditor extends mnSplitPaneEditor {
    constructor(img) {
        super();

        var _Instance = this;

        this.img = img;

        this.canvas = document.createElement('canvas');
        this.canvas.style = "width: 100%; height: 100%";
        this.edit_main_pane.appendChild(this.canvas);
        this.render = new mnRender(this.canvas);
        this.render.createLayer('main');
        this.render.setSize(this.edit_main_pane.width, this.edit_main_pane.height);

        var temp_img = document.createElement('img');
        temp_img.src = "https://pbs.twimg.com/media/BuEGY5gIQAAEuZd.png";

        this.img_sprite = this.render.getLayer('main').createSprite();
        this.img_sprite._animation = new mnStaticFullImage(temp_img);

        // create the name textbox
        this.image_name = new mnLabelledTextbox(language.strings.image_name, function(text) {
            console.log("Value changed to: " + text);
        });
        this.edit_properties_pane.appendChild(this.image_name.el);
        this.image_name.setValue(this.img.name);

        // create the url textbox
        this.image_url = new mnLabelledTextbox(language.strings.image_url, function(text) {
            console.log("Value changed to: " + text);
        });
        this.edit_properties_pane.appendChild(this.image_url.el);
        this.image_url.setValue("");

        window.addEventListener('resize', function() {
            _Instance.render.setSize(_Instance.edit_main_pane.clientWidth, _Instance.edit_main_pane.clientHeight);
            _Instance.img_sprite.x = _Instance.edit_main_pane.clientWidth / 2;
            _Instance.img_sprite.y = _Instance.edit_main_pane.clientHeight / 2;
        });

        this.canvas.addEventListener('wheel', (e) => {
            _Instance.wheelZoom(e.deltaY);
        });
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

class mnEditorView extends mnWidget {
    constructor() {
        super();
        this.el = document.createElement('div');
        this.el.className = "editor_view";
    }
    setEditor(editor) {
        while (this.el.hasChildNodes()) {
            this.el.removeChild(this.el.firstChild);
        }

        this.editor = editor;
        this.el.appendChild(this.editor.el);

        window.dispatchEvent(new Event('resize'));
    }
}

class mnEditorUI extends mnWidget {
    constructor() {
        super();
        this.el = document.createElement('div');
        this.el.className = "editor_ui";
    
        this.project_explorer = new mnProjectExplorer();
        this.el.appendChild(this.project_explorer.el);

        this.editor_view = new mnEditorView();
        this.el.appendChild(this.editor_view.el);
    }
    editObject(obj) {
        var obj_editor = new mnObjectEditor(obj);
        this.editor_view.setEditor(obj_editor) ;
    }
    editScene(scene) {
        var scene_editor = new mnSceneEditor(scene);
        this.editor_view.setEditor(scene_editor) ;
    }
    editAnimation(anim) {
        var anim_editor = new mnAnimationEditor(anim);
        this.editor_view.setEditor(anim_editor) ;
    }   
    editImage(img) {
        var img_editor = new mnImageEditor(img);
        this.editor_view.setEditor(img_editor) ;
    }  
    updateProjectExplorer(assets) {
        let _Instance = this;
        let pe = this.project_explorer;

        pe.categories.objects.clear();
        for (let i=0; i<assets.objects.length; i++) {
            let obj = assets.objects[i];
            pe.categories.objects.addItem(obj.name, () => {
                _Instance.editObject(obj);
            });
        }

        pe.categories.scenes.clear();
        for (let i=0; i<assets.scenes.length; i++) {
            let scene = assets.scenes[i];
            pe.categories.scenes.addItem(scene.name, () => {
                _Instance.editScene(scene);
            });
        }

        pe.categories.animations.clear();
        for (let i=0; i<assets.animations.length; i++) {
            let anim = assets.animations[i];
            pe.categories.animations.addItem(anim.name, () => {
                _Instance.editAnimation(anim);
            });
        }

        pe.categories.images.clear();
        for (let i=0; i<assets.images.length; i++) {
            let img = assets.images[i];
            pe.categories.images.addItem(img.name, () => {
                _Instance.editImage(img);
            });
        }

        pe.update();
    }
    assetsChanged(assets) {
        this.updateProjectExplorer(assets);
    }
}