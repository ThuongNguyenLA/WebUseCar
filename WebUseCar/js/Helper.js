var RiderRootUrl = "http://api-rider.xeduadon.com";
function PostDataAjax(url, data, success,fail,bSetHeader,strmethod) {
    //if (!timeout)
    //    timeout = 30000;
    //$.ajax({
    //    url: RootUrl + url,
    //    method: "POST",
    //    timeout: timeout,
    //    cache: true,
    //    crossDomain: true,
    //    contentType: "application/json; charset=utf-8;",
    //    dataType: 'json',
    //    data: data,
    //    processData: true,
    //    beforeSend: beforeSend,
    //    done: success,
    //    error: error
    //});

    if (strmethod == null || strmethod == undefined)
    {
        strmethod = "POST";
    }

    $.ajax({
        method: strmethod,
                url: RiderRootUrl + url,
                crossDomain: true,
                data: JSON.stringify(data),//đưa về chuỗi của đối tượng json
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function (hd) {
                    if (bSetHeader)
                    hd.setRequestHeader('Authorization', localStorage.getItem("token"));
                }
    }).done(success).fail(fail);
}
//    $.ajax({
//        method: "POST",
//        url: "http://api-rider.xeduadon.com/api/signup/submit",
//        data: JSON.stringify(dataSend),//đưa về chuỗi của đối tượng json
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//    }).done(function (res) {
//        alert(JSON.stringify(res));
//        //$("#divResult").html(JSON.stringify(res));
//    });
//}
function PostDataAjaxSync(url, data, beforeSend, success, error) {
    $.ajax({
        url: RootUrl + url,
        type: 'POST',
        timeout: 10000,
        method: "POST",
        cache: true,
        crossDomain: true,
        contentType: "application/json; charset=utf-8;",
        dataType: 'json',
        data: data,
        processData: true,
        beforeSend: beforeSend,
        success: success,
        error: error,
        async: false
    });
}
