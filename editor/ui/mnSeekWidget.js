class mnSeekWidget extends mnWidget {
    constructor() {
        super();
        var _Instance = this;

        this.seek_pos = 0;
        this.max_pos = 10;
        
        this.el.className ="seek_widget";

        this.prev_button = document.createElement('div');
        this.next_button = document.createElement('div');

        this.bar = document.createElement('div');
        this.bar.className = 'seek_bar';

        this.tag = document.createElement('div');
        this.tag.className = 'seek_tag';

        this.tag_text = document.createElement('div');
        this.tag_text.className = 'seek_text';

        this.prev_button.className = 'seek_button seek_button_left';
        this.prev_button.innerHTML = '&lt;';
        this.next_button.className = 'seek_button seek_button_right';
        this.next_button.innerHTML = '&gt;';
        
        this.tag.appendChild(this.prev_button);
        this.tag.appendChild(this.next_button);
        this.tag.appendChild(this.tag_text);
        

        this.tag_text.innerHTML = '0';
        this.bar.appendChild(this.tag);
        this.el.appendChild(this.bar);

        this.prev_button.addEventListener('click', function() {
            _Instance.changePosition(-1);
        });
        this.next_button.addEventListener('click', function() {
            _Instance.changePosition(+1);
        });

        this.bar.addEventListener('click', function(e) {
            console.dir(e);
        });
    }
    changePosition(change) {                
        this.setPosition(this.seek_pos + change);
    }
    setPosition(pos) {
        this.seek_pos = pos;

        if (this.seek_pos < 0) {
            this.seek_pos = 0;
        }
        if (this.seek_pos > this.max_pos) {
            this.seek_pos = this.max_pos;
        }

        let l = "100%";
        if (this.max_pos > 0) {
            l = (Math.round((this.seek_pos / this.max_pos) * 100)) + "%";
        }
        this.tag.style.left = "calc(" + l + " - 23px)";

        this.tag_text.innerHTML = this.seek_pos+1;
        
    }
    setMaxPosition(pos) {
        this.max_pos = pos;
    }
}