/* formhandler */

class formhandler {
    constructor(formId, cancelButtonId){
       this.form = $(formId);
       this.cancelButton = $(cancelButtonId);
       this.onSubmit = this.onSubmit.bind(this);
       this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
       if(this.form.length === 0){
            console.error(formId + ' not found');
            return;
        }
       this.actionurl = this.form.attr('action');
       this.form.on('submit', this.onSubmit.bind(this));
       if(this.cancelButton.length){
        this.cancelButton.on('click', this.onSubmit.bind(this));
       }
    }

    onSubmit(event){
        event.preventDefault();
        var formData =this.form.serializeArray();
        if(this.cancelButton.length){
            formData.push({name: 'submited', value: event.target.id !== this.cancelButton.get(0).id});
        }        
        $.post(this.actionurl, formData, data => this.onSubmitSuccess(data))
        .fail( function() {
            console.log('All is Lost!');
        });
    }

    onSubmitSuccess(response) {
        console.log('In Base');
        console.log(response.valid);
    }
}
