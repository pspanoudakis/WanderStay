import { useContext, useState } from "react";
import { exportAllHostReviews } from "../api/fetchRoutines/adminAPI";
import { SupportedAcceptType } from "../api/fetchRoutines/fetchAPI";
import { PrimaryButton } from "../components/PrimaryButton";
import { exportObjAsJSON, exportTextAsXML } from "../utils/exportUtils";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { DataExportTypeLabels } from "../components/utils/dataExportTypeLabels";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AppContext, openModal } from "../AppContext";
import { ModalActionResultTemplate } from "../components/ModalActionResultTemplate";

export function TestPage() {

    const username = 'host1';

    const [loading, setLoading] = useState(false);
    const [exportType, setExportType] = useState<SupportedAcceptType>(
        SupportedAcceptType.APPLICATION_JSON
    );

    const ctx = useContext(AppContext);
    const exportData = () => {
        setLoading(true);
        exportAllHostReviews(username, exportType)
        .then(response => {
            if (response.ok) {
                if (exportType === SupportedAcceptType.APPLICATION_JSON) {
                    exportObjAsJSON({
                        obj: response.content,
                        filenameNoExt: `${username}_reviews`
                    });
                } else if (exportType === SupportedAcceptType.APPLICATION_XML) {
                    exportTextAsXML({
                        text: response.content,
                        filenameNoExt: `${username}_reviews`
                    });
                }
            }
            else {
                openModal(ctx, {
                    content: () => (
                        <ModalActionResultTemplate
                            success={false}
                            errorText="Σφάλμα Εξαγωγής Δεδομένων"
                        />
                    )
                })
            }
            setLoading(false);
        });
    }

    return (
        <div className="w-full flex flex-col items-center gap-8 relative">
            <LoadingSpinner
                coverParent
                visible={loading}
                text={`Εξαγωγή Δεδομένων ${DataExportTypeLabels[exportType]}`}
            />
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={exportType}
                onChange={(e) => {
                    debugger;
                    setExportType(e.target.value as SupportedAcceptType)
                }}
            >
            {
                Object.entries(DataExportTypeLabels).map(([type, label]) => (
                <FormControlLabel key={type} value={type} control={<Radio />} label={label} />
                ))
            }
            </RadioGroup>
            <PrimaryButton
                onClick={exportData}
            >
                Export Data
            </PrimaryButton>
        </div>
    );
}
