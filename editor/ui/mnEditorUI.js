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