import dataset from '../data/dataset.json' with { type: "json"}
import { ERRORS } from '../misc/constants.js';
import { print_error } from '../misc/error.js';

export class Calculator 
{
    constructor() 
    {
        this.error_obj = null;
        this.result = null;
        this.error = false;
    }

    estimate() 
    {

        // reset   
        document.querySelectorAll(".result").forEach((el) => el.remove());
        document.querySelectorAll(".error").forEach((el) => el.remove());

        const context = document.querySelector("#calculator");
        this.result = document.querySelector(".result");
        this.error_obj = document.querySelector(".error");

        if (this.result != null)
        {
            context.removeChild(this.result)
        }
        if (this.error_obj != null)
        {
            context.removeChild(this.error_obj)
        }
        

        const t_per_credit = document.querySelector("#t_per_credit").value
        const t_program_raw = "" + document.querySelector("#t_program").value

        const matches = t_program_raw.match(/([0-9]{0,10})([\:h]{0,1})([0-9]{0,2})(m{0,1})/)

        if (matches == null || t_per_credit == null)
            return

        let t_program = 0;

        if (matches.find((m) => m === 'h'))
        {
            t_program += parseInt(matches[1]) * 60;
            t_program += (matches[3] != '') ? parseInt(matches[3]) : 0;
        }
        else if (matches.find((m) => m === 'm'))
        {
            t_program += parseInt(matches[1]);
        }
        else if (matches.find((m) => m !== 'h' || m !== 'm'))
        {
            this.error = ERRORS.format;
        }
        else
        {
            this.error = ERRORS.empty;
        }

        if (isNaN(t_program))
        {
            this.error = ERRORS.format;
        }

        switch (this.error) {
            case ERRORS.format:
                print_error(context, "[!] Mauvais Format d'écriture de la durée")
                break                
            
            case ERRORS.empty:
                print_error(context, "[!] Avez vous noté quelque chose ?")
                break;

            default:
                break;
        }

        if (this.error !== false)
        {
            this.error = false;
            return;
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

        context.appendChild(results_p);
    }
} 