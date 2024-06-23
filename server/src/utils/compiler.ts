import { exec } from "child_process";
import fs from "node:fs"

export class Compiler {
    isCompilerAvailable: boolean;

    constructor() {
        exec("g++ --version", (error, stdout, stderr) => {
            if (error || stderr) {
                console.log(error || stderr)
                throw error || stderr
            }
        })
        exec("node --version", (error, stdout, stderr) => {
            if (error || stderr) {
                console.log(error || stderr)
                throw error || stderr
            }
        })
        exec("python --version", (error, stdout, stderr) => {
            if (error || stderr) {
                console.log(error || stderr)
                throw error || stderr
            }
        })
        this.isCompilerAvailable = true
    }

    execute(code: string, input: string, language: string) {
        if (!code || !language || !input) {
            throw new Error("Missing argument.")
        }


        fs.writeFile("/temp/input.txt", input, err => {
            if (err) {
                throw err
            }
        })

        switch (language) {
            case "c":
            case "cpp":
                fs.writeFile(`/temp/main.cpp`, code, err => {
                    if (err) {
                        console.log(err)
                        throw err
                    }
                })

                exec(`g++ /temp/main.cpp -o /temp/main && /temp/main.exe < /temp/input.txt`, (error, stdout, stderr) => {
                    if (error) {
                        return { ok: false, error: error.message, stderr, stdout }
                    }
                    return { ok: true, stdout, stderr, error: "" }
                })
                break;
            case "python":
                fs.writeFile("/temp/main.py", code, err => {
                    if (err) {
                        console.log(err)
                        throw err
                    }

                    exec(`< /temp/input.txt  python /temp/main.py`, (error, stdout, stderr) => {
                        if (error) {
                            return { ok: false, error: error.message, stderr, stdout }
                        }
                        return { ok: true, stdout, stderr, error: "" }
                    });
                });
                break;
            default:
                return { ok: false, error: "Lnguage not supported", stdout: "", stderr: "" }
        }
    }
}