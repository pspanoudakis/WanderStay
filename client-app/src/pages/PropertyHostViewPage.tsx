import { useParams } from "react-router-dom";
import { PropertyDetailsView } from "../components/PropertyDetailsView";

export function PropertyHostViewPage() {
    const {propertyId} = useParams();
    
    return (
        <PropertyDetailsView
            isEditable={true}
            propertyId={Number(propertyId)}
        />
    );
}
