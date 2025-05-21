import dataset from './dataset.json' with { type: "json"}
import { print_error } from './error.js';

export class Calculator 
{
    constructor() 
    {
        this.error = null;
        this.result = null;
    }

    estimate() 
    {

        // wipe old text
        const estimator_section = document.querySelector("#calculator")
        this.result = document.querySelector(".result")
        this.error = document.querySelector(".error");

        if (this.result != null)
        {
            estimator_section.removeChild(this.result)
        }
        if (this.error != null)
        {
            estimator_section.removeChild(this.error)
        }
        

        const t_per_credit = document.querySelector("#t_per_credit").value
        const t_program_raw = "" + document.querySelector("#t_program").value

        const matches = t_program_raw.match(/([0-9]{0,2})([\:h]{0,1})([0-9]{0,2})(m{0,1})/)

        if (matches == null || t_per_credit == null)
            return

        let t_program = 0;

        if (matches.find((m) => m === 'h'))
        {
            t_program += parseInt(matches[1])*60;
            t_program += (matches[3] != '') ? parseInt(matches[3]) : 0;
        }
        else if (matches.find((m) => m === 'm'))
        {
            t_program += parseInt(matches[1]);
        }
        else
        {
            print_error(estimator_section);
        }

        if (isNaN(t_program))
        {
            print_error(estimator_section, "[!] Format non reconnu");
        }


        const credit_needed = Math.ceil(t_program / t_per_credit) // credits
        const t_min = credit_needed * t_per_credit // sec
        const t_rest = t_min - t_program // sec

        let rest_rslt = "";

        if (t_rest > 0)
        {
            rest_rslt = `- Il restera ${t_rest} minutes, à la fin du programme\n`;
        }

        const results_p = document.createElement("p");
        results_p.className = "result"
        results_p.innerText = `- Il faudra ${credit_needed} crédit(s) pour que le programme soit complet
        ${rest_rslt}- Cela coutera au total: ${credit_needed * dataset.cout_par_credit} CHF`;

        estimator_section.appendChild(results_p);
    }
} 