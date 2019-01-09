var editor = null;

window.addEventListener('load', function() {
    language.set('de');
    editor = new mnEditor();
    document.body.appendChild(editor.ui.el);

    this.localStorage.clear();

    editor.addAsset('objects', new mnAssetObject("TestObject"));
    editor.addAsset('scenes', new mnAssetScene("TestScene"));
    let test_animation = editor.addAsset('animations', new mnAssetAnimation("TestAnimation"));
    let test_animation2 = editor.addAsset('animations', new mnAssetAnimation("TestAnimation2"));
    editor.addAsset('images', new mnAssetImage("TestSpritesheet", "./image/yoshi_anim2.png"));
    editor.addAsset('images', new mnAssetImage("TestBG", "./image/bg.png"));

    // add some empty frames to our test animations
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

    console.dir(test_animation);

    editor.save();    

    console.dir(this.localStorage.getItem('projects'));
});