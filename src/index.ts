import { DebuggerBase } from "./DebuggerBase";
import { GDBDebugger } from "./GDBDebugger";

const execPath = process.argv[2];

let dbg: DebuggerBase;

switch (process.platform) {
    case ("linux"): {
        dbg = new GDBDebugger(execPath);
        break;
    }
}

dbg.init();

