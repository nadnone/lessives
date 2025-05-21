import dataset from './dataset.json' with { type: "json"}

export function estimate() {

    // wipe old text
    const estimator_section = document.querySelector("#calculator")
    const rslt_p = document.querySelector(".result")

    if (rslt_p != undefined)
    {
        estimator_section.removeChild(rslt_p)
    }
    

    const t_per_credit = document.querySelector("#t_per_credit").value
    const t_program_raw = "" + document.querySelector("#t_program").value

    const matches = t_program_raw.match(/([0-9]{0,2})[\:h]{1}([0-9]{0,2})/)

    if (matches == null || t_per_credit == null)
    {
        return
    }

    let t_program = parseInt(matches[1])*60;
    if (matches[2] != '')
    {
        t_program += + parseInt(matches[2]);
    }

    console.log(t_program);

    const credit_needed = Math.ceil(t_program / t_per_credit) // credits
    const t_min = credit_needed * t_per_credit // sec
    const t_rest = t_min - t_program // sec

    let rest_rslt = "";

    if (t_rest > 0)
    {
        rest_rslt = `- Il restera ${t_rest} secondes, à la fin du programme\n`;
    }

    const results_p = document.createElement("p");
    results_p.className = "result"
    results_p.innerText = `- Il faudra ${credit_needed} crédit(s) pour que le programme soit complet
    ${rest_rslt}- Cela coutera au total: ${credit_needed * dataset.cout_par_credit} CHF`;

    estimator_section.appendChild(results_p);
}

estimate()