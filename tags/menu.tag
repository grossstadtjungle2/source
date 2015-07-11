<menu>
	<div class="menupoint" each={ this.entries } show={ this.show } onclick={ this.action } >
		{ this.text }
	</div>

	<script>
	this.entries = this.opts.entries;

	var getEntry = (function( name ) {
		var i;
		for ( i = 0; i < this.entries.length; ++i ) {
			if ( this.entries[i].name === name ) {
				return this.entries[i];
			}
		}
		throw new Error('Unregistered menu point ' + name + '.');
	}).bind(this);
	
	this.show = function( name ) {
		getEntry( name ).show = true;
	};

	this.hide = function( name ) {
		getEntry( name ).show = false;
	};
	</script>
</menu>