/* formhandler */

class registerHandler extends formhandler {
    constructor(formId){
        super(formId)
        this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
    }

    onSubmitSuccess(response) {
        this.form.hide();
        $('#welcomeDiv').html('Skoj att du kommer ' + response.name);
    }
}

$(function() {
    if($('#regForm').length){
        new registerHandler('#regForm');
    }
});