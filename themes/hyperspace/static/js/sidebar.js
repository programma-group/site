$(function sidebarListeners() {
    document.getElementById('sidebar')
        .querySelector('input')
        .addEventListener('click', function clickListener (){
            $(this).closest('#sidebar').toggleClass('open')
        })
});