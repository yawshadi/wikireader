
const request = require('request');
 

const langObj = [{
    name: 'english',
    alias: 'en'
}, {
    name: 'french',
    alias: 'fr'
}, {
    name: 'japanese',
    alias: 'ja'
}, {
    name: 'italiano',
    alias: 'it'
}, {
    name: 'spanish',
    alias: 'es'
}, {
    name: 'german',
    alias: 'de'
}, {
    name: 'chinese',
    alias: 'zh'
}, {
    name: 'polish',
    alias: 'pl'
}]



const questionRead = [{
        input: 'input',
        name: 'language',
        message: 'set a language : eg = english  or en >'
    },
    {
        input: 'input',
        name: 'article',
        message: 'specify article to read about: eg: food  >'
    }
]


const questionRandom = [{
    input: 'input',
    name: 'language',
    message: 'set a language : eg =  english or en >'
}
]

const questionAbout = [{
    input: 'input',
    name: 'article',
    message: 'specify article to get info about : eg: football >'
}
]

const humanDate = (date)=>{
 let  hDate = new Date(date).toDateString();
 let  hTime = new Date(date).toTimeString();
 
    return hDate +' , '+ hTime;
}

const getLang = (key, arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === key || arr[i].alias === key) {
            return arr[i].alias;
        }
    }
}

const clean = (str) => {
    return str.replace(/[^A-Z0-9]+/ig, "_");
}

const readRequest = (Url) => {

    request({
        url: Url,
        json: true
    }, function (error, response, result) {

        if (!error && response.statusCode == 200) {
            let id = result.query.pageids[0];

            if(id == -1){
                console.log('> Sorry article not found');
                process.exit();
            }

            let res = result.query.pages[id].extract;
            let info = res.trim();
            let wiki = info.split("\n");
            let i = 0;

            // show first paragrah

            console.log('\n > ', wiki[0]);

            console.log('\n > Press n to read next paragraph \n > q to quit');

            // pause the process to read input from keys 
            process.stdin.setRawMode(true);
            process.stdin.resume();
            process.stdin.on('data', function (key) {

                // quit the process if q is pressed
                if (key == 'q') {
                    process.exit();
                }
                // continue the article if n is pressed
                if (key == 'n') {
                    i += 1;
                    if (i >= wiki.length) {
                        console.log('\n > ......End of article press q to quit.....');
                    } else {
                        console.log('\n >  ' + wiki[i]);

                    }
                }

            });
        }
        if(error){
            console.log('>',"Could not contact wikipedia's server :( \n Try again later");
              process.exit();
        }


    });
}

module.exports={
    readRequest,
    clean,
    getLang,
    langObj,
    questionRandom,
    questionRead,
    questionAbout,
    humanDate
}