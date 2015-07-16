<content>
    <question
        if={ this.getView() == 'question' }
        question={ this.getCurrent().question }
        text={ this.getCurrent().text }
        title={ this.getCurrent().title }
        ansfn={ this.makeAnswer } />
    <answer 
        if={ this.getView() == 'answer'}
        answers={ this.getCurrent().answers }
        success={ this.anscorrect }
        more={ this.getCurrent().info } \>
    <hint
        text={ this.getCurrent().hint } \>

    <script>
    var views = ['question', 'answer', 'hint', 'more'];
    var currentView = 0;
    var viewHistory = [ 0 ];

    this.anscorrect = false;

    this.getView = function() {
        return views[currentView];
    };

    this.setView = function( view ) {
        var viewId = views.indexOf( view.toLowerCase() );
        if (  viewId >= 0 ) {
            viewHistory.push(currentView);
            currentView = viewId;
            this.update();
            return true;
        }
        return false;
    };

    this.goBack = function() {
        var lastView = viewHistory.pop();
        if( lastView ) {
            currentView = lastView;
            this.update();
            return true;
        }
        return false;
    };

    this.questions = this.opts.questions;
    var currentQuestion = 0;

    this.display = function( id ) {
        if (id >= this.questions.length) {
            return false;
        }
        currentQuestion = id;
        this.update();
        return true;
    };

    this.getCurrent = function() {
        return this.questions[ currentQuestion ];
    };

    this.makeAnswer = function( input ) {
        if (this.getCurrent().answers.indexOf(input.toString()) >= 0) {
            this.setView('answer');
            this.anscorrect = true;
            this.update();
        } else {
            this.anscorrect = false;
        }
    }.bind(this);

    </script>
</content>
