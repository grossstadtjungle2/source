<content-view>
    <question
        if={ this.currentView == 'question' }
        question={ this.getCurrent().question }
        text={ this.getCurrent().questiontext }
        title={ this.getCurrent().title } />
    <answere \>
    <hint \>

    <script>
    var i;
    var self = this;
    var views = ['question', 'answere', 'hint', 'more'];

    Object.defineProperty(this, 'currentView', {
        set: function( value ) {
            if ( views.indexOf( value ) < 0 ) {
                throw new Error('Unknown view ' + value ' for currentView.');
            }
            return value;
        }
    });

    Object.defineProperty(this, 'currentItem', {
        set: function( value ) {
            if ( value > this.questions.length ) {
                throw new Error('There is no question with id ' + value + '.');
            }
            return value;
        }
    });

    this.questions = opt.questions;

    display( id ) {
        if (this.questions.length < id) {
            return false;
        }

    }

    getCurrent() {
        return this.questions[ this.currentItem ];
    }

    function updateData( item ) {
        self.question = item.question;
        self.title = item.title;
        self.text = item.text;


        self.update();
    }

    </script>
</content-view>