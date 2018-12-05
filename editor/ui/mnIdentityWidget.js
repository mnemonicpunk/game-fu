class mnIdentityWIdget extends mnWidget {
    constructor() {
        super();
        this.el.className = 'identity_widget';

        this.user_portrait = document.createElement('div');
        this.user_portrait.className = 'idw_user_portrait';

        this.user_portrait_image = document.createElement('img');
        this.user_portrait_image.className = 'idw_user_portrait_image';
        this.user_portrait_image.src = "editor/anon_icon.png";
        this.user_portrait.appendChild(this.user_portrait_image);

        this.user_badge = document.createElement('div');
        this.user_badge.className = 'idw_user_badge';

        this.user_name = document.createElement('div');
        this.user_name.className = 'idw_user_name';
        this.user_name.innerHTML = "Guest";
        this.user_badge.appendChild(this.user_name);

        this.project_name = document.createElement('div');
        this.project_name.className = 'idw_project_name';
        this.project_name.innerHTML = "Test Project";

        this.el.appendChild(this.user_portrait);
        this.el.appendChild(this.user_badge);
        this.el.appendChild(this.project_name);
    }
}