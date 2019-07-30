$(document).ready(function () {

    var $loginForm = $('#login-form');
    var $alert = $('.alert');

    var empty = true;

    $alert.toggle();

    $loginForm.submit(function (e) {

        e.preventDefault();

        $loginForm.find('input').each(function () {
            if(!$(this).val()){
                empty = true;
                return false;
            }
            empty = false;
        });

        console.log(empty);

        if(empty){
            $alert.empty().append('Digite seu email e senha').removeClass('alert--success').addClass('alert--error');
        }else {
            $alert.empty().append('Você foi logado com sucesso').removeClass('alert--error').addClass('alert--success');
        }

        $alert.show(300);

    });



});