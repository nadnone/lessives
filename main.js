import dataset from "./data/dataset.json" with { type: "json"}
import { Calculator } from './class/Calculator.js';

const calculator = new Calculator();
const body = document.body;

for (let i = 0; i < dataset.programmes.length; i++) 
{
    const programme = dataset.programmes[i];
    
    const title = document.createElement("h3");
    title.innerText = programme.nom;

    const content = document.createElement("p");

    content.innerText = `Temps: ${programme.temps} minutes (environ: ${(programme.temps/60).toPrecision(1)} heure(s) )
    Coûts: ${dataset.cout_par_credit * programme.credits} CHF
    Crédit nécessaires: ${programme.credits} Unité(s) de décomptes à ${programme.compteur} minutes
    Reste: ${Math.ceil(programme.compteur*programme.credits) - programme.temps} minutes(s)
    `;

    const section = document.createElement("section");

    section.appendChild(title);
    section.appendChild(content);
    body.appendChild(section);
    
}

document.querySelector("button").addEventListener("click", calculator.estimate)
document.querySelector("#calculator").addEventListener("keypress", (e) => e.code === "Enter" ? calculator.estimate() : null);