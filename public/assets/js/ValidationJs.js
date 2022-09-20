function redirectWindow(urlAddress) {
    window.location.href = urlAddress;
}
function doModal(placementId, heading, formContent, strSubmitFunc, btnText, buttonType) {
    html = '<div id="modalWindow" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirm-modal" aria-hidden="true">';
    html += '<div class="modal-dialog">';
    html += '<div class="modal-content panel-succes">';
    html += '<div class="modal-header">';
    html += '<a class="close"'; 
    //if (heading == "Uyarı")
    //    html += ' href="' + strSubmitFunc + '"';
    //else
        html += ' data-dismiss="modal"';
    //html += ' onclick="hideModal();"';
    html += '     >×</a > ';
    html += '<h4>' + heading + '</h4>'
    html += '</div>';
    html += '<div class="modal-body">';
    html += formContent;
    html += '</div>';
    html += '<div class="modal-footer">';
    if (btnText != '') {
        html += '<span class="btn btn-' + buttonType + '"';
        html += ' onClick="' + strSubmitFunc + '">' + btnText;
        html += '</span>';
        html += '<a class="btn btn-danger" data-dismiss="modal">Hayır</a>';
    }
    html += '<span class="btn" data-dismiss="modal">';
    html += '</span>'; // close button
    html += '</div>';  // footer
    html += '</div>';  // content
    html += '</div>';  // dialog
    html += '</div>';  // modalWindow
    $("#" + placementId).html(html);
    $("#modalWindow").modal();
    $("#dynamicModal").modal('show');
}
function hideModal() {
    // Using a very general selector - this is because $('#modalDiv').hide
    // will remove the modal window but not the mask
    $('.modal.in').modal('hide');
}
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@@\"]+(\.[^<>()[\]\\.,;:\s@@\"]+)*)|(\".+\"))@@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validateString(text) {
    var re = /^[a-zA-ZğüşıöçĞÜŞİÖÇ ]*$/
    return re.test(text);
}
function validateIpAddress(IpAddress) {
    var re = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return re.test(IpAddress);

}
function validatePassword(password) {
    if (password != null || password.toString() != '') {
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?])/
        return re.test(password);
    }
    else {
        return false;
    }
}
function validateExtension(Extension) {
    if (Extension != null || Extension.toString() != '') {
        var re = /^[0-9]*$/
        return re.test(Extension);
    }
    else
        return true;
}
function validatePhone(Number) {
    if (Number.length == 17)
        return true;
    else if (Number.length == 0)
        return true;
    else
        return false;
}
function validateCardUID(CardUID) {
    var re = /^[0-9A-Fa-f]*$/;
    return re.test(CardUID)
}
//function validateSerialNumber(SerialNo) {
//    if (SerialNo != null || SerialNo.toString() != '') {

