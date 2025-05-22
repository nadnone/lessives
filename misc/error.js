export function print_error(context, message = "")
{
    let error = document.createElement("p");

    error.innerText = `Merci de spécifier l'unité 
    Heures => [h]
    Minutes => [m]

    ${message}
    `;
    
    error.style.color = "red"
    error.className = "error"

    context.appendChild(error);
}