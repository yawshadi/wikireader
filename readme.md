# wikireader.js


- [wikireader.js](#wikireader)
  - [requirements](#requirements)
  - [setup](#setup)
  - [usage](#usage)
    - [reading articles](#read)
    - [reading a random article](#random)
    - [gets metadata about an article](#about)
    - [showing help commands](#help)
    


## wikireader

wikireader is a command line program that reads articles from wikipedia to the command line


## requirements

nodejs [https://nodejs.org/en/download/] 

npm

## setup

place the folder [wikireader] on your pc or mac; you can choose any location to place it.
open a terminal or bash and `cd` or `navigate` to the directory where your placed the files and run. 

```bash
npm install
npm link
```

in the unlikely event that npm could not link the program 
you can start the program by

```bash
node index.js <cmd>              (where cmd = [read,random,about,help])
```

## usage

open a terminal or bash and type

```bash
wikireader <cmd>                (where cmd = [read,random,about,help])
```

the cmd arguments are list of commands the wikireader accepts `[read,random,about,help]`


## read

open a terminal or bash and type

```bash
wikireader read
```

the program will ask you to specify your language 

the program will ask you to specify an article to read

once the program fetches the article from wikipedia you can move to the 
next paragraph of the article with  the letter `[n]` and you can end the reading
with the letter `[q]`

## random

open a terminal or bash and type

```bash
wikireader random
```

the program will ask you to specify your language 

the program will then fetch a random article from wikipedia

once the program fetches the article from wikipedia you can move to the 
next paragraph of the article with  the letter `[n]` and you can end the reading
with the letter `[q]`


## about

open a terminal or bash and type

```bash
wikireader about
```

the program will ask you to specify an article to get metadata about [eg:creation date]

once the program fetches the article from wikipedia it list various metadata about the article


## help

open a terminal or bash and type

```bash
wikireader help
```

shows all the available commands

```bash
wikireader --version [shows the version of the program]
wikireader  read     [specify an article to read]
wikireader  random   [gives a random article to read]
wikireader  about    [gives metadata about an article you specify]
wikireader  quit     [quits the program the program]
```

