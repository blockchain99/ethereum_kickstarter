const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
/*two object : compiled from CampaignFactory contract and Campaign contract */
const output = solc.compile(source, 1).contracts; //care about only contracts property

/*check dir exist, if not create the dir */
fs.ensureDirSync(buildPath);

/* Nasty one : loop output object, consts of two contracts */
console.log(output); //2  : output of $ node compile.js
for(let contract in output)
{
  fs.outputJsonSync(
  //  path.resolve(buildPath, contract + '.json'),
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}
