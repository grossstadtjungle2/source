<questions>
    <question each={ questions } />

    <script>
    var self = this;

    this.questions = opt.questions;

    display( id ) {
        if (this.questions.length < id) {
            return false;
        }
    }

    function updateData( item ) {
        self.question = item.question;
        self.title = item.title;
        self.text = item.text;


        self.update();
    }
    </script>
</questions>

<question if={ opt.show } >
    <h1>{ title }</h1>
    <p>{ text }</p>
    <p>{ question }</p>
    <input type="text" />
    <button value="Antworten" onclick={ parent.answere } />
</question>