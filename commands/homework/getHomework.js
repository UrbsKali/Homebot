module.exports = {
    name: 'getHomework',
    aliases: ['gh'],
    category: 'travail',
    utilisation: '\`{prefix}getHomework\` : devoir du jour \n \`{prefix}getHomework <yyyy-mm-dd>\` : devoir de ce jour \n \`{prefix}getHomework <+d>\` : devoir j+d',

    async execute(client, message, args) {
        const jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
        var d = new Date();
        var test;
        try {
            args[0].toLowerCase()
            test = true
        } catch{
            test = false
        }
        if (test){
            if (args[0].toLowerCase() === "demain"){
                d.setDate(d.getDate() + 1)
            } else if (args[0].indexOf("+") !== -1){
                d.setDate(d.getDate() + Number(args[0].replace("+", '')))
            } else if (args[0].indexOf("-") !== -1){
                d = new Date(args[0])
            }
        }
        
        
        var input_date = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}` 
        
        const homework = await getHm(input_date).catch(err => {console.log(` getHomework : ${err}`); return err})
        
        var tmp = [];
        var bool_ = true;
        var i = 0;
        while (bool_){
            try {
                tmp.push({name: `${homework[i].subject.name} - ${homework[i].teacher}`, value: `\n${homework[i].job.content.text}\n Evaluation : ${homework[i].test ? client.emotes.success : client.emotes.off }\n`});
                i++;
            } catch {
                bool_ = false;
            }
            
        }
        if (i === 0){
            tmp.push({name: "Infos :", value: "Pas de devoir pour aujourd'hui",})
        }
        console.log(tmp, i);
        message.channel.send({
            embed: {
                color: 'GREEN',
                author: { name: `Les devoirs du ${jours[d.getDay()-1]} ${d.getDate()}` },
                footer: { text: "Ce bot DEVIENT utile" },
                timestamp: d,
                fields: tmp,
                
            },
        }).catch(err => {console.log(` send message : ${err}`); return err})
    }
};


async function getHm(date){
    const ed = require("ecoledirecte.js");
    const session_ = new ed.Session("USERNAME", "PASSWORD");

    const account = await session_.login().catch(err => {
        console.error("This login did not go well.");
        return err
    });
    let homework;
    try {
        homework = await account.getHomework({ dates: date });
    } catch (err) {
        console.log(err);
        return err
    }
    return homework
}
