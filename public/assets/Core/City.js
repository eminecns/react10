var City = (function (base) {

    base.InitPage = function () {
        base.table = $(".city-table").DataTable({
            dom: '<"html5buttons"B>lTfgtip',
            "language": {
                "url": "/Content/Scripts/plugins/dataTables/localization/TR.json",
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
                    title: 'Müşteri Listesi',
                },
                {
                    extend: 'excel',
                    text: 'Excel',
                    titleAttr: 'Excel',
                    title: 'Şehir Listesi',
                },
                {
                    extend: 'csv',
                    text: 'CSV',
                    titleAttr: 'CSV',
                    title: 'Şehir Listesi',
                },
                {
                    extend: 'pdf',
                    text: 'PDF',
                    titleAttr: 'PDF',
                    title: 'Şehir Listesi',
                },
                {
                    extend: 'print',
                    text: 'Yazdır',
                    titleAttr: 'Yazdır',
                    title: 'Şehir Listesi',
                }, ],
            "processing": true,
            "serverSide": true,
            "info": true,
            "lengthMenu": [[10, 20, 50, -1], [10, 20, 50, "Hepsi"]],
            "ajax": {
                "url": "/Home/Dahsboard",
                "type": "GET",
                "data": function (d) {
                }
            },
            "ordering": false,
            "columns": [
                 {
                     "orderable": false,
                     "data": null,
                     "defaultContent": '<div class="tooltips"><a id="c-edit" class="label label-success" data-toggle="tooltip" data-placement="top" title="" data-original-title="Düzenle"><i class="fa fa-wrench"></i></a>   ' +
                         '<a id="c-status" class="label label-danger" data-toggle="tooltip" data-placement="top" title="" data-original-title="Pasif Yap"><i class="fa fa-trash-o"></i></a></div>'
                 },
                { "orderable": false, "data": "traffic_code" },
                { "orderable": false, "data": "city_name" },
               
                  {
                      "orderable": false,
                      "data": null,
                      "defaultContent": ''
                  }

            ],
            "createdRow": function (row, data, index) {
                if (data.IsActive) {
                    $('td', row).eq(4).html('<label class="text-navy">Aktif</label>');
                }
                else {
                    $('td', row).eq(4).html('<label class="text-danger">Pasif</label>');
                    $("#c-status", row).attr("class", "label label-primary");
                    $("#c-status", row).attr("data-original-title", "Aktif Yap");
                    $("#c-status", row).html('<i class="fa fa-share-square"></i>')
                }
                $('td', row).eq(5).html('<a href="AuthorizedPerson?customerId=' + data.Id + '" class="btn btn-primary btn-xs">Yetkili Kişiler</a>');
                $('#c-edit', row).attr("href", "/City/Edit/" + data.traffic_code);
            },
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
            "fnInitComplete": function (oSettings, json) {
                $('.tooltips').tooltip({
                    selector: "[data-toggle=tooltip]",
                    container: "body"
                });
            },
            "fnDrawCallback": function (oSettings) {

            },
            "order": [[1, 'asc']]
        });

        $(".customer-table tbody").on("click", "#c-status", function () {
            var $tr = $(this).parents('tr');
            var id = $tr.find('td:eq(1)').text(); // Id yi al

            JsFramework.ConfirmationMessage("Bu firmanın durumu değiştirmek istediğinizden emin misiniz?", function () {
                Customer.UpdateCustomerStatus(id, function (data) {
                    if (data.IsSucceeded) {
                        JsFramework.AjaxResponse.SuccessMessage("Başarılı", "Kaydınız başarılı bir şekilde güncellenmiştir.", "success")
                        var statusButton = $tr.find('#c-status');
                        if (data.Data) {
                            statusButton.attr("class", "label label-danger");
                            statusButton.attr("data-original-title", "Pasif Yap");
                            statusButton.html('<i class="fa fa-trash-o"></i>');
                            $('td', $tr).eq(4).html('<label class="text-navy">Aktif</label>');
                        }
                        else {
                            statusButton.attr("class", "label label-primary c-status");
                            statusButton.attr("data-original-title", "Aktif Yap");
                            statusButton.html('<i class="fa fa-share-square"></i>');
                            $('td', $tr).eq(4).html('<label class="text-danger">Pasif</label>');
                        }
                    }
                    else {
                        JsFramework.AjaxResponse.ErrorMessage(data);
                    }

                })
            });
        });

    }

    base.InitSaveOrUpdatePage = function () {
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
        });

        $("#customer-saveupdate").validate({
            rules: {
                Name: {
                    required: true
                },
            },
            messages: {
                Name: {
                    required: "Lütfen bir firma adı giriniz."
                },
            },
            submitHandler: function (form) {

                var Id = $("#Id").val();
                Customer.SaveOrUpdate({
                    Id: Id,
                    Name: $("#Name").val(),
                    Address: $("#Address").val(),
                    TaxOffice: $("#TaxOffice").val(),
                    TaxNumber: $("#TaxNumber").val(),
                    AuthorizedPersonName: $("#AuthorizedPersonName").val(),
                    Position: $("#Position").val(),
                    Tel: $("#Tel").val(),
                    Internal: $("#Internal").val(),
                    Position: $("#Position").val(),
                    GSM: $("#GSM").val(),
                    Email: $("#Email").val(),
                    IsActive: $("#IsActive").is(":checked")
                }, function (d) {
                    console.log(d);
                    if (d.IsSucceeded) {
                        var cookieVal = "";
                        if (Id != 0) {
                            cookieVal = "updated";
                        }
                        else {
                            cookieVal = "added";
                        }
                        $.cookie("md_res", cookieVal, { path: '/', expires: 1 });
                        swal({
                            title: "Başarılı",
                            text: "Kaydınız başarılı bir şekilde gerçekleştirildi.",
                            type: "success",
                            confirmButtonText: "Tamam"
                        },
                        function(){
                            location.href = "/Customer";
                        });
                        //JsFramework.AjaxResponse.SuccessMessage("Başarılı", "Kaydınız başarılı bir şekilde gerçekleştirildi.", "success");
                        
                    }
                    else {
                        JsFramework.AjaxResponse.ErrorMessage(d);
                    }
                })
            }
        });

    }

    base.SaveOrUpdate = function (data, callback) {
        JsFramework.AjaxRequest.SendRequest("POST", "/Customer/SaveOrUpdate", JSON.stringify(data), callback);
    }

    base.UpdateCustomerStatus = function (id, callback) {
        var customerData = {};
        customerData.Id = id;
        var response = JsFramework.AjaxRequest.SendRequest("POST", "/Customer/UpdateStatus", JSON.stringify(customerData), callback);
    }


    return base;
}(Customer || {}));
