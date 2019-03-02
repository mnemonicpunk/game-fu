class mnOpenProject extends mnBasicEditor {
    constructor(model) {
        super(model);
        console.dir(model);

        var _Instance = this;

        this.title = document.createElement('div');
        this.title.className = "dialog_title";
        this.title.innerHTML = "Open Project";
        this.el.appendChild(this.title);

        this.project_list = document.createElement('div');
        this.project_list.className = "open_project_list";
        this.el.appendChild(this.project_list);

        this.project_create = document.createElement('div');
        this.project_create.className = "open_project_create";
        this.el.appendChild(this.project_create);  

        this.project_create_enter = document.createElement('input');
        this.project_create_enter.type = "text";
        this.project_create_enter.className = "open_project_create_entername";
        this.project_create_enter.placeholder = "Enter a name here to create a new project...";
        this.project_create.appendChild(this.project_create_enter);  
        
        this.project_create_button = document.createElement('div');
        this.project_create_button.className = "open_project_create_button";
        this.project_create_button.innerHTML = "Create";
        this.project_create.appendChild(this.project_create_button);  
        

        for (var i=0; i<model.length; i++) {
            this.addListEntry(model[i]);
            //console.dir(editor.storage.loadProject(model[i]).name);
        }

        this.project_create_button.addEventListener('click', function() {
            _Instance.createProject();
        });
    }
    addListEntry(next_entry) {
        console.dir(next_entry);
        let entry = document.createElement('div');
        entry.className = "open_project_entry";
        entry.innerHTML = next_entry.name;
        entry.addEventListener('click', function() {
            console.dir(next_entry);
            editor.loadProject()
        });

        this.project_list.appendChild(entry);
    }
    createProject() {
        let n = this.project_create_enter.value;
        if (n == "") {
            console.log("Tried creating project with no name, aborting.");
            return;
        }

        console.log(n);
    }
}