class mnAsset {
    constructor(name) {
        this.name = name;
    }
}

class mnObject extends mnAsset {
    constructor(name) {
        super(name);
    }
}

class mnScene extends mnAsset {
    constructor(name) {
        super(name);
    }
}

class mnAnimation extends mnAsset {
    constructor(name) {
        super(name);
    }
}

class mnImage extends mnAsset {
    constructor(name) {
        super(name);
    }
}

class mnEditor {
    constructor() {
        this.ui = new mnEditorUI();

        this.assets = {
            objects: [],
            scenes: [],
            animations: [],
            images: []
        };

        this.updateProjectExplorer();
    }
    updateProjectExplorer() {
        var _Instance = this;

        this.ui.project_explorer.categories.objects.clear();
        for (var i=0; i<this.assets.objects.length; i++) {
            var obj = this.assets.objects[i];
            this.ui.project_explorer.categories.objects.addItem(obj.name, function () {
                _Instance.ui.editObject(obj);
            });
        }

        this.ui.project_explorer.categories.scenes.clear();
        for (var i=0; i<this.assets.scenes.length; i++) {
            var scene = this.assets.scenes[i];
            this.ui.project_explorer.categories.scenes.addItem(scene.name, function () {});
        }

        this.ui.project_explorer.categories.animations.clear();
        for (var i=0; i<this.assets.animations.length; i++) {
            var anim = this.assets.animations[i];
            this.ui.project_explorer.categories.animations.addItem(anim.name, function () {});
        }

        this.ui.project_explorer.categories.images.clear();
        for (var i=0; i<this.assets.images.length; i++) {
            var img = this.assets.images[i];
            this.ui.project_explorer.categories.images.addItem(img.name, function () {});
        }

        this.ui.project_explorer.update();
    }
    addObject(obj) {
        this.assets.objects.push(obj);
        this.updateProjectExplorer();
    }
    addScene(scene) {
        this.assets.scenes.push(scene);
        this.updateProjectExplorer();
    }
    addAnimation(animation) {
        this.assets.animations.push(animation);
        this.updateProjectExplorer();
    }
    addImage(image) {
        this.assets.images.push(image);
        this.updateProjectExplorer();
    }
}

window.addEventListener('load', function() {
    var editor = new mnEditor();
    document.body.appendChild(editor.ui.el);
    
    editor.addObject(new mnObject("TestObject"));
    editor.addScene(new mnScene("TestScene"));
    editor.addAnimation(new mnAnimation("TestAnimation"));
    editor.addImage(new mnImage("TestImage"));
});