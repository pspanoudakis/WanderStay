import { useParams } from "react-router-dom";
import { PropertyPage } from "./PropertyPage";

export function PropertyGuestViewPage() {
    const {propertyId} = useParams();
    
    return (
        <PropertyPage
            isEditable={false}
            propertyId={Number(propertyId)}
        />
    );
}
