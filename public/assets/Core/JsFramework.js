var JsFramework = (function (base) {

    base.AjaxRequest = function () {
        this.Type = "";
        this.Url = "";
        this.Data = "";
        this.IsSuccess = false;
    }

    base.AjaxResponse = function () {
        this.Data = "";
        this.IsSuccess = false;
        this.ErrorMessages = [];
        this.ResultCode = "";
        this.ReturnData = "";
        this.AjaxError = "";
    }

    base.AjaxRequest.SendRequest = function (type, url, data, callback) {
        var newRequest = new base.AjaxRequest();
        newRequest.Type = type;
        newRequest.Url = url;
        newRequest.Data = data;
        var response = new base.AjaxResponse();
        $.ajax({
            type: newRequest.Type,
            url: newRequest.Url,
            data: newRequest.Data,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            cache: false,
            success: function (d) {
                response = d;
                if (callback) {
                    callback(d);
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                response.AjaxError = textStatus + " " + errorThrown;
                console.log(textStatus + errorThrown);
                JsFramework.AjaxResponse.AjaxError();
            }
        });

        return response;
    }
    base.AjaxResponse.Notify = function (d) {

    }

    base.ConfirmationMessage = function (message, callback) {

        swal({
            title: "Emin misiniz?",
            text: message,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Evet, Eminim!",
            cancelButtonText: "Hayır",
            closeOnConfirm: false,
            closeOnCancel: true
        }, function (isConfirm) {
            if (isConfirm) {
                callback();
            }
        });

    }

    base.AjaxResponse.SuccessMessage = function (title, message, type) {
        var buttonColor = "#8CD4F5";
        if (type == "error") {
            buttonColor = "#DD6B55";
        }
        swal({
            title: title,
            text: message,
            type: type,
            confirmButtonText: "Tamam",
            confirmButtonColor: buttonColor
        });
    }
    base.AjaxResponse.ErrorMessage = function (data) {
        var message = {};
        message.title = "Hata!";
        var $ul = '<ul class="list-group">';
        $.each(data.ErrorMessages, function (index, value) {
            var $li = '<li  class="list-group-item"><strong>' + value.ErrorMessage + "</strong></li>";
            $ul = $ul + $li;
        });
        $ul = $ul + '</ul>';
        message.text = $ul;
        message.type = "error";
        message.html = true;

        swal({
            title: message.title,
            text: message.text,
            type: message.type,
            html: message.html,
            confirmButtonText: "Tamam",
            confirmButtonColor: "#DD6B55"
        });
    }
    base.AjaxResponse.AjaxError = function () {
        swal({
            title: "Hata!",
            text: "Beklenmeyen bir hata oluştu",
            type: "error",
            confirmButtonText: "Tamam",
            confirmButtonColor: "#DD6B55"

        });
    }

    base.CreateTableButtons = function () {
        var buttons = '<div class="tooltips"><a id="c-edit" class="label label-success" data-toggle="tooltip" data-placement="top" title="" data-original-title="Düzenle"><i class="fa fa-wrench"></i></a>   ' +
                         '<a id="c-status" class="label label-danger" data-toggle="tooltip" data-placement="top" title="" data-original-title="Pasif Yap"><i class="fa fa-trash-o"></i></a></div>';
        return buttons;
    }

    //aktif/pasif yap butonuna basıldıktan sonraki buton değiştirme
    base.StatusButtonProcess = function ($tr, col, data) {
        var statusButton = $tr.find('#c-status');
        if (data.Data) {
            statusButton.attr("class", "label label-danger");
            statusButton.attr("data-original-title", "Pasif Yap");
            statusButton.html('<i class="fa fa-trash-o"></i>');
            $('td', $tr).eq(col).html('<label class="text-navy">Aktif</label>');
        }
        else {
            statusButton.attr("class", "label label-primary c-status");
            statusButton.attr("data-original-title", "Aktif Yap");
            statusButton.html('<i class="fa fa-share-square"></i>');
            $('td', $tr).eq(col).html('<label class="text-danger">Pasif</label>');
        }
    }

    //Tablodaki aktif yap pasif yap butonunu değiştirir
    base.ActivePassiveButtonProcess = function (row, col, data) {
        if (data.IsActive) {
            $('td', row).eq(col).html('<label class="text-navy">Aktif</label>');
        }
        else {
            $('td', row).eq(col).html('<label class="text-danger">Pasif</label>');
            $("#c-status", row).attr("class", "label label-primary");
            $("#c-status", row).attr("data-original-title", "Aktif Yap");
            $("#c-status", row).html('<i class="fa fa-share-square"></i>')
        }
    }

    base.CreateTable = function (prop) {

        var table = $(prop.selector).DataTable({
            dom: '<"html5buttons"B>lTfgtip',
            "language": {
                "url": "/Assets/Scripts/plugins/dataTables/localization/TR.json",
                buttons: {
                    copyTitle: "Panoya kopyalandı.",
                    copySuccess: {
                        _: '%d satır kopyalandı.',
                        1: '1 satır kopyalandı.'
                    }
                }
            },
            buttons: [
           {
               extend: 'copy',
               text: 'Kopyala',
               titleAttr: 'Kopyala',
               title: prop.buttonTitle,
           },
           {
               extend: 'excel',
               text: 'Excel',
               titleAttr: 'Excel',
               title: prop.buttonTitle,
           },
           {
               extend: 'csv',
               text: 'CSV',
               titleAttr: 'CSV',
               title: prop.buttonTitle,
           },
           {
               extend: 'pdf',
               text: 'PDF',
               titleAttr: 'PDF',
               title: prop.buttonTitle,
           },
           {
               extend: 'print',
               text: 'Yazdır',
               titleAttr: 'Yazdır',
               title: prop.buttonTitle,
           }, ],
            "processing": true,
            "serverSide": true,
            "info": true,
            "lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "Hepsi"]],
            "ajax": {
                "url": prop.ajaxUrl,
                "type": "GET",
                "data": function (d) {
                    //d.IsActive = $("#IsActive").val();
                }
            },
            "ordering": false,
            "columns": prop.columns,
            "createdRow": function (row, data, index) {
                JsFramework.ActivePassiveButtonProcess(row, prop.activeButtonColumn, data);
                if (prop.editUrl) {
                    $('#c-edit', row).attr("href", prop.editUrl + data.Id);
                }

            },
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
            "fnInitComplete": function (oSettings, json) {
                $('.tooltips').tooltip({
                    selector: "[data-toggle=tooltip]",
                    container: "body"
                });
            },
            "order": [[1, 'asc']]
        });


    }


    base.GetImage = function (input, selector) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $(selector).attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    return base;
}(JsFramework || {}));