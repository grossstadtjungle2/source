<menu>
	<div class="menupoint" each={ this.points } show={ this.show } >
		{ this.text }
	</div>

	<script>
	this.points = opts.points;
	var _this = this;
	
	show( name ) {
		getPoint( name ).show = true;
	}

	hide( name ) {
		getPoint( name ).show = false;
	}

	function getPoint( name ) {
		var i;
		for ( i = 0; i < _this.points.length; ++i ) {
			if ( this.points[i].text = name ) {
				return _this.points[i];
			}
		}
		throw new Error('Unregistered menu point ' + name + '.');
	}
	</script>
</menu>