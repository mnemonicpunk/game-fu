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
        this.assetsChanged();
    }
    assetsChanged() {
        this.ui.assetsChanged(this.assets);
    }
    addObject(obj) {
        this.assets.objects.push(obj);
        this.assetsChanged();
    }
    addScene(scene) {
        this.assets.scenes.push(scene);
        this.assetsChanged();
    }
    addAnimation(animation) {
        this.assets.animations.push(animation);
        this.assetsChanged();
    }
    addImage(image) {
        this.assets.images.push(image);
        this.assetsChanged();
    }
}

var editor = null;

window.addEventListener('load', function() {
    editor = new mnEditor();
    document.body.appendChild(editor.ui.el);
    
    editor.addObject(new mnObject("TestObject"));
    editor.addScene(new mnScene("TestScene"));
    editor.addAnimation(new mnAnimation("TestAnimation"));
    editor.addAnimation(new mnAnimation("TestAnimation2"));
    editor.addImage(new mnImage("TestImage"));
});