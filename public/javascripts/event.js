/* formhandler */

class eventHandler extends formhandler {
    constructor(formId) {
        super(formId)
        this.onSubmitSuccess = this.onSubmitSuccess.bind(this);

        this.showDetailsCb = this.showDetailsCb.bind(this)
        $('.js-more').on('click', this.showDetailsCb.bind(this));
        $('.js-less').on('click', this.showDetailsCb.bind(this));

        this.showFormCb = this.showFormCb.bind(this)
        $('#eventshowform').on('click', this.showFormCb.bind(this));

        this.cancelFormCb = this.cancelFormCb.bind(this)
        $('#eventcancel').on('click', this.cancelFormCb.bind(this));

        $('#eventFormDiv').hide();
    }

    onSubmitSuccess(response) {
        if (response) {
            if (response.valid) {
                $('#eventFormDiv').hide("slow", function () {
                    location.reload(true);
                })
            } else {
                console.error(response.msg);
            }
        }

    }

    showDetailsCb(event) {
        event.preventDefault();
        $(event.currentTarget).closest('.event-item').toggleClass('open');
    }

    showFormCb(event) {
        event.preventDefault();
        $(event.currentTarget).closest('.event-item').addClass('open');
    }

    cancelFormCb(event) {
        event.preventDefault();
        $(event.currentTarget).closest('.event-item').removeClass('open');
        this.form[0].reset();
    }
}

$(function () {
    if ($('#eventForm').length) {
        new eventHandler('#eventForm');
    }
});
