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
    listProjects() {
        var projects = JSON.parse(localStorage.getItem('projects') || []);
        return projects;
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