import { getUserProfile, getUserProfileXML } from "../api/fetchRoutines/adminAPI";
import { PrimaryButton } from "../components/PrimaryButton";
import { exportObjAsJSON, exportTextAsXML } from "../utils/exportUtils";

export function TestPage() {

    const exportJSON = () => {
        getUserProfile('admin')
        .then(response => exportObjAsJSON({
            obj: response.content,
            filenameNoExt: 'admin_profile',
        }));
    }

    const exportXML = () => {
        getUserProfileXML('admin')
        .then(response => exportTextAsXML({
            text: response.content,
            filenameNoExt: 'admin_profile',
        }));
    }

    return (
        <div className="w-full flex flex-col items-center gap-8">
            <PrimaryButton
                onClick={exportXML}
            >
                Export XML
            </PrimaryButton>
            <PrimaryButton
                onClick={exportJSON}
            >
                Export JSON
            </PrimaryButton>
        </div>
    );
}
