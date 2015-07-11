<app>
    <menu show={ this.getView() == 'menu' } entries={ this.menu.points } />
    <map show={ this.getView() == 'map' } />
    <content show={ this.getView() == 'content' } />
    <script>
    var views = ['content', 'map', 'menu'];
    var currentView = 2;
    var viewHistory = [];

    window.ent = this;

    this.menu = {
        points: [
            { name: 'test1', text: 'Test1', show: true },
            { name: 'test2', text: 'Test1', show: true },
            { name: 'test3', text: 'Test3', show: true },
        ],
    };

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