import { SupportedAcceptType } from "../../api/fetchRoutines/fetchAPI";

export const DataExportTypeLabels = {
    [SupportedAcceptType.APPLICATION_JSON]: 'JSON',
    [SupportedAcceptType.APPLICATION_XML]: 'XML',
} as const;
