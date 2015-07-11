<app>
	<div id="top-bar">
        <div id="menu-click">
            <div id="menu-icon">Menu</div>
            </div>
            Großstadtjungle<span class="quadrat">2</span>
        </div>
        <div id="dynamic-cont">
            <content-view />
            <map-view />
        </div>
        <div id="interaction-bar" class="hide">
            <div class="back back2map button-double">Zurück zur Karte</div>
            <div id="showTip" class="button-double">Tipp anzeigen</div>
        </div>
    </div>
	<menu points={ this.menu.points } />
	<map-view />
	<content-view />
	<script>
	this.menu.points = [
		{ name: 'test1', text: 'Test1', show: true },
		{ name: 'test2', text: 'Test1', show: true },
		{ name: 'test3', text: 'Test3', show: true },
	];
	</script>
</app>