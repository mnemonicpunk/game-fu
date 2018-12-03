class mnWidget {
    constructor() {
        this.el = document.createElement('div');
        this.el.className = "";
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

        this.categories = {
            project: new mnProjectExplorerCategory("Project"),
            objects: new mnProjectExplorerCategory("Objects"),
            scenes: new mnProjectExplorerCategory("Scenes"),
            animations: new mnProjectExplorerCategory("Animations"),
            images: new mnProjectExplorerCategory("Images")        
        };

        this.categories.project.addItem("General Properties", function() {
            alert("Opening general properties");
        });
        this.categories.project.addItem("Graphics Settings", {});

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

class mnObjectEditor extends mnBasicEditor {
    constructor(obj) {
        super();
        this.obj = obj;

        this.edit_object_code = document.createElement('div');
        this.edit_object_code.className = "edit_main_pane";
        this.el.appendChild(this.edit_object_code);

        this.edit_object_properties = document.createElement('div');
        this.edit_object_properties.className = "edit_properties_pane";
        this.el.appendChild(this.edit_object_properties);

        // create the name textbox
        this.obj_name = new mnLabelledTextbox("Object Name", function(text) {
            console.log("Value changed to: " + text);
        });
        this.edit_object_properties.appendChild(this.obj_name.el);
        this.obj_name.setValue(this.obj.name);

        // create the inheritance dropdown
        this.obj_parent = new mnLabelledDropdown("Parent Object", function(p) {
            console.log("Value changed to: " + p);
        });
        this.obj_parent.addOption("[no parent]", "none");
        for (var i=0; i<editor.assets.objects.length; i++) {
            var p = editor.assets.objects[i];
            this.obj_parent.addOption(p.name, p.name);
        }
        this.edit_object_properties.appendChild(this.obj_parent.el);        

        // create the sprite dropdown
        this.obj_animation = new mnLabelledDropdown("Default Animation", function(anim) {
            console.log("Value changed to: " + anim);
        });
        for (var i=0; i<editor.assets.animations.length; i++) {
            var anim = editor.assets.animations[i];
            this.obj_animation.addOption(anim.name, anim.name);
        }
        this.edit_object_properties.appendChild(this.obj_animation.el);        
    }
}

class mnSceneEditor extends mnBasicEditor {
    constructor(scene) {
        super();
        this.scene = scene;

        this.edit_scene_layout = document.createElement('div');
        this.edit_scene_layout.className = "edit_main_pane";
        this.el.appendChild(this.edit_scene_layout);

        this.edit_scene_properties = document.createElement('div');
        this.edit_scene_properties.className = "edit_properties_pane";
        this.el.appendChild(this.edit_scene_properties);

        // create the name textbox
        this.scene_name = new mnLabelledTextbox("Scene Name", function(text) {
            console.log("Value changed to: " + text);
        });
        this.edit_scene_properties.appendChild(this.scene_name.el);
        this.scene_name.setValue(this.scene.name);

        // create the object selection dropdown
        this.obj_selected = new mnLabelledDropdown("Selected Object", function(p) {
            console.log("Value changed to: " + p);
        });
        for (var i=0; i<editor.assets.objects.length; i++) {
            var p = editor.assets.objects[i];
            this.obj_selected.addOption(p.name, p.name);
        }
        this.edit_scene_properties.appendChild(this.obj_selected.el);       
    }
}

class mnAnimationEditor extends mnBasicEditor {
    constructor(anim) {
        super();
        this.anim = anim;

        this.edit_animation = document.createElement('div');
        this.edit_animation.className = "edit_main_pane";
        this.el.appendChild(this.edit_animation);

        this.edit_animation_properties = document.createElement('div');
        this.edit_animation_properties.className = "edit_properties_pane";
        this.el.appendChild(this.edit_animation_properties);

        // create the name textbox
        this.animation_name = new mnLabelledTextbox("Animation Name", function(text) {
            console.log("Value changed to: " + text);
        });
        this.edit_animation_properties.appendChild(this.animation_name.el);
        this.animation_name.setValue(this.anim.name);

        // create the image selection dropdown
        this.image_selected = new mnLabelledDropdown("Using Image", function(p) {
            console.log("Value changed to: " + p);
        });
        for (var i=0; i<editor.assets.images.length; i++) {
            var img = editor.assets.images[i];
            this.image_selected.addOption(img.name, img.name);
        }
        this.edit_animation_properties.appendChild(this.image_selected.el);       
    }
}

class mnImageEditor extends mnBasicEditor {
    constructor(img) {
        super();
        this.img = img;

        this.edit_image = document.createElement('div');
        this.edit_image.className = "edit_main_pane";
        this.el.appendChild(this.edit_image);

        this.edit_image_properties = document.createElement('div');
        this.edit_image_properties.className = "edit_properties_pane";
        this.el.appendChild(this.edit_image_properties);

        // create the name textbox
        this.image_name = new mnLabelledTextbox("Image Name", function(text) {
            console.log("Value changed to: " + text);
        });
        this.edit_image_properties.appendChild(this.image_name.el);
        this.image_name.setValue(this.img.name);

        // create the url textbox
        this.image_url = new mnLabelledTextbox("Image URL", function(text) {
            console.log("Value changed to: " + text);
        });
        this.edit_image_properties.appendChild(this.image_url.el);
        this.image_url.setValue("");

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
        var _Instance = this;

        var pe = this.project_explorer;

        pe.categories.objects.clear();
        for (var i=0; i<assets.objects.length; i++) {
            var obj = assets.objects[i];
            pe.categories.objects.addItem(obj.name, function () {
                _Instance.editObject(obj);
            });
        }

        pe.categories.scenes.clear();
        for (var i=0; i<assets.scenes.length; i++) {
            var scene = assets.scenes[i];
            pe.categories.scenes.addItem(scene.name, function () {
                _Instance.editScene(scene);
            });
        }

        pe.categories.animations.clear();
        for (var i=0; i<assets.animations.length; i++) {
            var anim = assets.animations[i];
            pe.categories.animations.addItem(anim.name, function () {
                _Instance.editAnimation(anim);
            });
        }

        pe.categories.images.clear();
        for (var i=0; i<assets.images.length; i++) {
            var img = assets.images[i];
            pe.categories.images.addItem(img.name, function () {
                _Instance.editImage(img);
            });
        }

        pe.update();
    }
    assetsChanged(assets) {
        this.updateProjectExplorer(assets);
    }
}