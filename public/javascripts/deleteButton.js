class DeleteButtonHandler {
    constructor(className, id) {
        this.attendeeList = $(id);
        this.actionUrl = window.location.pathname + this.attendeeList.data('url');

        $(className).on('click', this.onDelButtonClick.bind(this));

        this.onDelButtonClick = this.onDelButtonClick.bind(this);
        this.onSuccessfulDelete = this.onSuccessfulDelete.bind(this);

    }

    onDelButtonClick(event) {
        event.preventDefault();
        if (event.target.id.length > 8) {
            $.post(this.actionUrl, {
                    id: event.target.id
                }, data => this.onSuccessfulDelete(data))
                .fail(function () {
                    console.log('All is Lost!');
                });
        } else {
            console.log('FakeData');
        }
    }

    onSuccessfulDelete(data) {
        if (data.valid) {
            let row = $(data.row);
            row.hide('slow', function () {
                row.remove();
            })
        } else {
            if (data.msg !== undefined) {
                console.log(data.msg);
            } else {
                console.log('Nope!');
            }
        }
    }
}


$(function () {
    if ($('.js-deleteButton').length) {
        if ($('#attendeesList').length) {
            new DeleteButtonHandler('.js-deleteButton', '#attendeesList');
        }
        if ($('#eventList').length) {
            new DeleteButtonHandler('.js-deleteButton', '#eventList');
        }
    }
})
