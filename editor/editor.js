class mnAsset {
    constructor(name) {
        this.name = name;
    }
}

class mnAssetObject extends mnAsset {
    constructor(name) {
        super(name);
    }
}

class mnAssetScene extends mnAsset {
    constructor(name) {
        super(name);
    }
}

class mnAssetAnimation extends mnAsset {
    constructor(name) {
        super(name);
    }
}

class mnAssetImage extends mnAsset {
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
    language.set('de');
    editor = new mnEditor();
    document.body.appendChild(editor.ui.el);
    
    editor.addObject(new mnAssetObject("TestObject"));
    editor.addScene(new mnAssetScene("TestScene"));
    editor.addAnimation(new mnAssetAnimation("TestAnimation"));
    editor.addAnimation(new mnAssetAnimation("TestAnimation2"));
    editor.addImage(new mnAssetImage("TestImage"));
});