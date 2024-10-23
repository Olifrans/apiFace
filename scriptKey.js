
const subscriptionKey = "7Zqwho7QmE05QIFwhl8eqB4NL5z4NIos50WAqSKVc1a96BWhQuFLJQQJ99AJACYeBjFXJ3w3AAAKACOGrljU";
const url = "https://senaiprofmarcos.cognitiveservices.azure.com/face/1.0/detect";



var makeblob = function (dataURL) {
    const BASE64_MARKER = ';base64,';
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {
        type: contentType
    });
}



var processImage = function (sourceImage) {
    var param = {
        "detectionModel": "detection_01",
        "returnFaceId": "true",
        "returnAge": "true",
        "returnFaceAttributes": "age, emotion, glasses, gender, smile",
        "recognitionModel": "recognition_01"
    };


    $.ajax({
        url: url + "?" + $.param(param),
        type: "POST",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-Type", "application/octet-stream");
            xhr.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
        data: sourceImage,
        processData: false
    }).done(function (data) {
        debugger
        if (data.length == 1)
            makeDiv(data[0]);
    });
}


var makeDiv = function (data) {
    debugger;
    let height = data.faceRectangle.height;
    let left = data.faceRectangle.left;
    let top = data.faceRectangle.top;
    let width = data.faceRectangle.width;
    $("div").css("height", height);
    $("div").css("left", left);
    $("div").css("top", top);
    $("div").css("width", width);
    $("ul").empty();
    $("ul").append(`<li>Idade:${data.faceAttributes.age}</li>`);
    $("ul").append(`<li>Sexo:${data.faceAttributes.gender}</li>`);
    $("ul").append(`<li>Óculos:${data.faceAttributes.glasses}</li>`);
    $("ul").append(`<li>Sorriso:${data.faceAttributes.smile}</li>`);
    $("ul").append(`<li>Bravo:${data.faceAttributes.emotion.anger}</li>`);
    $("ul").append(`<li>Feliz:${data.faceAttributes.emotion.happiness}</li>`);
    $("ul").append(`<li>Neutro:${data.faceAttributes.emotion.neutral}</li>`);

}
