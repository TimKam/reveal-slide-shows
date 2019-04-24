document.addEventListener('DOMContentLoaded', () => {
    const begin = document.getElementById('beginButton')

    begin.onclick = () => {
        if(document.getElementById('agree').checked) {
            window.location.href = './second_page.html'
        } else {
            alert('Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy')
        }
    }

})
