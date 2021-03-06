document.getElementById('login').addEventListener('click', function () {
    var mb_id = document.getElementsByName('mb_id')[0].value;
    var mb_pw = document.getElementsByName('mb_pw')[0].value;

    var data = {
        'mb_id': mb_id,
        'mb_pw': mb_pw
    }

    sendAjax('http://localhost:8080/member/login', data);
})

function sendAjax(url, data) {
    console.log(data)
    data = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);

    xhr.addEventListener('load', function () {
        var result = JSON.parse(xhr.responseText);
        if (result.result === 0) window.location.href= '/';
        showResult(result.result,result.message);
    })
}

function initForm() {
    var form = document.forms[0];
    form.elements[0]
    for (let index = 0; index < form.elements.length; index++) {
        const element = form.elements[index];
        if (element.type != 'button') element.value = '';
    }
}

function showResult(result, message) {
    var alert = document.getElementsByClassName('alert');

    for (let index = 0; index < alert.length; index++) {
        const element = alert[index];
        element.hidden = true;
    }

    alert[result].hidden = false;
    alert[result].innerText = message;
}