/* formhandler */

class registerHandler extends formhandler {
    constructor(formId, cancelButtonId) {
        super(formId, cancelButtonId)
        this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
    }

    onSubmitSuccess(response) {
        if(response.valid){
            this.form.hide();
            $('.js-register-name').text(response.name);
            $('.attending-number').text(response.nrAttendees);
            if(response.isAttending){
                $('#js-comming-greeting').removeClass('hide');
            } else {
                $('#js-not-comming-greeting').removeClass('hide');
            }
        } else {
            console.log('Error during registration');
        }        
    }
}

$(function () {
    if ($('#regForm').length) {
        new registerHandler('#regForm', '#js-willNotAttendButton');
    }
});
