const { exec } = require('child_process');
const argv = require('yargs').option('n',{
    alias:'name',
    describe:'Set a name for TrueHome component'
}).argv;
require('colors');

//Constants and contents for archives
//Content of index archive
const indexContent = `import * as components from "./components";
import * as containers from "./containers";

export default { components, containers } 
`;
const modelContent = `import * as yup from "yup";`;
const utilsContent = `import * as yup from "yup";`;


console.clear();
const main = async ()=>{
    console.log("Hola mundo");
    switch(argv._[0]){
        case "create:app":
            console.log(`Crea una aplicacion llamada ${argv.n}`);
            exec(`npx create-react-app ${argv.n}`,(error,stdout,stderr)=>{
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            })
            break;
        case "create:component":
            console.log('Crea un componente');
            break;
        case "create:menu":
            console.log('Crea un menu');
            break;
        case "create:module":
            console.log(`Creando modulo ${argv.n}`);
            const fs = require('fs');
            const modulo = `${argv.n}Module`;
            fs.mkdir(modulo,(error)=>{
                if(error){
                    console.log(error);
                }else{
                    fs.mkdirSync(`./${modulo}/components`);
                    fs.mkdirSync(`./${modulo}/containers`);
                    fs.mkdirSync(`./${modulo}/context`); 
                    fs.mkdirSync(`./${modulo}/hooks`);   
                    console.log("Crando modelos");
                    fs.writeFileSync(`./${modulo}/constants.js`,"const helloword = 'hello world';",(err)=>{
                        if(err) console.log(err);
                    });
                    fs.writeFileSync(`./${modulo}/index.js`,indexContent,(err)=>{
                        if(err) console.log(err);
                    });
                    fs.writeFileSync(`./${modulo}/model.js`,modelContent,(err)=>{
                        if(err) console.log(err);
                    });
                    fs.writeFileSync(`./${modulo}/utils.js`,utilsContent,(err)=>{
                        if(err) console.log(err);
                    });
                }
            })
            break;
    }
}

main();