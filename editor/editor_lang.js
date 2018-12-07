class LanguageStrings {
    constructor() {
        this.categories = {
            project: 'Project',
            objects: 'Objects',
            scenes: 'Scenes',
            animations: 'Animations',
            images: 'Images'
        };

        this.object_name = 'Object Name';
        this.scene_name = 'Scene Name';
        this.animation_name = 'Animation Name';
        this.image_name = 'Image Name';

        this.general_properties = 'General Properties';
        this.graphics_settings = 'Graphics Settings';
        this.parent_object = 'Parent Object';   
        this.no_parent = '[none]';   
        this.default_animation = 'Default Animation';
        this.selected_object = 'Selected Object';
        this.using_image = 'Using Image';
        this.image_url = 'Image URL';

        this.current_frame = "Current Frame";
    }
}

class LanguageStringsDE extends LanguageStrings {
    constructor() {
        super();
        this.categories = {
            project: 'Projekt',
            objects: 'Objekte',
            scenes: 'Szenem',
            animations: 'Animationen',
            images: 'Bilder'
        };

        this.object_name = 'Objektname';
        this.scene_name = 'Szenenname';
        this.animation_name = 'Animationsname';
        this.image_name = 'Bild-Name';

        this.general_properties = 'Allgemeine Eigenschaften';
        this.graphics_settings = 'Grafikeinstellungen';
        this.parent_object = '&Uuml;bergeordnetes Objekt';
        this.no_parent = '[nichts]';   
        this.default_animation = 'Standardanimation';
        this.selected_object = 'Gew&auml;hltes Objekt';
        this.using_image = 'Benutztes Bild';
        this.image_url = 'Bild URL';
    }
}

class Language {
    constructor() {
        this.strings = new LanguageStrings();
    }
    set(lang) {
        if (lang == "de") {
            this.strings = new LanguageStringsDE();
            return;
        }
        this.strings = new LanguageStrings();
    }
}

window.language = new Language();