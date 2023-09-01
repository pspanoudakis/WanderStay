import { useParams } from "react-router-dom";
import { PropertyDetailsView } from "../components/PropertyDetailsView";

export function PropertyGuestViewPage() {
    const {propertyId} = useParams();
    
    return (
        <PropertyDetailsView
            isEditable={false}
            propertyId={Number(propertyId)}
        />
    );
}
