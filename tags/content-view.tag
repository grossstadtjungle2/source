<content-view>
    <question
        if={ this.currentView == 'question' }
        question={ this.getCurrent().question }
        text={ this.getCurrent().questiontext }
        title={ this.getCurrent().title } />
    <answere \>
    <hint \>

    <script>
    var views = ['question', 'answere', 'hint', 'more'];

    var updateData = (function updateData( item ) {
        this.question = item.question;
        this.title = item.title;
        this.text = item.text;

        this.update();
    }).bind(this);

    Object.defineProperty(this, 'currentView', {
        set: function( value ) {
            if ( views.indexOf( value ) < 0 ) {
                throw new Error('Unknown view ' + value + ' for currentView.');
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

    this.questions = this.opts.questions;

    this.display = function( id ) {
        if (this.questions.length < id) {
            return false;
        }
    };

    this.getCurrent = function() {
        return this.questions[ this.currentItem ];
    };

    </script>
</content-view>