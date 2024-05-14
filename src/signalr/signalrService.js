const connection = new signalR.HubConnectionBuilder()
    .withUrl("/operativo")
    .configureLogging(signalR.LogLevel.Information)
    .build();

connection.on("ReceiveMessage", (user, message) => {
    // Procesa el mensaje recibido
    console.log(`${user}: ${message}`);
});

connection.on("ReceiveAlert", (message) => {
    // Muestra la alerta cuando se recibe
    alert(message);
});

connection.start().then(() => {
    console.log("Conexión establecida con el hub de SignalR");
}).catch(err => console.error(err));
