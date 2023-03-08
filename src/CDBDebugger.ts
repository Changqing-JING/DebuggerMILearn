import { DebuggerBase } from "./DebuggerBase";
import { ProgramStatus } from "./ProgramStatus";
import * as child_process from 'child_process';

export class CDBDebugger extends DebuggerBase {
    constructor(execPath: string) {
        super(execPath);
    }

    public init(): void {
        this.debugTargetStatus = ProgramStatus.NEW;
        const gdbProcess = child_process.execFile("cdb", [this.execPath_]);
        gdbProcess.stdout.on('data', (data: string) => {

            console.log("-------------------------");
            console.log(data);


            if (data.includes("ntdll!NtTerminateProcess")) {
                this.debugTargetStatus = ProgramStatus.END;
            }

            if (data.endsWith("0:000> ")) {
                switch (this.debugTargetStatus) {
                    case (ProgramStatus.NEW): {
                        gdbProcess.stdin.write("g\n");
                        this.debugTargetStatus = ProgramStatus.RUN;
                        break;
                    }
                    case (ProgramStatus.END): {
                        gdbProcess.stdin.write("q\n");
                        break;
                    }
                }

            }

        });
        gdbProcess.stderr.on('data', (data) => {
            console.log(data);
        });
        gdbProcess.on("close", (code) => {
            console.log(`cdb exit with code ${code}`);
        });
        return;
    }
}