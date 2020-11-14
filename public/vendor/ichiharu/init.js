NProgress.configure({
    trickle: true,
    easing: 'ease', 
    speed: 350
});

$(document).on('turbolinks:click', function () {
    NProgress.start();
});

$(document).on('turbolinks:load', function () {
    NProgress.done();
});

$(document).on('ready', function () {
    $(window).on('load', function () {
        NProgress.done();
        Turbolinks.start()
    });
});
console.log("%c---------------------------", 'font-size: 18px;text-decoration: line-through;')
console.log('%cIchiharu', 'font-size: 60px; font-weight: bold; font-family: IBM Plex Sans; color: white')
console.log('%cWARNING! ご注意！', 'font-size: 36px; font-weight: bold; font-family: Inter; color: #f4835d');
console.log("%cPasting or typing anything here can expose your account details to hackers.\n\nここに何かを貼り付けたり、入力したりすると、ハッカーにアカウントの詳細を知られてしまう可能性があります。", 'font-size: 18px; font-family: Inter; font-weight: bold; color: red');
console.log("%cIf someone is asking you to input anything here, they are 101% scamming you.", 'font-size: 18px; font-weight: regular; font-family: Inter; color: lightgrey');
console.log("%c---------------------------", 'font-size: 18px;text-decoration: line-through;')