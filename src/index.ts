import { DebuggerBase } from "./DebuggerBase";
import { GDBDebugger } from "./GDBDebugger";
import { CDBDebugger } from "./CDBDebugger";

const execPath = process.argv[2];

let dbg: DebuggerBase;

switch (process.platform) {
    case ("linux"): {
        dbg = new GDBDebugger(execPath);
        break;
    }
    case ("win32"): {
        dbg = new CDBDebugger(execPath);
        break;
    }
}

dbg.init();

