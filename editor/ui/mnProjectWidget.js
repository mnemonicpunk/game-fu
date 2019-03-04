class mnProjectWidget extends mnWidget {
    constructor() {
        super();

        this.el.className = "project_widget";

        this.project_widget_actions = document.createElement('div');
        this.project_widget_actions.className = "project_widget_actions";
        this.el.appendChild(this.project_widget_actions);

        this.project_widget_open = document.createElement('div');
        this.project_widget_open.className = "project_widget_button";
        this.project_widget_open.innerHTML = "<i class=\"far fa-folder-open\"></i> Open";
        this.project_widget_actions.appendChild(this.project_widget_open);

        this.project_widget_play = document.createElement('div');
        this.project_widget_play.className = "project_widget_button";
        this.project_widget_play.innerHTML = "<i class=\"fas fa-play\"></i> Play";
        this.project_widget_actions.appendChild(this.project_widget_play);        

        //this.setName("[PROJECT]");
    }
}