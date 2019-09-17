#!/usr/bin/env node


const program = require('commander');
const {
    prompt
} = require('inquirer');
const request = require('request');

const {
    readRequest,
    clean,
    getLang,
    langObj,
    questionRandom,
    questionRead,
    questionAbout,
    humanDate
} = require('./functions');

// wikipedia api base url
let baseurl = 'wikipedia.org/w/api.php?format=json&action=query';

// api url for reading
let wikiSite    = baseurl+'&indexpageids=1&prop=extracts&exintro&explaintext&redirects=1&titles=';

//api url for random article
let randomWiki  = baseurl+'&list=random&rnnamespace=0'

//api url for about article
let aboutWiki   = baseurl+'&indexpageids=1&prop=contributors|revisions|info|pageprops&rvlimit=1&rvdir=newer&titles=';



// commander program defaults
program
    .version('1.0.0')
    .description('reads article from wikipedia eg:[wikireader read]')
    .arguments('<cmd>')
    .helpOption('-l, lang','languages[english en, french fr, japanese ja, italiano it, german de, spanish es, chinese zh, polish pl]')
    



// read command

program
    .command('read')
    .alias('r')
    .description('specify an article to read about')
    .action(() => {
        prompt(questionRead).then(answers => read(answers))
    })


// random command

program
    .command('random')
    .alias('z')
    .description('shows a random article')
    .action(() => {
        prompt(questionRandom).then(answers => random(answers))
    })


// about command

program
    .command('about')
    .alias('a')
    .description('shows a info about an article')
    .action(() => {
        prompt(questionAbout).then(answers => about(answers))
    })

// quit command
program
    .command('quit')
    .alias('q')
    .description('quit the application')
    .action(() => {
        process.exit();
    })


// read function
const read = (q) => {

    let lang = getLang(q.language, langObj);
    if (typeof lang == 'undefined') {
        lang = 'en';
        console.log('......language not set, using default: english...')
    }
    wikiSite = "https://" + lang + '.' + wikiSite
    let Url = wikiSite + clean(q.article);

    readRequest(Url);


}

//random function
const random = (q) => {

    let lang = getLang(q.language, langObj);
    if (typeof lang == 'undefined') {
        lang = 'en';
        console.log('......language not set, using default: english...')
    }
    let randomTitle = '';
    randomWiki = "https://" + lang + '.' + randomWiki
   
 
    request({
        url: randomWiki,
        json: true
    }, function (error, response, result) {

        if (!error && response.statusCode == 200) {
          randomTitle = result.query.random[0].title;

          wikiSite = "https://" + lang + '.' + wikiSite
          let Url = wikiSite + randomTitle;
          readRequest(Url);
        }
        if(error){
            console.log('>',"Could not contact wikipedia's server :( \n Try again later");
              process.exit();
        }

       
    });
}



//about function
const about = (q) => {

    aboutWiki = "https://en."+ aboutWiki
    let Url = aboutWiki + clean(q.article);

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

          let info = result.query.pages[id];
          let j = {
              "anonymouns contributors" :info.anoncontributors,
              "contributors": info.contributors.map(a=>{
                return a.name;
              }),
              "first revision author": info.revisions[0].user,
              "date created": humanDate(info.revisions[0].timestamp),
              "last modified":humanDate(info.touched)

          }

          console.log('> ',j);
        }
        if(error){
            console.log('>',"Could not contact wikipedia's server :( \n Try again later");
              process.exit();
        }

       
    });


}

program.parse(process.argv);