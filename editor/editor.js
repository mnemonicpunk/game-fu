class mnAsset {
    constructor(name) {
        this.name = name;
    }
    toJSON() {
        // turn this asset into a JSON representation of itself for storage purposes
        return [];
    }
    fromJSON(json) {

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

class mnStorage {
    constructor() {
        // for now we will store projects in localStorage
        if (!localStorage.getItem('projects')) {
            localStorage.setItem('projects', []);
        }

        // we split the assets up into their own storage item
        // this allows us to lazy load them later on when we want to use cloud storage
        if (!localStorage.getItem('assets')) {
            localStorage.setItem('assets', {});
        }        

    }
    loadProject(name) {
        var projects = localStorage.getItem('projects');
        for (var i=0; i<projects.length; i++) {
            var p = projects[i];
            if (p.name == name) {
                p.assets = this.loadAssets(name);
                return p;
            }
        }
    }
    saveProject(project) {
        var projects = localStorage.getItem('projects');

        // save assets separately
        this.saveAssets(project.name, p.assets);
        
        // clear out the assets before saving
        project.assets = [];

        // check if we already have it in our projects
        var index = -1;
        for (var i=0; i<this.projects.length; i++) {
            if (projects[i].name == project.name) {
                index = i;
            }
        }
        if (index == -1) {
            // we didn't yet have it
            projects.push(project);
        } else {
            // we already have it, overwrite
            projects[i] = project
        }

        // now write the metadata back to our localstorage
        localStorage.setItem('projects', projects);
    }
    loadAssets(name) {
        const prefix = "_project_assets_";

        var assets = localStorage.getItem(prefix + name);
        if (!assets) {
            return [];
        }
        return assets;
    }
    saveAssets(name, assets) {
        // since assets can become quite chunky we save them separately as top-level items
        // this prefix will make sure we don't ever accidentally save over it with other localStorage data
        const prefix = "_project_assets_";

        localStorage.setItem(prefix + name, assets);
    }
}

class mnProject {
    constructor() {
        this.name = "";
        this.safe_name = "";
        this.assets = {
            objects: [],
            scenes: [],
            animations: [],
            images: []
        };
    }
    addAsset(category, asset) {
        if (this.assets[category]) {
            this.assets[category].push(asset);
        }
    }
    generateSafeName(test_name) {
        // this function sanitizes the chosen project name to something we know can be stored as a localStorage key
        const safe_character = "abcdefghijklmnopqrstuvwxyz0123456789_";

        var name = test_name.toLowerCase();
        var n = "";

        for (var i=0; i<name.length; i++) {
            var c = name[i];
            if (c == " ") {
                c = "_";
            }
            if (safe_character.indexOf(c) != -1) {
                n+=c;
            }
        }

        return n;
    }
}

class mnEditor {
    constructor() {
        this.project = new mnProject();
        this.ui = new mnEditorUI();

        /*this.assets = {
            objects: [],
            scenes: [],
            animations: [],
            images: []
        };*/
        
        this.assetsChanged();
    }
    assetsChanged() {
        this.ui.assetsChanged(this.project.assets);
    }
    addAsset(category, asset) {
        this.project.addAsset(category, asset);
        this.assetsChanged();
    }
    getAssets(category) {
        return this.project.assets[category];
    }
}

var editor = null;

window.addEventListener('load', function() {
    language.set('en');
    editor = new mnEditor();
    document.body.appendChild(editor.ui.el);
    
    editor.addAsset('objects', new mnAssetObject("TestObject"));
    editor.addAsset('scenes', new mnAssetScene("TestScene"));
    editor.addAsset('animations', new mnAssetAnimation("TestAnimation"));
    editor.addAsset('animations', new mnAssetAnimation("TestAnimation2"));
    editor.addAsset('images', new mnAssetImage("TestImage"));
});