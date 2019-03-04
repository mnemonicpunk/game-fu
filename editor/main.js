var editor = null;

// this is only place-holder content
var GENERATE_SAMPLE_PROJECT = function() {
    var sample_project = new mnProject();
    sample_project.addAsset('objects', new mnAssetObject("TestObject"));
    sample_project.addAsset('scenes', new mnAssetScene("TestScene"));
    let test_animation = sample_project.addAsset('animations', new mnAssetAnimation("TestAnimation"));
    let test_animation2 = sample_project.addAsset('animations', new mnAssetAnimation("TestAnimation2"));
    sample_project.addAsset('images', new mnAssetImage("TestSpritesheet", "./image/yoshi_anim2.png"));
    sample_project.addAsset('images', new mnAssetImage("TestBG", "./image/bg.png"));
    test_animation.frames.push({
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        x_offset: 0,
        y_offset: 0
    });
    test_animation2.frames.push({
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        x_offset: 0,
        y_offset: 0
    });
    sample_project.name="Testprojekt";
    return sample_project;
}

window.addEventListener('load', function() {
    language.set('de');
    editor = new mnEditor();
    document.body.appendChild(editor.ui.el);

    var p = GENERATE_SAMPLE_PROJECT();
    //editor.setProject(p);

    if (!editor.storage.existsProject("Testprojekt")) {
        console.log("Sample project not found, creating...");
        editor.setProject(p);
    } else {
        console.log("Sample project found.");
        editor.loadProject("testprojekt");
    }
});