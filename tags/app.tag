<app>
    <menu show={ this.getView() == 'menu' } entries={ this.menu.menuEntries } />
    <map show={ this.getView() == 'map' } />
    <content
        show={ this.getView() == 'content' }
        questions={ this.questions } />
    <script>
    var views = ['content', 'map', 'menu'];
    var currentView = 0;
    var viewHistory = [0];

    this.menu = {
        menuEntries: [
            { name: 'test1', text: 'Inhalt', show: true, action: (function() {
                    this.setView('content');
                    console.log("Content called");
            }).bind(this) },
            { name: 'test2', text: 'Map', show: true, action: (function() {
                    this.setView('map');
            }).bind(this) },
            { name: 'test3', text: 'Zurück', show: true, action: (function() {
                    this.goBack();
            }).bind(this) },
        ],
    };

    this.questions = this.opts.points;

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
    </script>
</app>