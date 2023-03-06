import { UnixDebugger } from "./UnixDebugger";

export class GDBDebugger extends UnixDebugger {
    constructor(execPath: string) {
        super(execPath);
    }

    protected getDebuggerPath(): string {
        return "gdb";
    }
}