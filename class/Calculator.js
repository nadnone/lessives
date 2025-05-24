import dataset from '../data/dataset.json' with { type: "json" }
import errors_config from '../data/errors_text.json' with { type: "json" }
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
        const t_program_raw = "" + document.querySelector("#t_program").value.toLowerCase()

        const matches = t_program_raw.match(/([0-9]{0,10})([\:h]{0,1})([0-9]{0,2})(m{0,1})/)

        
        this.error = ERRORS.RESET;
        let t_program = null;

        if (matches == null || t_per_credit == null)
        {
            this.error = ERRORS.EMPTY;
        }

        if (matches.find((m) => m === 'h') && this.error === ERRORS.RESET)
        {
            t_program += parseInt(matches[1]) * 60; // heures * 60
            t_program += (matches[3] != '') ? parseInt(matches[3]) : 0; // si pas de minutes, on additionne 0
            this.error = ERRORS.NO_ERROR;
        
        }
        else if (matches.find((m) => m === 'm') && this.error === ERRORS.RESET)
        {
            t_program += parseInt(matches[1]);
            this.error = ERRORS.NO_ERROR;
        }
        else if (
            (matches.find((m) => m !== 'h' || m !== 'm')) &&
            (matches.find((m) => m > 0)) || isNaN(t_program) &&
            this.error === ERRORS.RESET
        )
        {
            this.error = ERRORS.FORMAT;
        }

        if (
            (t_program <= 0 || t_per_credit <= 0) &&
            this.error === ERRORS.RESET
        )
        {
            this.error = ERRORS.NEGATIVE;
        }


        switch (this.error) {
            case ERRORS.FORMAT:
                print_error(context, errors_config.FORMAT)
                return;                
            
            case ERRORS.EMPTY:
                print_error(context, errors_config.EMPTY)
                return;

            case ERRORS.NEGATIVE:
                print_error(context, errors_config.NEGATIVE)
                return;

            default:
                break;
        }


        const credit_needed = Math.ceil(t_program / t_per_credit) // credits
        const t_min = credit_needed * t_per_credit // sec
        const t_rest = t_min - t_program // sec

        let rest_rslt_text = "";

        if (t_rest > 0)
        {
            rest_rslt_text = `- Il restera ${t_rest} minutes, à la fin du programme\n`;
        }
        
        if (credit_needed == Infinity)
        {
            print_error(context, errors_config.ZEROS);
        }


        const results_dom_obj = document.createElement("p");
        results_dom_obj.className = "result"
        results_dom_obj.innerText = `- Il faudra ${credit_needed} crédit(s) pour que le programme soit complet
        ${rest_rslt_text}- Cela coutera au total: ${credit_needed * dataset.cout_par_credit} CHF`;

        context.appendChild(results_dom_obj);
    }
} 