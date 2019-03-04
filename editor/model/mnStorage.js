class mnStorage {
    constructor() {
        // for now we will store projects in localStorage
        if (!localStorage.getItem('projects')) {
            localStorage.setItem('projects', []);
        }

        // we split the assets up into their own storage item
        // this allows us to lazy load them later on when we want to use cloud storage
        // as such they don't require a governing localStorage key as they will have their own unique ones

    }
    listProjects() {
        let projects = this._getProjects();
        let p_data = [];

        for (var i=0; i<projects.length; i++) {
            p_data.push({
                'name': projects[i].name,
                'safe_name': projects[i].safe_name,
            });
        }

        return p_data;
    }
    existsProject(name) {
        var p = this.listProjects();
        for (var i=0; i<p.length; i++) {
            if (p[i].name == name) {
                return true;
            }
        }
        return false;
    }
    loadProject(name) {
        let projects = JSON.parse(localStorage.getItem('projects') || []);

        for (var i=0; i<projects.length; i++) {
            let p = projects[i];
            if (p.safe_name == name) {
                let project = {
                    meta: p,
                    assets: this.loadAssets(name)
                };
                console.dir(project);
                return new mnProject(project);
            }
        }
        return new mnProject();
    }
    saveProject(save_project) {
        var projects = this._getProjects();
        let project = save_project.toData();

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
            console.log("Project does not yet exist, adding at " + projects.length);
            index = projects.length;
        } else {
            console.log("Project found at index " + i);
        }
        projects[index] = project.meta;

        // now write the metadata back to our localstorage
        this._setProjects(projects);
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
    _getProjects() {
        let p = localStorage.getItem('projects') || [];
        if (p.length <= 0) {
            console.log("p.length <= 0");
            return [];
        } else {
            return JSON.parse(p);
        }
    }
    _setProjects(projects) {
        localStorage.setItem('projects', JSON.stringify(projects));
    }
}