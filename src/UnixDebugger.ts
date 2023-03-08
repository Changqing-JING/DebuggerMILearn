import * as child_process from 'child_process';
import { ProgramStatus } from './ProgramStatus';
import { DebuggerBase } from './DebuggerBase';

export class UnixDebugger extends DebuggerBase {

    constructor(execPath: string) {
        super(execPath);
    }

    init(): void {
        this.debugTargetStatus = ProgramStatus.NEW;
        const gdbProcess = child_process.execFile(this.getDebuggerPath(), ["--interpreter=mi", this.execPath_]);
        gdbProcess.stdout.on('data', (data: string) => {

            console.log("-------------------------");
            console.log(data);


            if (data.includes("*stopped,reason=\"exited-normally\"")) {
                this.debugTargetStatus = ProgramStatus.END;
            }

            if (data.endsWith("(gdb) \n")) {
                switch (this.debugTargetStatus) {
                    case (ProgramStatus.NEW): {
                        gdbProcess.stdin.write("run\n");
                        this.debugTargetStatus = ProgramStatus.RUN;
                        break;
                    }
                    case (ProgramStatus.END): {
                        gdbProcess.stdin.write("quit\n");
                        break;
                    }
                }

            }

        });
        gdbProcess.stderr.on('data', (data) => {
            console.log(data);
        });
        gdbProcess.on("close", (code) => {
            console.log(`gdb exit with code ${code}`);
        });
        return;
    }

    protected getDebuggerPath(): string {
        throw "This functions should be virtual";
    }




}