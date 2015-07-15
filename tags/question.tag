<question>
    <h1>{ this.opts.title }</h1>
    <p>{ this.opts.into }</p>
    <p>{ this.opts.question }</p>
    <input name="anstxt" type="text" />
    <button onclick={ this.answer } >Antworten</button>
    <script>
    this.answer = function() {
        this.opts.ansfn( this.anstxt.value );
    };
    </script>
</question>