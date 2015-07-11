<menu>
	<div class="menupoint" each={ this.points } show={ this.show } >
		{ this.text }
	</div>

	<script>
	this.points = this.opts.points;

	var getPoint = (function( name ) {
		var i;
		for ( i = 0; i < this.points.length; ++i ) {
			if ( this.points[i].text === name ) {
				return this.points[i];
			}
		}
		throw new Error('Unregistered menu point ' + name + '.');
	}).bind(this);
	
	this.show = function( name ) {
		getPoint( name ).show = true;
	};

	this.hide = function( name ) {
		getPoint( name ).show = false;
	};
	</script>
</menu>