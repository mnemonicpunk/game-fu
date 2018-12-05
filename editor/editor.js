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