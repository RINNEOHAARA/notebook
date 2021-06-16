        var vm = new Vue({
            el: "#notebook",
            data: {
                content: '',
                notes: JSON.parse(localStorage.getItem('notes')) || [],
                selectedId: localStorage.getItem('selected-id') || null,
            },

            computed: {
                markdownPreview() {
                    return this.selectedNote ? marked(this.selectedNote.content) : ''
                },

                selectedNote() {
                    return this.notes.find(note => note.id === this.selectedId)
                }
            },

            created() {
                this.content = localStorage.getItem('content') || "you can write in **markdown**"
            },

            watch:{
                notes:{
                    handler:'saveNotes',
                    deep:true,
                },

                selectedId(val){
                    localStorage.setItem('selected-id',val)
                    console.log("save selected-id",this.selectedId)
                }
            },

            methods: {
                addNote() {
                    console.log("add note is called")
                    const time = Date.now()
                    const note = {
                        id: String(time),
                        title: 'New note' + (this.notes.length + 1),
                        content: '**Hi**',
                        created: time,
                        favorite: false,
                    }
                    this.notes.push(note)
                },

                selectNote(note) {
                    this.selectedId = note.id
                    // console.log(this.selectedId)
                },

                saveNotes(){
                    localStorage.setItem('notes',JSON.stringify(this.notes) )
                    console.log('notes saved ' ,new Date())
                },

                removeNote(){
                    console.log('delete note')
                    if (this.selectedNote && confirm('Delete the note ?')){
                        const index=this.notes.indexOf(this.selectedNote)
                        if (index!=-1){
                            this.notes.splice(index,1)
                        }
                    }
                }
            }
        })