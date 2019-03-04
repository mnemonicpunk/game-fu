class mnEditorUI extends mnWidget {
    constructor() {
        super();
        this.el = document.createElement('div');
        this.el.className = "editor_ui";
    
        //this.main_bar = document.createElement('div');
        this.main_bar = new mnMainBar(this);
        this.el.appendChild(this.main_bar.el);

        this.project_explorer = new mnProjectExplorer(this);
        this.el.appendChild(this.project_explorer.el);

        this.editor_view = new mnEditorView();
        this.el.appendChild(this.editor_view.el);      

        this.setEditor(new mnProjectProperties());
    }
    setEditor(e) {
        this.editor_view.setEditor(e);
    }
    editObject(obj) {
        var obj_editor = new mnObjectEditor(obj);
        this.setEditor(obj_editor) ;
    }
    editScene(scene) {
        var scene_editor = new mnSceneEditor(scene);
        this.setEditor(scene_editor) ;
    }
    editAnimation(anim) {
        var anim_editor = new mnAnimationEditor(anim);
        this.setEditor(anim_editor) ;
    }   
    editImage(img) {
        var img_editor = new mnImageEditor(img);
        this.setEditor(img_editor) ;
    }
    createNewImage() {
        alert("You want to create a new image!");
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
    setName(name) {
        //this.project_explorer.project_widget.setName(name);
        this.main_bar.setName(name);
    }
    assetsChanged(assets, name) {
        this.updateProjectExplorer(assets);
        this.setName(name);
    }
}