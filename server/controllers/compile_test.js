import { spawn } from "child_process";
import { writeFileSync } from "fs";

// const code =
//   '#include <stdio.h> \n void main() { \n printf("Hello ritik"); \n }';

// writeFileSync("temp.c", code, { flag: "w+" });

// const compile = spawn("gcc", ["temp.c", "-o", "temp"]);

// const run = spawn("./temp");

// run.stdout.on("data", (data) => {
//   console.log(`${data}`);
// });

export const compile = async (req, res) => {
  const { lang, sourcecode, input } = req.body;

  switch (lang) {
    case "C":
      try {
        writeFileSync("codeexecution/temp.c", sourcecode, { flag: "w+" });

        
      } catch (error) {}
      break;

    case "CPP":
      console.log("cpp");
      break;

    case "JAVA":
      console.log("C");
      break;

    case "PYTHON":
      console.log("cpp");
      break;

    case "JAVASCRIPT":
      console.log("C");
      break;

    default:
      console.log("no compiler for these language");
  }
};