//        //if (SerialNo.length)
//        alert(SerialNo.length)
//    }
//    else
//        return true
//}
function validateMacAddress(MacAdres) {
    if (MacAdres == "")
        return true;
    else
        var re = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/;
    return re.test(MacAdres);
}
function checkValidations() {
    var ErrorMessage = '';
    var HasError = false;

    var NationalID = document.getElementById('NationalID');
    if (NationalID != null) {
        event.preventDefault();
        var isValid = checkTcNum(NationalID.value);
        console.log('isValid ', isValid);
        if (isValid) {
            $('#NationalIdError').text("BAŞARILI").attr('class', 'text-uppercase text-success');
        }
        else {
            $('#NationalIdError').text("HATALI").attr('class', 'text-uppercase text-danger');
        }
    }

    var IpAddress = document.getElementById("IPAddress");
    if (IpAddress != null) {
        var IpAdres = IpAddress.value;
        if (!validateIpAddress(IpAdres)) {
            ErrorMessage += "Girmis oldugunuz Ip Adresi gecerli degil. <br>";
            HasError = true;
        }
    }

    var extension = document.getElementById("Extension");
    if (extension != null) {
        var Exten = extension.value;
        if (!validateExtension(Exten)) {
            ErrorMessage += "Girmis oldugunuz dahili numara hatalıdır. <br>";
            HasError = true;
        }
    }

    var Password = document.getElementById("Password");
    if (Password != null) {
        var pass = Password.value;
        if (Password.type == 'hidden') true;
        else if (!validatePassword(pass)) {
            ErrorMessage += "Sifre alanı bos olarak bırakılamaz veya Türkce karakterler sifre icerisinde kullanılamaz. <br>";
            HasError = true;
        }
    }

    var NewPassword = document.getElementById("NewPassword");
    if (NewPassword != null) {
        var newPass = NewPassword.value;
        if (NewPassword.type == 'hidden') true;
        else if (!validatePassword(newPass)) {
            ErrorMessage += "Sifre alanı bos olarak bırakılamaz veya Türkce karakterler sifre icerisinde kullanılamaz. <br>";
            HasError = true;
        }
    }

    var Email = document.getElementById("Email");
    if (Email != null) {
        var mail = Email.value;
        if (mail.length <= 0) {
            ErrorMessage += "Email adresi girilmesi zorunludur. <br>";
            HasError = true;
        }
        if (!validateEmail(mail)) {
            ErrorMessage += "Girmis oldugunuz Email adresi gecerli degil. <br>";
            HasError = true;
        }
    }

    var CardUID = document.getElementById("CardUID");
    if (CardUID != null) {
        var cardID = CardUID.value;
        if (!validateCardUID(cardID)) {
            ErrorMessage += "Girmis oldugunuz Kart Numarası gecerli degil. <br>";
            HasError = true;
        }
    }

    var MacAddress = document.getElementById("MacAddress")
    if (MacAddress != null) {
        var macAdres = MacAddress.value;
        if (!validateMacAddress(macAdres)) {
            ErrorMessage += "Girmis oldugunuz Mac Adresi gecerli degil. <br>";
            HasError = true;
        }
    }

    var ContactPhone = document.getElementById('ContactPhone');
    if (ContactPhone != null) {
        var Number = ContactPhone.value;
        if (!validatePhone(Number)) {
            ErrorMessage += "Girmis oldugunuz Telefon Numarası veya Gsm Numarası hatalıdır. <br>";
            HasError = true;
        }
    }

    var ContactPhone = document.getElementById('Phone');
    if (ContactPhone != null) {
        var Number = ContactPhone.value;
        if (!validatePhone(Number)) {
            ErrorMessage += "Girmis oldugunuz Telefon Numarası veya Gsm Numarası hatalıdır. <br>";
            HasError = true;
        }
    }

    var oldPassBox = document.getElementById('OldPassword');
    if (oldPassBox != null) {
        if (oldPassBox.value == null || oldPassBox.value == '') {
            ErrorMessage = ErrorMessage + ' Eski sifre bos gecilemez. <br>';
            HasError = true;
        }
    }

    var newPassBox = document.getElementById('NewPassword');
    if (newPassBox != null) {
        if (newPassBox.value == null || newPassBox.value == '') {
            ErrorMessage = ErrorMessage + ' Yeni sifre bos gecilemez. <br>';
            HasError = true;
        }
        else if (!validatePassword(newPassBox.value)) {
            ErrorMessage = ErrorMessage + ' Yeni sifre Türkce karakter icermemelidir.';
            HasError = true;
        }
    }

    var newPassChkBox = document.getElementById('NewPasswordCheck');
    if (newPassChkBox != null) {
        if (newPassChkBox.value == null || newPassChkBox.value == '') {
            ErrorMessage = ErrorMessage + ' Yeni sifre tekrar alani bos gecilemez. <br>';
            HasError = true;
        }
    }
    if (newPassBox != null && newPassChkBox != null) {
        if (newPassBox.value != newPassChkBox.value) {
            ErrorMessage = ErrorMessage + ' Yeni sifre ve yeni sifre tekrar alani eslesmemektedir. <br>';
            HasError = true;
        }
    }

    var newDevicePass = document.getElementById('NewPass');
    if (newDevicePass != null) {
        //if (newDevicePass.value == null || newDevicePass.value == '') {
        //    ErrorMessage = ErrorMessage + ' Yeni sifre bos gecilemez. <br>';
        //    HasError = true;
        //}
        if (!validatePassword(newDevicePass.value)) {
            ErrorMessage = ErrorMessage + ' Yeni sifre Türkce karakter icermemelidir.';
            HasError = true;
        }
    }

    var newDevicePassChkBox = document.getElementById('NewPassConf');
    //if (newDevicePassChkBox != null) {
    //    if (newDevicePassChkBox.value == null || newDevicePassChkBox.value == '') {
    //        ErrorMessage = ErrorMessage + ' Yeni sifre tekrar alani bos gecilemez. <br>';
    //        HasError = true;
    //    }
    //}
    if (newPassBox != null && newDevicePassChkBox != null) {
        if (newPassBox.value != newDevicePassChkBox.value) {
            ErrorMessage = ErrorMessage + ' Yeni sifre ve yeni sifre tekrar alani eslesmemektedir. <br>';
            HasError = true;
        }
    }

    //var serialNumber = document.getElementById('SerialNumber');
    //if (serialNumber != null) {
    //    var SerialNumber = serialNumber.value;
    //    alert(validateSerialNumber(serialNumber));
    //    if (!validateSerialNumber(serialNumber)) {
    //        ErrorMessage += "\n Girmis oldugunuz Seri Numarası hatalıdır. Max 20 karakter uzunluğunda ve sadece rakam içerebilir.";
    //        HasError = true;
    //    }
    //}

    var firstName = document.getElementById('FirstName');
    if (firstName != null) {
        var stringText = firstName.value;
        if (!validateString(stringText)) {
            ErrorMessage += "Girmiş olduğunuz isim hatalı karakterler içermektedir. <br>";
            HasError = true;
        }
    }

    var lastName = document.getElementById('LastName');
    if (lastName != null) {
        var stringText = lastName.value;
        if (!validateString(stringText)) {
            ErrorMessage += "Girmiş olduğunuz soyisim hatalı karakterler içermektedir. <br>";
            HasError = true;
        }
    }

    var Name = document.getElementById('Name');
    if (Name != null) {
        var stringText = Name.value;
        if (!validateString(stringText)) {
            ErrorMessage += "Girmiş olduğunuz isim hatalı karakterler içermektedir. <br>";
            HasError = true;
        }
    }

    var surName = document.getElementById('Surname');
    if (surName != null) {
        var stringText = surName.value;
        if (!validateString(stringText)) {
            ErrorMessage += "Girmiş olduğunuz soyisim hatalı karakterler içermektedir. <br>";
            HasError = true;
        }
    }

    var ContactPhone = document.getElementById('GSM');
    if (ContactPhone != null) {
        var Number = ContactPhone.value;
        if (!validatePhone(Number)) {
            ErrorMessage += "Girmis oldugunuz Telefon Numarası veya Gsm Numarası hatalıdır. <br>";
            HasError = true;
        }
    }

    var tcno = document.getElementById('NationalIdError');
    if (tcno != null && tcno.innerText != "BAŞARILI") {
        ErrorMessage += "Girmis oldugunuz Tc Kimlik numarası gecerli degil. <br>";
        HasError = true;
    }

    var Location = document.getElementById('LocationID');
    if (Location != null) {
        var LocationId = Location.value;
        if (LocationId == 0) {
            ErrorMessage += 'Lokasyon secimi zorunludur. <br>'
            HasError = true;
        }
    }

    var DeviceType = document.getElementById('DeviceTypeID');
    if (DeviceType != null) {
        var DeviceTypeId = DeviceType.value;
        if (DeviceTypeId == 0) {
            ErrorMessage += 'Cihaz tip secimi zorunludur. <br>'
            HasError = true;
        }
    }

    var DeviceModel = document.getElementById('ModelID');
    if (DeviceModel != null) {
        var DeviceModelId = DeviceModel.value;
        if (DeviceModelId == 0) {
            ErrorMessage += 'Cihaz model secimi zorunludur. <br>'
            HasError = true;
        }
    }

    var DeviceBrand = document.getElementById('BrandID');
    if (DeviceBrand != null) {
        var DeviceBrandId = DeviceBrand.value;
        if (DeviceBrandId == 0) {
            ErrorMessage += 'Cihaz marka secimi zorunludur. <br>'
            HasError = true;
        }
    }

    var DeviceCode = document.getElementById('DeviceCode');
    if (DeviceCode != null) {
        var deviceCode = DeviceCode.value;
        if (deviceCode == null || deviceCode == '') {
            ErrorMessage += 'Cihaz ID bos gecilemez<br>';
            HasError = true;
        }
    }

    var DeviceName = document.getElementById('DeviceName');
    if (DeviceName != null) {
        var deviceName = DeviceName.value;
        if (deviceName == null || deviceName == '') {
            ErrorMessage += 'Cihaz adi bos gecilemez <br>';
            HasError = true;
        }
    }

    var RoleName = document.getElementById('RoleName');
    if (RoleName != null) {
        var roleName = RoleName.value;
        if (roleName == null || roleName == '') {
            ErrorMessage += 'Rol adi bos gecilemez <br>';
            HasError = true;
        }
    }

    var HasCheckBox = document.getElementsByName('CheckboxResults')
    if (HasCheckBox.type == 'radio') {
        var HasChecked = $('input:radio').filter(':checked').length;
        if (HasChecked < 1 && HasCheckBox != null && HasCheckBox.length > 0) {
            ErrorMessage += 'En az bir rol/yetki secimi yapınız <br>';
            HasError = true;
        }
    }


    var OrganizationName = document.getElementById('OrganizationName');
    if (OrganizationName != null) {
        var organizationName = OrganizationName.value;
        if (organizationName == null || organizationName == '') {
            ErrorMessage += 'Kurum adi bos gecilemez <br>';
            HasError = true;
        }
    }

    var OrganizationID = document.getElementById('OrganizationID');
    if (OrganizationID != null) {
        var organizationID = OrganizationID.value;
        if (organizationID == null || organizationID == 0) {
            ErrorMessage += 'Kurum seçimi yapınız. <br>';
            HasError = true;
        }
    }

    var CorporationName = document.getElementById('CorporationName');
    if (CorporationName != null) {
        var corporationName = CorporationName.value;
        if (corporationName == null || corporationName == '') {
            ErrorMessage += 'Firma adi bos gecilemez <br>';
            HasError = true;
        }
    }

    var CorporationID = document.getElementById('CorporationID');
    if (CorporationID != null) {
        var corporationID = CorporationID.value;
        if (corporationID == null || corporationID == 0) {
            ErrorMessage += 'Firma seçimi yapınız. <br>';
            HasError = true;
        }
    }

    var RegionName = document.getElementById('RegionName');
    if (RegionName != null) {
        var regionName = RegionName.value;
        if (regionName == null || regionName == '') {
            ErrorMessage += 'Bölge adi bos gecilemez <br>';
            HasError = true;
        }
    }

    var RegionID = document.getElementById('RegionID');
    if (RegionID != null) {
        var regionID = RegionID.value;
        if (regionID == null || regionID == 0) {
            ErrorMessage += 'Bölge seçimi yapınız. <br>';
            HasError = true;
        }
    }

    var DepartmentName = document.getElementById('DepartmentName');
    if (DepartmentName != null) {
        var departmentName = DepartmentName.value;
        if (departmentName == null || departmentName == '') {
            ErrorMessage += 'Departman adi bos gecilemez <br>';
            HasError = true;
        }
    }

    var LocationName = document.getElementById('LocationName');
    if (LocationName != null) {
        var locationName = LocationName.value;
        if (locationName == null || locationName == '') {
            ErrorMessage += 'Lokasyon adi bos gecilemez <br>';
            HasError = true;
        }
    }

    var DeviceBrandName = document.getElementById('BrandName');
    if (DeviceBrandName != null) {
        var deviceBrandName = DeviceBrandName.value;
        if (deviceBrandName == null || deviceBrandName == '') {
            ErrorMessage += 'Marka adı bos gecilemez <br>';
            HasError = true;
        }
    }

    var DeviceModelName = document.getElementById('ModelName');
    if (DeviceModelName != null) {
        var deviceModelName = DeviceModelName.value;
        if (deviceModelName == null || deviceModelName == '') {
            ErrorMessage += 'Model adı bos gecilemez <br>';
            HasError = true;
        }
    }

    var PersonnelTypeName = document.getElementById('PersonnelTypeName');
    if (PersonnelTypeName != null) {
        var personnelTypeName = PersonnelTypeName.value;
        if (personnelTypeName == null || personnelTypeName == '') {
            ErrorMessage += 'Personel tipi adı bos gecilemez <br>';
            HasError = true;
        }
    }

    var PersonnelTitleName = document.getElementById('PersonnelTitleName');
    if (PersonnelTitleName != null) {
        var personnelTitleName = PersonnelTitleName.value;
        if (personnelTitleName == null || personnelTitleName == '') {
            ErrorMessage += 'Unvan adı bos gecilemez <br>';
            HasError = true;
        }
    }

    var PersonnelGroupName = document.getElementById('PersonnelGroupName');
    if (PersonnelGroupName != null) {
        var personnelGroupName = PersonnelGroupName.value;
        if (personnelGroupName == null || personnelGroupName == '') {
            ErrorMessage += 'Personel grup adı bos gecilemez <br>';
            HasError = true;
        }
    }

    var DeviceGroupName = document.getElementById('DeviceGroupName');
    if (DeviceGroupName != null) {
        var deviceGroupName = DeviceGroupName.value;
        if (deviceGroupName == null || deviceGroupName == '') {
            ErrorMessage += 'Cihaz grup adı bos gecilemez <br>';
            HasError = true;
        }
    }

    var DeviceTypeName = document.getElementById('DeviceTypeName');
    if (DeviceTypeName != null) {
        var deviceTypeName = DeviceTypeName.value;
        if (deviceTypeName == null || deviceTypeName == '') {
            ErrorMessage += 'Cihaz tipi adı bos gecilemez <br>';
            HasError = true;
        }
    }


    return ErrorMessage;
}
function Direction(path) {
    debugger;
    window.location.href = path;
}
function CheckPath(header, funcStr, btnText, errorMes, classType) {
    var ErrorMessage = checkValidations();
    doModal('idMyModal', header, errorMes, funcStr, btnText, classType);

}
function Exit() {
    var header = "Çıkış";
    var content = "Çıkış yapmak istediğinizeden emin misiniz?";
    var strSubmitFunc = 'ConfirmExit()';
    var btnText = "Evet";
    doModal('idMyModal', header, content, strSubmitFunc, btnText, 'success');
}
function ConfirmExit() {
    window.location.href = "/Home/LogOut";
}
function SubmitForm() {
    $("#myID").submit();
}
function ResetForm() {
    document.getElementById("myID").reset();
}