/* formhandler */

class formhandler {
    constructor(formId){
       this.form = $(formId);
       this.onSubmit = this.onSubmit.bind(this);
       this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
       if(this.form.length === 0){
            console.error(formId + ' not found');
            return;
        }
       this.actionurl = this.form.attr('action');
       this.form.on('submit', this.onSubmit.bind(this));
    }

    onSubmit(event){
        event.preventDefault();
        const formData = this.form.serialize();
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
