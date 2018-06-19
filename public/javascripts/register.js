/* formhandler */

class registerHandler extends formhandler {
    constructor(formId) {
        super(formId)
        this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
    }

    onSubmitSuccess(response) {
        this.form.hide();
        $('.js-register-name').text(response.name).parent().removeClass('hide');
    }
}

$(function () {
    if ($('#regForm').length) {
        new registerHandler('#regForm');
    }
});
