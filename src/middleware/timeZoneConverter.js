
// pra mostrar o horario que ta no banco, no timezone que ta rodando o navegador

const timeZoneConverter = (timeObj) => {
    var localDate = new Date(timeObj);
    var localTimeString = localDate.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
    })
    return localTimeString;
}


module.exports = timeZoneConverter;