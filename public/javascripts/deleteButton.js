class DeleteButtonHandler{
    constructor(className, id){
        this.attendeeList = $(id);
        this.actionUrl = window.location.pathname + this.attendeeList.data('url');
        
        $(className).on('click', this.onDelButtonClick.bind(this));

        this.onDelButtonClick = this.onDelButtonClick.bind(this);
        this.onSuccessfulDelete = this.onSuccessfulDelete.bind(this);

    }

    onDelButtonClick(event){
        event.preventDefault();
        $.post(this.actionUrl, { id: event.target.id }, data => this.onSuccessfulDelete(data))
        .fail( function() {
            console.log('All is Lost!');
        });
    }

    onSuccessfulDelete(data){
        if(data.valid){
            let row = $(data.row);
            row.hide('slow', function(){
                row.remove();
            })
        } else {
            if(data.msg.length){
                console.log(data.msg);
            } else {
            console.log('Nope!');
            }
        }            
    }
}


$(function(){
    if($('.deletButton').length){
        if($('#attendeesList').length){
            new DeleteButtonHandler('.deletButton', '#attendeesList');
        }
        if($('#eventList').length){
            new DeleteButtonHandler('.deletButton', '#eventList');
        }
    }
})