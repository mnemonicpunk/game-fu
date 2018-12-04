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
    toData() {
        return {
            name: this.name,
            blocks_xml: ""
        }
    }
}

class mnAssetScene extends mnAsset {
    constructor(name) {
        super(name);
    }
    toData() {
        return {
            name: this.name,
            objects: []
        }
    }
}

class mnAssetAnimation extends mnAsset {
    constructor(name) {
        super(name);
    }
    toData() {
        return {
            name: this.name,
            image: null,
            frames: []
        }
    }    
}

class mnAssetImage extends mnAsset {
    constructor(name) {
        super(name);
    }
    toData() {
        return {
            name: this.name,
            url: ""
        }
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
        var projects = JSON.parse(localStorage.getItem('projects') || []);
        var project = {};
        for (var i=0; i<projects.length; i++) {
            var p = projects[i];
            if (p.safe_name == name) {
                project = {
                    meta: p,
                    assets: this.loadAssets(name)
                }
            }
        }
        return project;
    }
    saveProject(project) {
        var projects = localStorage.getItem('projects') || [];

        // save assets separately
        this.saveAssets(project.meta.safe_name, project.assets);

        // check if we already have it in our projects
        var index = -1;
        for (var i=0; i<projects.length; i++) {
            if (projects[i].safe_name == project.meta.safe_name) {
                index = i;
            }
        }
        if (index == -1) {
            // we didn't yet have it
            console.dir(projects);
            projects.push(project.meta);
        } else {
            // we already have it, overwrite
            projects[i] = project.meta
        }

        // now write the metadata back to our localstorage
        localStorage.setItem('projects', JSON.stringify(projects));
    }
    loadAssets(name) {
        const prefix = "_project_assets_";

        var assets = JSON.parse(localStorage.getItem(prefix + name));
        if (!assets) {
            console.log("Error: Attempted to load project assets that did not exist.");
            return {};
        }
        return assets;
    }
    saveAssets(name, assets) {
        // since assets can become quite chunky we save them separately as top-level items
        // this prefix will make sure we don't ever accidentally save over it with other localStorage data
        const prefix = "_project_assets_";

        localStorage.setItem(prefix + name, JSON.stringify(assets));
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
    toData() {
        // not much metadata here yet
        var meta = {
            name: this.name,
            safe_name: this.generateSafeName(this.name),
        }

        var assets = {};
        for (let cat in this.assets) {
            let a = this.assets[cat];
            let a_json = [];
            for (let i=0; i<a.length; i++) {
                a_json.push(a[i].toJSON());
            }
            assets[cat] = a_json;
        }

        return {
            meta: meta,
            assets: assets
        };
    }
}

class mnEditor {
    constructor() {
        this.project = new mnProject();
        this.storage = new mnStorage();
        this.ui = new mnEditorUI();

        this.project.name = "Unnamed Project";

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
    save() {
        // grab project in a saveable state
        var p = this.project.toData();
        console.log(p);

        // put it into storage
        this.storage.saveProject(p);
        console.dir(localStorage);
    }
    load() {

    }
}

var editor = null;

window.addEventListener('load', function() {
    language.set('en');
    editor = new mnEditor();
    document.body.appendChild(editor.ui.el);

    this.localStorage.clear();
    
    editor.addAsset('objects', new mnAssetObject("TestObject"));
    editor.addAsset('scenes', new mnAssetScene("TestScene"));
    editor.addAsset('animations', new mnAssetAnimation("TestAnimation"));
    editor.addAsset('animations', new mnAssetAnimation("TestAnimation2"));
    editor.addAsset('images', new mnAssetImage("TestImage"));

    editor.save();    

    console.dir(this.localStorage.getItem('projects'));
});