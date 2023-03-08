import { ProgramStatus } from "./ProgramStatus";

export class DebuggerBase {
    constructor(execPath: string) {
        this.execPath_ = execPath;
    }

    public init(): void { throw "this function is virtual"; }

    protected execPath_: string;
    protected debugTargetStatus: ProgramStatus;
}