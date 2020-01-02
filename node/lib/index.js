#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander = require('commander');
var program = new commander.Command();
program
    .version('0.0.1')
    .description('Financial instruments for the NEM blockchain.')
    .option('-d, --debug', 'output extra debugging');
program.help();
program.parse(process.argv);
if (program.debug)
    console.log(program.opts());
