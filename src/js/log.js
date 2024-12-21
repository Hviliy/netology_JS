const logContainer = document.getElementById('battleLog');
function log(message, color = 'green') {
    logContainer.insertAdjacentHTML('beforeend', `<p class='message ${color}'>${message}</p>`);
}
export function clearLog() {
    logContainer.innerHTML = '';
}
export default log;