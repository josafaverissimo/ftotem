const hamburger = document.getElementById('sidebar__toggle-btn')

hamburger.addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('expand')
})