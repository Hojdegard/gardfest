/* formhandler */

class eventHandler extends formhandler {
    constructor(formId) {
        super(formId)
        this.onSubmitSuccess = this.onSubmitSuccess.bind(this);

        this.showDetailsCb = this.showDetailsCb.bind(this);
        $('.js-more').on('click', this.showDetailsCb.bind(this));
        $('.js-less').on('click', this.showDetailsCb.bind(this));

        this.gillaCb = this.gillaCb.bind(this);
        $('.upvotebutton').on('click', this.gillaCb.bind(this))

        this.showFormCb = this.showFormCb.bind(this);
        $('#eventshowform').on('click', this.showFormCb.bind(this));

        this.cancelFormCb = this.cancelFormCb.bind(this);
        $('#eventcancel').on('click', this.cancelFormCb.bind(this));

        $('#eventFormDiv').hide();

        this.onLikeSuccess = this.onLikeSuccess.bind(this);
    }

    onSubmitSuccess(response) {
        if (response) {
            if (response.valid) {
                $('#eventcancel').closest('.event-item').removeClass('open');
                this.form[0].reset();
                location.reload(true);
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

    gillaCb(event) {
        event.preventDefault();
        event.target.style.visibility = 'hidden';
        $.post( window.location.pathname + '/like', {
            id: event.target.id
        }, data => this.onLikeSuccess(data))
        .fail( function() {
            console.log('No likes for you!');
        });
    }

    onLikeSuccess(response) {
        if (response) {
            if (response.valid) {
                $(response.span).text(response.likes)
            } else {
                console.error(response.msg);
            }
        }
    }
}

$(function () {
    if ($('#eventForm').length) {
        new eventHandler('#eventForm');
    }
});
