// import { exec, execSync } from "child_process";
// import fs from "fs"
// import { TestCases } from "../types/testcase";
// import util from "util"



// export class Compiler {
//     isCompilerAvailable: boolean;
//     output: { ok: boolean; type: "fileerror" | "stderr" | "default" | "executionerr" | ""; error: string; output: string; };
//     constructor() {
//         this.output = { ok: true, type: "", output: "", error: "" }
//         exec("g++ --version", (error, stdout, stderr) => {
//             if (error || stderr) {
//                 console.log(error || stderr)
//                 throw error || stderr
//             }
//         })
//         exec("node --version", (error, stdout, stderr) => {
//             if (error || stderr) {
//                 console.log(error || stderr)
//                 throw error || stderr
//             }
//         })
//         exec("python --version", (error, stdout, stderr) => {
//             if (error || stderr) {
//                 console.log(error || stderr)
//                 throw error || stderr
//             }
//         })
//         this.isCompilerAvailable = true
//         this.output = { ok: false, type: "", output: "", error: "" }
//     }


//     run(code: string, language: string, input: string) {
//         let output = undefined;
//         fs.writeFile(`/temp/input${input.replace(" ", "").replace("\n", "")}.txt`, input, error => {
//             if (error) {
//                 console.log("writing file error", error)
//                 output = { ok: true, type: "fileerror", error: error.message, output: "" }
//                 return
//             }
//             if (language === "c" || language === "cpp") {

//                 fs.writeFile(`/temp/main${input.replace(" ", "").replace("\n", "")}.cpp`, code, error => {
//                     if (error) {
//                         console.log(error)
//                         output = { ok: false, type: "fileerror", error: error.message, output: "" }
//                         return
//                     }
//                     execSync(`g++ /temp/main${input.replace(" ", "").replace("\n", "")}.cpp -o /temp/main${input.replace(" ", "").replace("\n", "")} && /temp/main${input.replace(" ", "").replace("\n", "")}.exe < /temp/input${input.replace(" ", "").replace("\n", "")}.txt`, (error, stdout, stderr) => {
//                         fs.unlink(`/temp/input${input.replace(" ", "").replace("\n", "")}.txt`, err => { })
//                         fs.unlink(`/temp/main${input.replace(" ", "").replace("\n", "")}.cpp`, err => { })
//                         fs.unlink(`/temp/main${input.replace(" ", "").replace("\n", "")}.exe`, err => { })
//                         if (stderr) {
//                             output = { ok: false, type: "stderr", error: stderr, output: "" }
//                             return
//                         }
//                         if (error) {
//                             output = { ok: false, type: "executionerr", error: error.message, output: "" }
//                             return
//                         }
//                         console.log(stdout, "output")
//                         output = { ok: true, type: "", error: "", output: stdout }
//                     })
//                 })

//             } else {
//                 fs.writeFile(`/temp/main${input.replace(" ", "").replace("\n", "")}.py`, code, error => {
//                     if (error) {
//                         output = { ok: false, type: "fileerror", error: error.message, output: "" }
//                         return
//                     }
//                     exec(`< /temp/input${input.replace(" ", "").replace("\n", "")}.txt  python /temp/main${input.replace(" ", "").replace("\n", "")}.py`, (error, stdout, stderr) => {
//                         fs.unlink(`/temp/input${input.replace(" ", "").replace("\n", "")}.txt`, err => { })
//                         fs.unlink(`/temp/main${input.replace(" ", "").replace("\n", "")}.py`, err => { })

//                         if (stderr) {
//                             output = { ok: false, type: "stderr", error: stderr, output: "" }
//                             return
//                         }
//                         if (error) {
//                             output = { ok: false, type: "executionerr", error: error.message, output: "" }
//                             return
//                         }
//                         console.log(stdout, "output")
//                         output = { ok: true, type: "", error: "", output: stdout }
//                     });
//                 });
//             }
//         })
//         return output
//     }

//     execute(code: string, language: "c" | "cpp" | "python", testCases: TestCases[]) {

//         let result = testCases.map(test => {
//             if (language === "python") {
//                 test.input = test.input.replaceAll(" ", "\n")
//             }
//             this.run(code, language, test.input);
//             console.log(this.output, "yaha")
//             // if (res.error) {
//             //     if (res.type === "default") {
//             //         console.log("here")
//             //         return { status: "IERR", expectedOutput: test.expectedOutput, stderr: "", stdout: "" }
//             //     }
//             //     if (res.type === "fileerror") {
//             //         return { status: "IERR", expectedOutput: test.expectedOutput, stderr: res.stderr, stdout: "" }
//             //     }
//             //     return { status: "ERR", expectedOutput: test.expectedOutput, stderr: res.stderr, stdout: "" }
//             // }
//             // if (res.stdout !== test.expectedOutput) {
//             //     return { status: "RJ", expectedOutput: test.expectedOutput, stderr: "", stdout: res.stdout }
//             // }
//             // return { status: "AC", expectedOutput: test.expectedOutput, stderr: "", stdout: res.stdout }
//         })
//         console.log(result)
//         return result
//     }
// }