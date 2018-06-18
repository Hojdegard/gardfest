/* formhandler */

class eventHandler extends formhandler {
    constructor(formId){
        super(formId)
        this.onSubmitSuccess = this.onSubmitSuccess.bind(this);
        
        this.showFormCb = this.showFormCb.bind(this)
        $('#eventshowform').on('click', this.showFormCb.bind(this));

        this.cancelFormCb = this.cancelFormCb.bind(this)
        $('#eventcancel').on('click', this.cancelFormCb.bind(this));

        $('#eventFormDiv').hide();
    }

    onSubmitSuccess(response) {
        if(response){
            if(response.valid){
                $('#eventFormDiv').hide("slow", function() {
                    location.reload(true);
                })
            } else {
                console.error(response.msg);
            }
        }
        
    }

    showFormCb(event){
        event.preventDefault();
        $('#eventshowform').hide("slow");
        $('#eventFormDiv').show("slow");
    }

    cancelFormCb(event){
        event.preventDefault();
        $('#eventFormDiv').hide("slow");
        $('#eventshowform').show("slow");
    }
}

$(function() {
    if($('#eventForm').length){
        new eventHandler('#eventForm');
    }
});